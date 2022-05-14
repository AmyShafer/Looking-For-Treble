const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const fetch = require('node-fetch');
const spotify = require('./utils/spotify');
const { User } = require('./models');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// const routes = require('../controllers');
// app.use(routes);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

let sentinel = 0;

app.post('/spotifyAPI/:code', async (req, res) => {
  sentinel++;
  if (sentinel % 4 == 1) {
    console.log('Spotify Fetch Triggered' + sentinel);
    var code = await req.params.code;
    console.log(code);

    const params = new URLSearchParams();
    params.append('code', code);
    //params.append('redirect_uri', 'https://good-treble.herokuapp.com/spotify/authorize');
    params.append('redirect_uri', 'http://localhost:3000/spotify');
    params.append('grant_type', 'authorization_code');

    const newToken = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(
            process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
          ).toString('base64'),
      },
      body: params,
      json: true,
    });
    const parsedTokenJSON = await newToken.json();
    console.log(newToken);
    let parsedToken;
    if (typeof parsedTokenJSON.access_token != 'undefined') {
      parsedToken = parsedTokenJSON.access_token;
    }
    console.log(parsedToken);
    spotify.setToken(parsedToken);
    spotify.retrieveFavorites(25, 1);
    spotify.getTopArtists(1);
    spotify.getTopTrackArt(1);
    //res.redirect('https://good-treble.herokuapp.com/redirectPage');
    res.redirect('http://localhost:3000/');
  }
});

app.get('/spotifyTracks', async (req, res) => {
  const playlistJSON = await spotify.getAllPlaylistData(1);
  res.status(200).json(playlistJSON);
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.sendStatus(500);
  } else {
    const validPass = await bcrypt.compare(pass, user.password);
    if (validPass) {
      const token = jwt.sign(
        { userid: user.id, username: user.name },
        process.env.secret
      );
      res.status(200).json({
        token: token,
      });
    } else {
      res.sendStatus(500);
    }
  }
});

app.post('/create', async (req, res) => {
  const email = req.body.email;
  const name = req.body.username;
  const pass = req.body.password;

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });
  if (user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.get('/spotifyArtists', async (req, res) => {
  let artistJSON = [];
  for (let i = 1; i < 9; i++) {
    const topArtist = await sequelize.query(`
    SELECT Artist.id, Artist.name AS ArtistName, Artist.image AS ArtistImage FROM ARTIST
    INNER JOIN user ON Artist.id = user.fav${i}
    WHERE user.id = 1`);
    artistJSON.push(topArtist[0][0]);
  }
  res.json(artistJSON);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const sess = {
  secret: process.env.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// app.use(express.static(path.join(__dirname, 'public')));

// start server and connect to db
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

//works
//const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });

//   sequelize.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(
//         `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
//       );
//     });
//   });
// };

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

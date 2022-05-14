import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import querystring from 'querystring';

const styles = {
  importSection: {
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '100%',
    boxShadow: '6px 1px 9px 1px #00E5FF',
    borderRadius: '1%',
    // backgroundColor: '#00E5FF',
    textShadow: '1px 3px 1px #9E9E9E',
  },
  importBox: {
    boxShadow: '6px 1px 9px 1px #CD33FF',
  },
};

function SpotifyImport() {
  return (
    <div>
      <Row style={styles.importSection}>
        <Col md={6}>
          <h3>
            Let's get your Spotify songs imported! Click the "Import Songs"
            button to see your favorite songs and artists!
          </h3>
        </Col>
        <Col md={6}>
          <button
            style={styles.importBox}
            id="button-spotify-import"
            onClick={beginImport}
          >
            Import Songs
          </button>
        </Col>
      </Row>
    </div>
  );
}

function beginImport() {
  var client_id = '0939bba83f154b66900eaa7a37431b3c';
  var redirect_uri = 'https://looking-for-treble.herokuapp.com/';
  //var redirect_uri = 'http://localhost:3000/spotify';

  var state = '123456';
  var scope = 'user-library-read user-top-read';

  const spotifyURL =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });

  window.location = spotifyURL;
}

export default SpotifyImport;

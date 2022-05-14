import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const styles = {
  card: {
    padding: 20,
    borderStyle: 'solid',
    borderWdith: 15,
    borderColor: 'black',
    width: '18rem',
    boxShadow: '6px 1px 9px 1px black',
  },
  eventsTitle: {
    color: 'white',
    textShadow: '4px 3px 4px #9E9E9E',
    backgroundColor: 'black',
    textAlign: 'center',
    backgroundImage:
      'url(https://cdnb.artstation.com/p/assets/images/images/020/065/699/large/bhavin-solanki-vlcsnap-2019-08-10-11h24m19s192.jpg?1566228322)',
    boxShadow: '6px 1px 9px 1px black',
  },
  eventsContainer: {
    backgroundImage:
      'url(https://cdnb.artstation.com/p/assets/images/images/020/065/699/large/bhavin-solanki-vlcsnap-2019-08-10-11h24m19s192.jpg?1566228322)',
    boxShadow: '6px 1px 9px 1px black',
  },
  artistDisplay: {
    margin: '5px 5px 5px 5px',
  },
  container: {
    background: 'white',
    borderStyle: 'solid',
    borderWdith: 15,
    borderColor: 'black',
    textAlign: 'center',
    backgroundImage:
      'url(https://cdnb.artstation.com/p/assets/images/images/020/065/699/large/bhavin-solanki-vlcsnap-2019-08-10-11h24m19s192.jpg?1566228322)',
  },
  aligned: {
    textAlign: 'center',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '100%',
    boxShadow: '6px 1px 9px 1px #CD33FF',
  },
  image: {
    textAlign: 'center',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '100%',
    boxShadow: '6px 1px 9px 1px black',
  },
  header: {
    textAlign: 'center',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '100%',
  },
  artistName: {
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 3px 1px #9E9E9E',
    fontSize: 16,
  },
  button: {
    boxShadow: '6px 1px 9px 1px black',
  },
};

function EventCard(props) {
  return (
    <div>
      <div>
        <h2 style={styles.eventsTitle}>
          Here are some upcoming events for your favorite artists!
        </h2>
      </div>
      <ListGroup horizontal style={styles.eventsContainer}>
        <Row>
          {props.events.map((event) => (
            <Col>
              <Card style={styles.card}>
                <Card.Img
                  key={event.id}
                  variant="top"
                  src={event.images[2].url}
                  style={styles.image}
                />
                <Card.Body>
                  <Card.Title style={styles.artistName}>
                    {event.name}
                  </Card.Title>
                  <p>
                    Show Date:
                    {event.dates.start.dateTime}
                  </p>
                  <p>Show Time:{event.dates.start.localTime}</p>
                  <p>Show Location:{event._embedded.venues[0].name}</p>
                  <button style={styles.button}>
                    <a href={event.url}>Get tickets</a>
                  </button>
                  {/* <button style={styles.button}>
                    <a>Add to my events page</a>
                  </button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </ListGroup>
    </div>
  );
}

export default EventCard;

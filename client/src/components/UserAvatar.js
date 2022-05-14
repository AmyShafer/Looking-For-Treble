import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const styles = {
  title: {
    padding: 20,
    borderStyle: 'solid',
    borderWdith: 15,
    borderColor: 'black',
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderStyle: 'solid',
    borderWdith: 15,
    borderColor: 'black',
    textAlign: 'center',
  },
  image: {
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
  },
  navBar: {
    color: 'red',
  },
  profileHeader: {
    padding: 5,
    background: 'white',
    // borderStyle: 'solid',
    // borderWeight: 15,
    // borderColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '100%',
  },
  container: {
    boxShadow: '6px 1px 9px 1px #00E5FF',
  },
  importSection: {
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '100%',
    borderRadius: '1%',
    // backgroundColor: '#00E5FF',
    textShadow: '1px 3px 1px #9E9E9E',
    color: 'purple',
    texDecoration: 'none',
  },
  importBox: {
    boxShadow: '6px 1px 9px 1px #CD33FF',
  },
};

function UserAvatar(props) {
  return (
    <div style={styles.container}>
      <Row style={styles.profileHeader}>
        <Col lg={true}>
          <div>
            <Image
              style={styles.importBox}
              fluid="true"
              roundedCircle="true"
              src="https://i.scdn.co/image/ab67616d000048518f4944a3d77dd680bde9fd10"
            ></Image>
            <Col>{/* <h2>USER NAME HERE</h2> */}</Col>
          </div>
        </Col>{' '}
        {/* <Col>
          <h2>Community Page</h2>
        </Col> */}
        <Col>
          <Link to="/myEvents">
            <h2 style={styles.importSection}>My Events</h2>
          </Link>
        </Col>
        <Col>
          <a href="https://www.savethemusic.org/">
            <h2 style={styles.importSection}>SaveTheMusic Foundation</h2>
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default UserAvatar;

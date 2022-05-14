import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

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
  navText: {
    color: 'white',
    textShadow: '4px 3px 4px #9E9E9E',
  },
  navBackground: {
    backgroundImage:
      'url(https://singularityhub.com/wp-content/uploads/2019/05/retro-synthwave-computer-landscape-palm-trees-shutterstock-1022092345.jpg)',
    borderRadius: '1%',
    boxShadow: '6px 1px 9px 1px black',
  },
  container: {
    boxShadow: '6px 1px 9px 1px #00E5FF',
  },
};

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div style={styles.navBackground}>
      <div>
        <nav
          style={styles.image}
          className="navbar navbar-expand-lg navbar-dark bg-transparent d-flex flex-row"
        >
          <a href="/login">
            <img
              src="/Assets/clefArt.png"
              width="30"
              height="50"
              alt="treble clef"
            />
          </a>{' '}
          <div id="navbarNav"> </div>{' '}
          <div>
            <Link className="nav-link navbar-logo" to="/about">
              <img
                src="/Assets/LookingForTreble.png"
                width="150"
                height="150"
                alt="Looking for Treble Logo"
              />
            </Link>{' '}
          </div>{' '}
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/about" style={styles.navText}>
                  {' '}
                  Mission Statement{' '}
                </Link>{' '}
              </li>{' '}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/eventsPage"
                  style={styles.navText}
                >
                  {' '}
                  Events Page{' '}
                </Link>{' '}
              </li>{' '}
              <li className="nav-item">
                <Link className="nav-link" to="/profile" style={styles.navText}>
                  Profile{' '}
                </Link>{' '}
              </li>{' '}
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={styles.navText}>
                  Login{' '}
                </Link>{' '}
              </li>{' '}
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/communityPage"
                  style={styles.navText}
                >
                  Community{' '}
                </Link>{' '}
              </li>{' '} */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://open.spotify.com/playlist/36mXEhFFU2cPrqcKmfoK0M?si=13590d54ca614540"
                  style={styles.navText}
                >
                  {' '}
                  ▶
                </a>{' '}
              </li>{' '}
            </ul>{' '}
            <div> </div>{' '}
          </div>{' '}
        </nav>{' '}
      </div>{' '}
    </div>
  );
}
export default Navigation;

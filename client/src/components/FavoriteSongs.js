import React from 'react';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { ListGroup, Col, Button, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import '../styles/style.css';
function FavoriteSongs(props) {
  return (
    <div id="songsList">
      <Table hover id="songTable">
        {props.songs.map((song) => (
          <tbody>
            <tr>
              <td>
                <img src={song.AlbumImage} alt="song" id="image" />
              </td>
              <td>
                <div className="fw-bold" key={song.SongID}>
                  {song.SongName}
                </div>
              </td>
              <td>{song.ArtistName}</td>
              <td>
                {/*
                <Button bg="primary">
                  <FontAwesomeIcon icon={faPlay} />
                </Button>
                */}
                <audio id="audio" controls key={song.SongID}>
                  <source src={song.PreviewStream} type="audio/mpeg" />
                </audio>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {/* <ListGroup as="ol" numbered id= "songslist">
      {props.songs.map((song) => (
        
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-center align-items-start">
        
          <div className="ms-2 me-auto">
            <Row >
              
              <Col md={3} className= "align-items-center">
                
                <img src={song.AlbumImage} alt="song" />
                
              </Col>
              <Col md={5} >
                <div className="fw-bold" key={song.id}>
                  {song.SongName}
                </div>
                {song.ArtistName}
              </Col>

              <Col md={4}>
                <Button bg="primary" pill>
                <FontAwesomeIcon icon={faPlay} />
                </Button>
              </Col>
              
            </Row>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup> */}
    </div>
  );
}

export default FavoriteSongs;

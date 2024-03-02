import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import httpClient from "../httpClient";
import { Pagination } from 'react-bootstrap';

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [currentAlbumsPage, setCurrentAlbumsPage] = useState(1);
  const [totalAlbumsPages, setTotalAlbumsPages] = useState(1);

  const [currentSongsPage, setCurrentSongsPage] = useState(1);
  const [totalSongsPages, setTotalSongsPages] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("/albums?page=" + currentAlbumsPage + "&per_page=20");
        setAlbums(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/albums'.");
      }
    })();
    (async () => {
      try {
        const response = await httpClient.get("/songs?page=" + currentSongsPage + "&per_page=20");
        setSongs(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/songs'.");
      }
    })();
  }, [currentAlbumsPage, currentSongsPage]);

  useEffect(() => {
    (async() => {
      try {
        const response = await httpClient.get("/albums/total_pages");
        console.log(response.data);
        setTotalAlbumsPages(response.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async() => {
      try {
        const response = await httpClient.get("/songs/total_pages");
        console.log(response.data);
        setTotalSongsPages(response.data);
      } catch (error) {
        console.log(error);
      }
    })();

  }, []);


  const handleAlbumsPageChange = (pageNumber) => {
    setCurrentAlbumsPage(pageNumber);
  };

  const handleSongsPageChange = (pageNumber) => {
    setCurrentSongsPage(pageNumber);
  };

  return(    
    <div>
      <div>
      <Row>
        <Col sm={4}>
          {/* Content for the first column */}
          <div className='mainContainer'>
            <h3 className='titleContainer'>Top Albums</h3>
            <ul>
              {(typeof albums === 'undefined') ? (
                <p>Loading albums...</p>
                ): (
                  albums.map(album => (
                    <li key={album.id}>{album.title} by {album.artist} ({album.rating}/5)</li>
                  ))
                )}
            </ul>
            <Pagination>
              {[...Array(totalAlbumsPages).keys()].map((number) => {

                if (number === 0 || number === totalAlbumsPages - 1) {
                  return (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentAlbumsPage}
                      onClick={() => handleAlbumsPageChange(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  );
                } else if (number >= currentAlbumsPage - 2 && number <= currentAlbumsPage) {
                  return (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentAlbumsPage}
                      onClick={() => handleAlbumsPageChange(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  );
                } else if (number === currentAlbumsPage - 3 || number === currentAlbumsPage + 1) {
                  return <Pagination.Ellipsis key={number + 1} />;
                }

              })}
            </Pagination>
          </div>
        </Col>
        <Col sm={4}>
          {/* Content for the second column */}
          <div className='mainContainer'>
            <h3 className='titleContainer'>Top Songs</h3>
            <ul>
              {(typeof songs === 'undefined') ? (
                <p>Loading songs...</p>
                ): (
                  songs.map(song => (
                    <li key={song.id}>{song.title} by {song.artist} ({song.rating}/5)</li>
                  ))
                )}
            </ul>
            <Pagination>
              {[...Array(totalSongsPages).keys()].map((number) => {

                if (number === 0 || number === totalSongsPages - 1) {
                  return (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentSongsPage}
                      onClick={() => handleSongsPageChange(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  );
                } else if (number >= currentSongsPage - 2 && number <= currentSongsPage) {
                  return (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentSongsPage}
                      onClick={() => handleSongsPageChange(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  );
                } else if (number === currentSongsPage - 3 || number === currentSongsPage + 1) {
                  return <Pagination.Ellipsis key={number + 1} />;
                }

              })}
            </Pagination>
          </div>
        </Col>
        <Col sm={4}>
          {/* Content for the second column */}
          <div className='mainContainer'>
            <h3 className='titleContainer'>Trending</h3>
              <p>Define an endpoint to get most popular songs / albums from the past week</p>
              {/* <Pagination>
                {[...Array(totalPages).keys()].map(number => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    // onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination> */}
          </div>
        </Col>
      </Row>
    </div>
    </div>
  )
}

export default Music;
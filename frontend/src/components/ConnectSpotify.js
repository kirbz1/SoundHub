import React, { useState } from 'react';
import { SpotifyApiContext, UserTop } from 'react-spotify-api';
//import { UserTracks } from 'react-spotify'api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';

const ConnectSpotify = () => {

  const [token, setToken] = useState();
  
  const logout = () => {
    Cookies.remove('spotifyAuthToken')
    window.location = '/profile/connect-spotify'
  }


  return(    
    <div>

      <br/>
          
          <div className='center'>
            {token ? (
              <div>
                <Button style={{marginRight: '15px', marginBottom: '30px'}}>Sync Liked Songs</Button>
                <Button onClick={logout} style={{marginLeft: '15px', marginBottom: '30px'}}>Logout</Button>
                <h3>Your top tracks on Spotify:</h3>
                <SpotifyApiContext.Provider value={token}>
                  <UserTop type="tracks">
                    {(tracks, loading, error) =>
                        tracks?.data?.items?.map(track => (
                          <h6 key={track.id}>{track.name} by {' '}
                          {track.artists.map((artist, index) => (
                            <span key={artist.id}>
                              {artist.name}
                              {index < track.artists.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                          </h6>
                        ))
                    }
                  </UserTop>
                  {/* <UserTracks options={{limit: 50, offset:0}}>
                    {(tracks, loading, error) => 
                      tracks?.data?.items?.map(track => (
                        <h6 key={track.track.id}>{track.track.name} by {' '}
                        {track.track.artists.map((artist, index) => (
                          <span key={artist.id}>
                            {artist.name}
                            {index < track.track.artists.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                        </h6>
                      ))
                    }
                  </UserTracks> 

                  // have some func that iterates through all of a user's UserTracks and saves the important song data
                  // then post it to the backend and save under a user's liked songs 

                  */}
                </SpotifyApiContext.Provider>
                
              </div>
            ) : (
              <SpotifyAuth
                redirectUri='http://localhost:3000/profile/connect-spotify'
                clientID='c04e80f1ce8f46f78dea5af670c70871'
                scopes={[Scopes.userTopRead, Scopes.userLibraryRead]} // either style will work
                onAccessToken={(token) => setToken(token)}
              />
            )}
            {/* use modal probably */}
          </div>
          
      </div>
  )
}

export default ConnectSpotify;
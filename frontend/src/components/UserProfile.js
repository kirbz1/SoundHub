import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../httpClient';


function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await httpClient.get(`/user/` + params.username);
            setUserData(response.data);
    
            const followStatusResponse = await httpClient.get("/follow", {
                params: { id: response.data.id }
            });
            setIsFollowing(followStatusResponse.data.isFollowing);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    fetchUserData();
    
  }, [params]);

  
  const handleFollow = async () => {
    // Send a request to the Flask backend to handle the follow action
    try {
        await httpClient.post("/follow", {
            id: userData.id
        });
        setIsFollowing(true);
    } catch (error) {
        console.log(error);
    }
  };


  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {/* include follow/unfollow button */}
        {/* include user's reviews ? */}
      <br/>
      <h2 className='titleContainer'>{userData.username}'s Profile</h2>
      <div className='center'>
        {!isFollowing ? (
            <button onClick={handleFollow}>Follow {userData.username}</button>
        ) : (
            <p>You are following {userData.username}.</p>
        )}
      </div>      
    </div>
  );
}

export default UserProfile;

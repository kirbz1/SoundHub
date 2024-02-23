import React from 'react';



const YourLikedSongs = () => {

  return(   
    <div>
      <br/>
      <div className='titleContainer'>
        <h5>Your Liked Songs</h5>
      </div>
      <div className='center'>
        <p>ability to view all liked songs and unlike individual songs or expand a modal and view associated info like artist/album/release year/overall rating...</p>
        {/* use list group + pagination + search */}
      </div>
    </div>
  )
}

export default YourLikedSongs;
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

const MusicCard = ({ music }) => {
    const [showMenu, setShowMenu] = useState(false);
  
    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    }

  return (
    <Card style={{ width: '36rem', marginBottom: '-1px', borderRadius: '0', position: 'relative' }}>
      <Card.Body style={{ display: 'flex' }}>
        <div style={{ marginRight: '15px' }}>
        <img src={music.imgurl} alt="" />
        </div>
        <div className='center'>
            <div>
                <Card.Title style={{fontSize: '16px'}}>{music.rank}. {music.title}</Card.Title>
                <Card.Text style={{fontSize: '14px'}}>
                        {music.artist}
                    </Card.Text>
            </div>
            
            <div style={{ position: 'absolute', bottom: 36, right: 85, cursor: 'pointer'}} onClick={toggleShowMenu}>
             <FaBars/>
            </div>
            {showMenu && (
                <div style={{position: 'absolute', bottom: 12, right: 150}}>
                    DROPDOWN MENU - NOT IMPLEMENTED (view, save, review)
                </div>
            )}
            <div style={{ position: 'absolute', bottom: 32, right: 20 }}>            
                    <Card.Text style={{fontSize: '16px'}}>
                     <span style={{color: 'gold', fontSize: '22px' }}>★</span> {music.rating} / 5
                    </Card.Text>
            </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MusicCard;

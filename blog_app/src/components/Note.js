import React from 'react';
import '../style/style.css';

const Note = ({ id,date, title, mediaLink, bgColor, handleDeleteNote }) => {
  const cardStyle = {
    backgroundColor: bgColor,
  };
  return (
    <div className="note-card"style={cardStyle}>
      <div className="note-content">
        <h3>{title}</h3>
        {mediaLink && <img src={mediaLink} alt="Note media" className="note-image" />}
   
      </div>
      <div className="note-footer">
      <h3>{date}</h3>
        {/* <button onClick={() => handleDeleteNote(id)} className="delete-icon">
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default Note;

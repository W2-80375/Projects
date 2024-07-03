import '../style/style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
  const [showAddNote, setShowAddNote] = useState(false);

  const toggleAddNote = () => {
    setShowAddNote(!showAddNote);
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Link to={`/note/${note.id}`} key={note.id} style={{ textDecoration: 'none' }}>
          <Note
            id={note.id}
            title={note.title}
            description={note.description}
            mediaLink={note.mediaLink}
            bgColor={note.bgColor}
            handleDeleteNote={handleDeleteNote}
          />
        </Link>
      ))}
      {showAddNote && (
        <div className="backdrop" onClick={toggleAddNote}>
          <div className="note-new-modal" onClick={(e) => e.stopPropagation()}>
            <AddNote handleAddNote={handleAddNote} onClose={toggleAddNote} />
          </div>
        </div>
      )}
      <button onClick={toggleAddNote} className="special-button">
      Convey your thoughts
      </button>
    </div>
  );
};

export default NotesList;

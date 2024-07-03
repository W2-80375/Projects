import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams, Link , useNavigate} from 'react-router-dom';
import { deleteNote,updateNote } from '../redux/notesSlice'; 
import '../style/style.css';


const NoteDetail = () => {
  const { id } = useParams();
  const note = useSelector(state => state.notes.find(note => note.id === id));
  const [bgColor, setBgColor] = useState(note ? note.bgColor : '');
  const [isEditing, setIsEditing] = useState(false);

  const [editedDescription, setEditedDescription] = useState(note ? note.description : '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (note) {
      setBgColor(note.bgColor);
      setEditedDescription(note.description);
    }
  }, [note]);


  
  const handleDeleteClick = () => {
    dispatch(deleteNote(id)); 
    navigate('/');
  };

  const handleBgColorChange = (e) => {
    const newBgColor = e.target.value;
    setBgColor(newBgColor);
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, bgColor: newBgColor };
      }
      return note;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleSaveDescription = () => {
    if (note) {
      dispatch(updateNote({
        id: note.id,
        description: editedDescription,
      }));
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedDescription(note.description);
    setIsEditing(false); 
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  if (!note) {
    return (
      <div style={{ backgroundColor: bgColor }}>
        <h2 className="text-3xl">Sorry!!! note cannot be found</h2>
        <Link className="text-2xl text-pink-500" to="/">
          Back to the homepage...
        </Link>
      </div>
    );
  }

  return (
    <div className="note-detail" style={{ backgroundColor: bgColor }}>
      <article key={note.id} className="sm:ml-20 sm:mt-13 ml-4 mt-2">
      <Link to="/" className="back-arrow">&#8592;</Link>

        <h2 className="text-5xl text-gray-600">{note.title}</h2>
        <p className="text-sm text-gray-500">Date: {note.date}</p>

        <div className={`note-description ${isEditing ? 'editing' : ''}`}>
          {isEditing ? (
            <input
              type="text"
              value={editedDescription}
              onChange={handleDescriptionChange}
              className="edit-input"
            />
          ) : (
            <div
              className="text-2xl mt-5 text-gray-500 font-medium"
              dangerouslySetInnerHTML={{ __html: note.description }}
            />
          )}
          <div className="edit-actions">
            {isEditing && (
              <>
                <button onClick={handleSaveDescription} className="edit-button">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="edit-button">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        {note.mediaLink && (
          note.mediaLink.match(/\.(jpeg|jpg|gif|png)$/) ? (
            <img src={note.mediaLink} alt="Note media" className="note-img" />
          ) : (
            <video controls className="note-video">
              <source src={note.mediaLink} type="video/mp4" />
            </video>
          )
        )}
        <div>
          <button
            className="button-edit"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="button-delete"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
          <input
            type="color"
            value={bgColor}
            onChange={handleBgColorChange}
            className="color-picker"
            style={{ marginLeft: '600px' }}
          />
        </div>
      </article>
    </div>
  );
};

export default NoteDetail;


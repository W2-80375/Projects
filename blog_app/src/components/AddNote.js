import '../style/style.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/notesSlice';
import RichTextEditor from '../utils/richTextEditor';

const AddNote = ({ show, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [isMediaValid, setIsMediaValid] = useState(false);

  const dispatch = useDispatch();

  const handleAddClick = () => {
    if (title.trim() && description.trim()) {
      dispatch(addNote({
        title,
        description,
        mediaLink,
        bgColor,
        date: new Date().toLocaleDateString(),
      }));
      setTitle('');
      setDescription('');
      setMediaLink('');
      setBgColor('');
      setIsMediaValid(false);
      onClose();
      if (typeof onClose === 'function') {
        onClose(); 
      } 
    }
  };

  const handleMediaLinkChange = (e) => {
    const link = e.target.value;
    setMediaLink(link);
    setIsMediaValid(isValidMediaLink(link));
  };

  const isValidMediaLink = (link) => {
    const imgPattern = /\.(jpeg|jpg|gif|png)$/;
    const videoPattern = /\.(mp4)$/;
    return imgPattern.test(link) || videoPattern.test(link);
  };


  return (
    <div className="backdrop">
      <div className="note-new">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <input
            type="text"
            placeholder="Image/Video Link"
            value={mediaLink}
            onChange={handleMediaLinkChange}
          />
          {isMediaValid && (
            mediaLink.match(/\.(jpeg|jpg|gif|png)$/) ? (
              <img src={mediaLink} alt="Note media" />
            ) : (
              <video controls>
                <source src={mediaLink} type="video/mp4" />
              </video>
            )
          )}
        </div>
        <input
          type="color"
          placeholder="Choose color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="input-fieldBg"
        />
        <RichTextEditor
          value={description}
          onChange={setDescription}
          className="rich-text-editor"
        />
      <div className="note-new-buttons">
        <button onClick={handleAddClick}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>     
       </div>
    </div>
  );
};

export default AddNote;

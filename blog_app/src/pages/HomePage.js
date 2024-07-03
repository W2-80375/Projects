import '../style/style.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NotesList from '../components/NotesList';
import Search from '../components/Search';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const notes = useSelector(state => {
    const filteredNotes = state.notes.filter(note => 
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredNotes.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  });

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div>
      <Search handleSearchNote={setSearchText} />
      <button className="note-new-buttons" onClick={handleSortOrderChange}>
        Sort by Date ({sortOrder === 'asc' ? 'ASC' : 'DSC'})
      </button>
      <NotesList notes={notes} />
    </div>
  );
};

export default HomePage;

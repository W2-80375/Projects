import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Provider store={store}>
      <div className={`${darkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <Header handleToggleDarkMode={() => setDarkMode(!darkMode)} />
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/note/:id" element={<NotePage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </Provider>
  );
};

export default App;

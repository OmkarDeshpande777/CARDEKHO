import React from 'react';

const Header = ({ onShowFavorites, favoritesCount, compareCount, onShowCompare }) => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">Gaadi Dekho</a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#cars">Cars</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button 
            className="favorites-btn" 
            onClick={onShowFavorites}
            title="Your Favorites"
          >
            ★ {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
          </button>
          {compareCount > 0 && (
            <button 
              className="compare-btn-nav" 
              onClick={onShowCompare}
              title="Compare Cars"
            >
              Compare {<span className="badge">{compareCount}</span>}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

const FavoritesPanel = ({ favorites, onClose, onRemoveFavorite, onShowDetails }) => {
  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  return (
    <div className="favorites-panel">
      <div className="favorites-header">
        <h2>Your Favorite Cars</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      
      <div className="favorites-content">
        {favorites.length === 0 ? (
          <p className="no-favorites">You haven't added any cars to your favorites yet.</p>
        ) : (
          <ul className="favorites-list">
            {favorites.map(car => (
              <li key={car.id} className="favorite-item">
                <img 
                  src={car.image} 
                  alt={`${car.brand} ${car.model}`} 
                  className="favorite-image"
                  onClick={() => onShowDetails(car)}
                />
                <div className="favorite-info">
                  <h3 onClick={() => onShowDetails(car)}>{car.brand} {car.model}</h3>
                  <p className="favorite-type">{car.type}</p>
                  <p className="favorite-price">{formatPrice(car.price)}</p>
                </div>
                <button 
                  onClick={() => onRemoveFavorite(car)} 
                  className="remove-favorite-btn"
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel;
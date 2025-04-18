import React from 'react';

const CarCard = ({ car, onAddToFavorite, isFavorite, onShowDetails, onAddToCompare, isInCompare }) => {
  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  return (
    <div className="car-card">
      <div className="car-card-actions">
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToFavorite(car);
          }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
      <img 
        src={car.image} 
        alt={`${car.brand} ${car.model}`} 
        className="car-image" 
        onClick={() => onShowDetails(car)}
      />
      
      <div className="car-details" onClick={() => onShowDetails(car)}>
        <p className="car-brand">{car.brand}</p>
        <h3 className="car-name">{car.model}</h3>
        <span className="car-type">{car.type}</span>
        <p className="car-price">{formatPrice(car.price)}</p>
        <p className="price-label">Ex-showroom Price</p>
        
        <div className="card-footer">
          <button 
            className={`compare-btn-small ${isInCompare ? 'in-compare' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCompare(car);
            }}
            disabled={isInCompare}
          >
            {isInCompare ? 'Added to Compare' : 'Compare'}
          </button>
          <button 
            className="details-btn" 
            onClick={() => onShowDetails(car)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

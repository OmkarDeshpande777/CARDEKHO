import React from 'react';

const CarDetailsModal = ({ car, onClose, onAddToCompare, isInCompare, onAddToFavorite, isFavorite }) => {
  if (!car) return null;

  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  // Group specifications into categories for better organization
  const specCategories = {
    'Performance': ['engine', 'power', 'torque', 'transmission', 'fuelType', 'mileage'],
    'Dimensions': ['seatingCapacity', 'bootSpace', 'groundClearance'],
    'Safety': ['safetyRating', 'airbags', 'parkingSensors'],
    'Features': ['infotainment', 'warranty']
  };

  // Get all specifications that don't fit in the predefined categories
  const otherSpecs = car.specifications ? 
    Object.keys(car.specifications).filter(key => 
      !Object.values(specCategories).flat().includes(key)
    ) : [];

  return (
    <div className="modal-backdrop">
      <div className="car-details-modal">
        <div className="modal-header">
          <h2>{car.brand} {car.model}</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="modal-content">
          <div className="car-details-grid">
            <div className="car-image-large">
              <img src={car.image} alt={`${car.brand} ${car.model}`} />
            </div>
            
            <div className="car-info-panel">
              <div className="car-basic-info">
                <p className="car-type-badge">{car.type}</p>
                <h3 className="car-price-large">{formatPrice(car.price)}</h3>
                <p className="price-label">Ex-showroom Price</p>
              </div>
              
              <div className="car-actions">
                <button 
                  onClick={() => onAddToFavorite(car)} 
                  className={`favorite-btn-large ${isFavorite ? 'favorited' : ''}`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button 
                  onClick={() => onAddToCompare(car)} 
                  className={`compare-btn ${isInCompare ? 'in-compare' : ''}`}
                  disabled={isInCompare}
                >
                  {isInCompare ? 'Added to Compare' : 'Add to Compare'}
                </button>
              </div>
              
              <div className="car-specifications">
                <h3>Specifications</h3>
                
                {Object.entries(specCategories).map(([category, keys]) => (
                  <div key={category} className="spec-category">
                    <h4>{category}</h4>
                    <table className="specs-table">
                      <tbody>
                        {keys.filter(key => car.specifications && car.specifications[key]).map(key => (
                          <tr key={key}>
                            <td className="spec-name">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
                            <td className="spec-value">{car.specifications[key]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
                
                {otherSpecs.length > 0 && (
                  <div className="spec-category">
                    <h4>Other Specifications</h4>
                    <table className="specs-table">
                      <tbody>
                        {otherSpecs.map(key => (
                          <tr key={key}>
                            <td className="spec-name">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
                            <td className="spec-value">{car.specifications[key]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;
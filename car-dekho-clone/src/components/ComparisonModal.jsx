import React from 'react';

const ComparisonModal = ({ cars, onClose, onRemoveCar }) => {
  if (!cars || cars.length === 0) return null;

  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  // Get all specification keys from the first car
  const specKeys = Object.keys(cars[0].specifications || {});

  // Group specifications into categories for better organization
  const specCategories = {
    'Performance': ['engine', 'power', 'torque', 'transmission', 'fuelType', 'mileage'],
    'Dimensions': ['seatingCapacity', 'bootSpace', 'groundClearance'],
    'Safety': ['safetyRating', 'airbags', 'parkingSensors'],
    'Features': ['infotainment', 'warranty']
  };

  return (
    <div className="comparison-modal-backdrop">
      <div className="comparison-modal">
        <div className="comparison-header">
          <h2>Car Comparison</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="comparison-content">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Specification</th>
                {cars.map(car => (
                  <th key={car.id} className="car-comparison-header">
                    <div className="comparison-car-header">
                      <img 
                        src={car.image} 
                        alt={`${car.brand} ${car.model}`} 
                        className="comparison-image" 
                      />
                      <div className="comparison-car-title">
                        <h3>{car.brand} {car.model}</h3>
                        <button 
                          onClick={() => onRemoveCar(car)} 
                          className="remove-compare-btn"
                          title="Remove from comparison"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="comparison-section">
                <td colSpan={cars.length + 1} className="comparison-section-header">Basic Information</td>
              </tr>
              <tr>
                <td className="spec-title">Type</td>
                {cars.map(car => (
                  <td key={car.id}>{car.type}</td>
                ))}
              </tr>
              <tr>
                <td className="spec-title">Price (Ex-showroom)</td>
                {cars.map(car => (
                  <td key={car.id} className="price-cell">{formatPrice(car.price)}</td>
                ))}
              </tr>
              
              {/* Organized specifications by category */}
              {Object.entries(specCategories).map(([category, keys]) => (
                <React.Fragment key={category}>
                  <tr className="comparison-section">
                    <td colSpan={cars.length + 1} className="comparison-section-header">{category}</td>
                  </tr>
                  {keys.filter(key => specKeys.includes(key)).map(key => (
                    <tr key={key}>
                      <td className="spec-title">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </td>
                      {cars.map(car => (
                        <td key={car.id}>{car.specifications[key]}</td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              
              {/* Any remaining specs that aren't categorized */}
              {specKeys.filter(key => 
                !Object.values(specCategories).flat().includes(key)
              ).length > 0 && (
                <React.Fragment>
                  <tr className="comparison-section">
                    <td colSpan={cars.length + 1} className="comparison-section-header">Other Specifications</td>
                  </tr>
                  {specKeys.filter(key => 
                    !Object.values(specCategories).flat().includes(key)
                  ).map(key => (
                    <tr key={key}>
                      <td className="spec-title">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </td>
                      {cars.map(car => (
                        <td key={car.id}>{car.specifications[key]}</td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
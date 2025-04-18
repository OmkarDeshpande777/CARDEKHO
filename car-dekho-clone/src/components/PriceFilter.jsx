import React from 'react';

const PriceFilter = ({ priceRange, setPriceRange, maxPrice }) => {
  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  return (
    <div className="filter-group">
      <h3>Price Range</h3>
      <div className="price-slider">
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          style={{ width: '100%' }}
        />
        <p>Up to {formatPrice(priceRange)}</p>
      </div>
    </div>
  );
};

export default PriceFilter;


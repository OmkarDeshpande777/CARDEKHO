import React from 'react';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  return (
    <div className="filter-group">
      <h3>Vehicle Type</h3>
      <div className="filter-options">
        {categories.map(category => (
          <label key={category} className="filter-option">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;


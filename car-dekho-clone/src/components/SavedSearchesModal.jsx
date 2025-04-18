import React from 'react';

const SavedSearchesModal = ({ savedSearches, onApplySearch, onDeleteSearch, onClose }) => {
  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="saved-searches-modal">
        <div className="modal-header">
          <h2>Saved Searches</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="modal-content">
          {savedSearches.length === 0 ? (
            <p className="no-saves">You don't have any saved searches yet.</p>
          ) : (
            <ul className="saved-searches-list">
              {savedSearches.map((search, index) => (
                <li key={index} className="saved-search-item">
                  <div className="saved-search-info">
                    <h3>{search.name}</h3>
                    <p>
                      {search.selectedCategories.length > 0 
                        ? `Types: ${search.selectedCategories.join(', ')}` 
                        : 'All Types'}
                    </p>
                    <p>Max Price: {formatPrice(search.priceRange)}</p>
                    <p className="saved-date">
                      Saved on: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="saved-search-actions">
                    <button 
                      onClick={() => onApplySearch(search)} 
                      className="apply-search-btn"
                    >
                      Apply
                    </button>
                    <button 
                      onClick={() => onDeleteSearch(index)} 
                      className="delete-search-btn"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedSearchesModal;
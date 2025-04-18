import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CarCard from './components/CarCard';
import CategoryFilter from './components/CategoryFilter';
import PriceFilter from './components/PriceFilter';
import CarDetailsModal from './components/CarDetailsModal';
import ComparisonModal from './components/ComparisonModal';
import SavedSearchesModal from './components/SavedSearchesModal';
import FavoritesPanel from './components/FavoritesPanel';
import carsData from './data/carsData';

function App() {
  // Find all unique car types
  const allCarTypes = [...new Set(carsData.map(car => car.type))];
  
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(3500000);  // Set a default max price
  const [filteredCars, setFilteredCars] = useState(carsData);
  
  // State for modals
  const [selectedCar, setSelectedCar] = useState(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showSavedSearchesModal, setShowSavedSearchesModal] = useState(false);
  
  // State for favorites and comparison
  const [favorites, setFavorites] = useState([]);
  const [carsToCompare, setCarsToCompare] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  
  // State for saved searches
  const [savedSearches, setSavedSearches] = useState([]);
  const [searchName, setSearchName] = useState('');
  
  // Find the highest price car for the range slider
  const maxPrice = Math.max(...carsData.map(car => car.price));

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedSearches = localStorage.getItem('savedSearches');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedSearches) {
      setSavedSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save saved searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  // Handle category filter changes
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter cars based on selected filters
  useEffect(() => {
    let result = carsData;
    
    // Filter by selected categories if any are selected
    if (selectedCategories.length > 0) {
      result = result.filter(car => selectedCategories.includes(car.type));
    }
    
    // Filter by price range
    result = result.filter(car => car.price <= priceRange);
    
    setFilteredCars(result);
  }, [selectedCategories, priceRange]);

  // Handler for showing car details
  const handleShowDetails = (car) => {
    setSelectedCar(car);
  };

  // Handler for adding/removing favorites
  const handleAddToFavorite = (car) => {
    if (favorites.some(fav => fav.id === car.id)) {
      setFavorites(favorites.filter(fav => fav.id !== car.id));
    } else {
      setFavorites([...favorites, car]);
    }
  };

  // Handler for adding/removing cars to compare
  const handleAddToCompare = (car) => {
    if (carsToCompare.length >= 3 && !carsToCompare.some(c => c.id === car.id)) {
      alert('You can compare up to 3 cars only');
      return;
    }
    
    if (carsToCompare.some(c => c.id === car.id)) {
      setCarsToCompare(carsToCompare.filter(c => c.id !== car.id));
    } else {
      setCarsToCompare([...carsToCompare, car]);
    }
  };

  // Save current search
  const handleSaveSearch = () => {
    if (!searchName.trim()) {
      alert('Please enter a name for your search');
      return;
    }
    
    const newSearch = {
      name: searchName,
      selectedCategories,
      priceRange
    };
    
    setSavedSearches([...savedSearches, newSearch]);
    setSearchName('');
    alert('Search saved successfully!');
  };

  // Apply saved search
  const handleApplySearch = (search) => {
    setSelectedCategories(search.selectedCategories);
    setPriceRange(search.priceRange);
    setShowSavedSearchesModal(false);
  };

  // Delete saved search
  const handleDeleteSearch = (index) => {
    const updatedSearches = [...savedSearches];
    updatedSearches.splice(index, 1);
    setSavedSearches(updatedSearches);
  };

  return (
    <div className="App">
      <Header 
        onShowFavorites={() => setShowFavorites(!showFavorites)}
        favoritesCount={favorites.length}
        compareCount={carsToCompare.length}
        onShowCompare={() => carsToCompare.length > 0 && setShowComparisonModal(true)}
      />
      
      {showFavorites && (
        <FavoritesPanel 
          favorites={favorites} 
          onClose={() => setShowFavorites(false)}
          onRemoveFavorite={handleAddToFavorite}
          onShowDetails={handleShowDetails}
        />
      )}
      
      <main className="main">
        <div className="container">
          <section className="hero">
            <h1>Find Your Perfect Car</h1>
            <p>Search from a wide range of Indian cars, compare prices, and make an informed decision.</p>
          </section>
          
          <section id="cars">
            <h2 className="section-title">Browse Cars</h2>
            
            <div className="filters">
              <div className="filter-actions">
                <button 
                  className="action-btn"
                  onClick={() => setShowSavedSearchesModal(true)}
                >
                  Saved Searches
                </button>
                <div className="save-search">
                  <input
                    type="text"
                    placeholder="Search name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <button 
                    className="save-btn"
                    onClick={handleSaveSearch}
                  >
                    Save Current Search
                  </button>
                </div>
              </div>

              <CategoryFilter 
                categories={allCarTypes}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
              
              <PriceFilter 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={maxPrice}
              />
            </div>
            
            {carsToCompare.length > 0 && (
              <div className="compare-bar">
                <p>{carsToCompare.length} car(s) selected</p>
                <button
                  className="compare-btn"
                  onClick={() => setShowComparisonModal(true)}
                >
                  Compare Cars
                </button>
                <button
                  className="clear-btn"
                  onClick={() => setCarsToCompare([])}
                >
                  Clear
                </button>
              </div>
            )}
            
            <div className="car-grid">
              {filteredCars.length > 0 ? (
                filteredCars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onAddToFavorite={handleAddToFavorite}
                    isFavorite={favorites.some(fav => fav.id === car.id)}
                    onShowDetails={handleShowDetails}
                    onAddToCompare={handleAddToCompare}
                    isInCompare={carsToCompare.some(c => c.id === car.id)}
                  />
                ))
              ) : (
                <p>No cars match your selected filters.</p>
              )}
            </div>
          </section>
        </div>
      </main>
      
      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal 
          car={selectedCar} 
          onClose={() => setSelectedCar(null)} 
          onAddToCompare={handleAddToCompare}
          isInCompare={carsToCompare.some(c => c.id === selectedCar.id)}
          onAddToFavorite={handleAddToFavorite}
          isFavorite={favorites.some(fav => fav.id === selectedCar.id)}
        />
      )}
      
      {/* Comparison Modal */}
      {showComparisonModal && (
        <ComparisonModal 
          cars={carsToCompare} 
          onClose={() => setShowComparisonModal(false)} 
          onRemoveCar={(car) => handleAddToCompare(car)}
        />
      )}
      
      {/* Saved Searches Modal */}
      {showSavedSearchesModal && (
        <SavedSearchesModal 
          savedSearches={savedSearches}
          onApplySearch={handleApplySearch}
          onDeleteSearch={handleDeleteSearch}
          onClose={() => setShowSavedSearchesModal(false)}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
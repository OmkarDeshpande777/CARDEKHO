
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CarCard from './components/CarCard';
import CategoryFilter from './components/CategoryFilter';
import PriceFilter from './components/PriceFilter';
import FavoritesPage from './components/FavoritesPage';
import CarDetailsPage from './components/CarDetailsPage';
import ComparePage from './components/ComparePage';
import carsData from './data/carsData';

function AppContent() {
  const navigate = useNavigate();
  const allCarTypes = [...new Set(carsData.map(car => car.type))];
  
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(3500000);
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for favorites and comparison
  const [favorites, setFavorites] = useState([]);
  const [carsToCompare, setCarsToCompare] = useState([]);
  
  // Find the highest price car for the range slider
  const maxPrice = Math.max(...carsData.map(car => car.price || 0));

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    console.log('Loading favorites from localStorage:', savedFavorites); // Debug
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving favorites to localStorage:', favorites); // Debug
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle category filter changes
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter cars based on selected filters and search query
  useEffect(() => {
    let result = carsData;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => {
        const brand = (car.brand || '').toString().toLowerCase();
        const model = (car.model || '').toString().toLowerCase();
        return brand.includes(query) || model.includes(query);
      });
    }
    
    if (selectedCategories.length > 0) {
      result = result.filter(car => selectedCategories.includes(car.type));
    }
    
    result = result.filter(car => (car.price || 0) <= priceRange);
    
    setFilteredCars(result);
  }, [selectedCategories, priceRange, searchQuery]);

  // Handler for showing car details
  const handleShowDetails = (car) => {
    navigate(`/car/${car.id}`);
  };

  // Handler for adding/removing favorites
  const handleAddToFavorite = (car) => {
    console.log('Toggling favorite for car:', car.model); // Debug
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

  return (
    <div className="App">
      <Header 
        onShowFavorites={() => navigate('/favorites', { state: { favorites } })}
        favoritesCount={favorites.length}
        compareCount={carsToCompare.length}
        onShowCompare={() => carsToCompare.length > 0 && navigate('/compare', { state: { carsToCompare } })}
      />
      
      <main className="main">
        <div className="container">
          <section className="hero">
            <h1>Find Your Perfect Car</h1>
            <p>Search from a wide range of Indian cars, compare prices, and make an informed decision.</p>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by car model or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </section>
          
          <section id="cars">
            <h2 className="section-title">Browse Cars</h2>
            
            <div className="filters">
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
                  onClick={() => navigate('/compare', { state: { carsToCompare } })}
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
                <p>No cars match your selected filters or search query.</p>
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/car/:id" element={<CarDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
}

export default App;

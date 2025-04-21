
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CarCard from './CarCard';

function FavoritesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites = [] } = location.state || { favorites: [] }; // Default to empty array if no state

  console.log('Favorites in FavoritesPage:', favorites); // Debug

  return (
    <div className="App">
      <Header 
        onShowFavorites={() => navigate('/favorites', { state: { favorites } })}
        favoritesCount={favorites.length}
        compareCount={0}
        onShowCompare={() => {}}
      />
      <main className="main">
        <div className="container">
          <section>
            <h2 className="section-title">Your Favorite Cars</h2>
            {favorites.length > 0 ? (
              <div className="car-grid">
                {favorites.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onAddToFavorite={() => navigate('/', { state: { favorites } })} // Navigate back to update
                    isFavorite={true}
                    onShowDetails={() => navigate(`/car/${car.id}`)}
                    onAddToCompare={() => {}}
                    isInCompare={false}
                  />
                ))}
              </div>
            ) : (
              <p>No favorite cars yet. Add some from the main page!</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;

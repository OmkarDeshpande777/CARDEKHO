
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import carsData from '../data/carsData';

function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData.find(car => car.id === parseInt(id));

  if (!car) {
    return (
      <div className="App">
        <Header 
          onShowFavorites={() => navigate('/favorites')}
          favoritesCount={0}
          compareCount={0}
          onShowCompare={() => {}}
        />
        <main className="main">
          <div className="container">
            <p>Car not found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        onShowFavorites={() => navigate('/favorites')}
        favoritesCount={0}
        compareCount={0}
        onShowCompare={() => {}}
      />
      <main className="main">
        <div className="container">
          <section className="car-details-page">
            <h2 className="section-title">{car.brand} {car.model}</h2>
            <div className="car-details-content">
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-details-image" />
              <div className="car-details-specs">
                <h3>Specifications</h3>

                {/* Basic Information */}
                <div className="spec-section">
                  <h4>Basic Information</h4>
                  <p><strong>Type:</strong> {car.type || 'N/A'}</p>
                  <p><strong>Price (Ex-showroom):</strong> ₹{(car.price || 0).toLocaleString('en-IN')}</p>
                </div>

                {/* Performance */}
                <div className="spec-section">
                  <h4>Performance</h4>
                  <p><strong>Engine:</strong> {car.specifications.engine || 'N/A'}</p>
                  <p><strong>Power:</strong> {car.specifications.power || 'N/A'}</p>
                  <p><strong>Torque:</strong> {car.specifications.torque || 'N/A'}</p>
                  <p><strong>Transmission:</strong> {car.specifications.transmission || 'N/A'}</p>
                  <p><strong>Fuel Type:</strong> {car.specifications.fuelType || 'N/A'}</p>
                  <p><strong>Mileage:</strong> {car.specifications.mileage || 'N/A'}</p>
                </div>

                {/* Dimensions */}
                <div className="spec-section">
                  <h4>Dimensions</h4>
                  <p><strong>Dimensions:</strong> {car.specifications.dimensions || 'N/A'}</p>
                  <p><strong>Seating Capacity:</strong> {car.specifications.seatingCapacity || 'N/A'}</p>
                  <p><strong>Boot Space:</strong> {car.specifications.bootSpace || 'N/A'}</p>
                  <p><strong>Ground Clearance:</strong> {car.specifications.groundClearance || 'N/A'}</p>
                </div>

                {/* Safety */}
                <div className="spec-section">
                  <h4>Safety</h4>
                  <p><strong>Safety Rating:</strong> {car.specifications.safetyRating || 'N/A'}</p>
                  <p><strong>Airbags:</strong> {car.specifications.airbags || 'N/A'}</p>
                  <p><strong>Parking Sensors:</strong> {car.specifications.parkingSensors || 'N/A'}</p>
                </div>

                {/* Features */}
                <div className="spec-section">
                  <h4>Features</h4>
                  <p><strong>Features:</strong> {car.specifications.features || 'N/A'}</p>
                  <p><strong>Infotainment:</strong> {car.specifications.infotainment || 'N/A'}</p>
                </div>

                {/* Warranty */}
                <div className="spec-section">
                  <h4>Warranty</h4>
                  <p><strong>Warranty:</strong> {car.specifications.warranty || 'N/A'}</p>
                </div>

                <button 
                  className="back-btn"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CarDetailsPage;

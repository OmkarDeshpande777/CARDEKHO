
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function ComparePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { carsToCompare } = location.state || { carsToCompare: [] };

  // Remove a car from comparison
  const handleRemoveCar = (carId) => {
    const updatedCars = carsToCompare.filter(car => car.id !== carId);
    navigate('/compare', { state: { carsToCompare: updatedCars } });
  };

  return (
    <div className="App">
      <Header 
        onShowFavorites={() => navigate('/favorites', { state: { favorites: [] } })}
        favoritesCount={0}
        compareCount={carsToCompare.length}
        onShowCompare={() => {}}
      />
      <main className="main">
        <div className="container">
          <section>
            <h2 className="section-title">Compare Cars</h2>
            {carsToCompare.length > 0 ? (
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Attribute</th>
                    {carsToCompare.map(car => (
                      <th key={car.id}>{car.brand} {car.model} <button onClick={() => handleRemoveCar(car.id)}>Remove</button></th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Image</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}><img src={car.image} alt={`${car.brand} ${car.model}`} className="comparison-image" /></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Type</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.type || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Price (Ex-showroom)</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>₹{(car.price || 0).toLocaleString('en-IN')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Engine</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.engine || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Power</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.power || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Torque</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.torque || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Transmission</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.transmission || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Fuel Type</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.fuelType || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Mileage</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.mileage || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Seating Capacity</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.seatingCapacity || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Boot Space</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.bootSpace || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Ground Clearance</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.groundClearance || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Safety Rating</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.safetyRating || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Airbags</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.airbags || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Parking Sensors</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.parkingSensors || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Infotainment</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.infotainment || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Warranty</td>
                    {carsToCompare.map(car => (
                      <td key={car.id}>{car.specifications.warranty || 'N/A'}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No cars selected for comparison. Select cars from the home page!</p>
            )}
            {carsToCompare.length > 0 && (
              <button 
                className="back-btn"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ComparePage;

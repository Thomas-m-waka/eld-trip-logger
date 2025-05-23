import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import api from '../api/api';
import 'leaflet/dist/leaflet.css';
import '../assets/css/TripCreate.css';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const ORS_API_KEY = '5b3ce3597851110001cf62485d42edc5368d4db1a3c3aafe9abaaa38';

function PickupSelector({ setPickup }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await fetch(
          `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point_lat=${lat}&point_lng=${lng}`
        );
        const data = await res.json();
        const name = data.features?.[0]?.properties?.label || 'Selected pickup';
        setPickup({ lat, lng, name });
      } catch (error) {
        console.error('Error resolving pickup name:', error);
      }
    },
  });
  return null;
}

const TripCreate = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null, name: '' });
  const [pickup, setPickup] = useState({ lat: null, lng: null, name: '' });
  const [cycleHoursUsed, setCycleHoursUsed] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      try {
        const res = await fetch(
          `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point_lat=${lat}&point_lng=${lng}`
        );
        const data = await res.json();
        const name = data.features?.[0]?.properties?.label || 'Current location';
        setCurrentLocation({ lat, lng, name });
      } catch (error) {
        console.error('Error resolving current location:', error);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickup.lat || !pickup.lng) {
      alert('Please select a pickup point on the map.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        current_location_name: currentLocation.name,
        current_latitude: currentLocation.lat,
        current_longitude: currentLocation.lng,
        pickup_location_name: pickup.name,
        pickup_latitude: pickup.lat,
        pickup_longitude: pickup.lng,
        cycle_hours_used: cycleHoursUsed,
      };
      await api.post('/trips/create/', payload);
      alert('Trip created successfully!');
      setPickup({ lat: null, lng: null, name: '' });
      setCycleHoursUsed('');
    } catch (error) {
      console.error('Error creating trip:', error.response?.data || error.message);
      alert('Trip creation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="trip-create-container"
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="trip-create-header"
      >
        <h2>Create a New Trip</h2>
        <p>Select your pickup location on the map below</p>
      </motion.div>

      <div className="trip-create-content">
        <motion.div 
          className="form-section"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Cycle Hours Used:</label>
              <input
                type="number"
                value={cycleHoursUsed}
                onChange={(e) => setCycleHoursUsed(e.target.value)}
                required
                min="1"
                className="form-input"
                placeholder="Enter hours"
              />
            </div>
          </form>

          {pickup.lat && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="pickup-info"
            >
              <h4>Selected Pickup Location:</h4>
              <p className="pickup-name">{pickup.name}</p>
              <p className="pickup-coords">
                Latitude: {pickup.lat.toFixed(6)} | Longitude: {pickup.lng.toFixed(6)}
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="map-section"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4>Click on the map to select pickup location</h4>
          {currentLocation.lat && (
            <MapContainer
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={13}
              style={{ height: '400px', width: '100%', borderRadius: '10px' }}
              scrollWheelZoom={true}
              zoomControl={false} 
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <PickupSelector setPickup={setPickup} />
              <Marker position={[currentLocation.lat, currentLocation.lng]} />
              {pickup.lat && (
                <Marker position={[pickup.lat, pickup.lng]} />
              )}
              <ZoomControl position="bottomright" />
            </MapContainer>
          )}
        </motion.div>
      </div>

      <motion.button 
        type="submit" 
        className="submit-button"
        onClick={handleSubmit}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Trip'}
      </motion.button>
    </motion.div>
  );
};

export default TripCreate;

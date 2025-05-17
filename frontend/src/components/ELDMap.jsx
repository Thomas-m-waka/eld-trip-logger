import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ELDMap = ({ eldEntries }) => {
  if (!eldEntries || eldEntries.length === 0) {
    return <p>No GPS entries to display.</p>;
  }

  const positions = eldEntries.map(e => [e.latitude, e.longitude]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Route Map</h3>
      <MapContainer center={positions[0]} zoom={7} className="leaflet-container">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={positions} color="blue" />

        {eldEntries.map((entry, index) => (
          <Marker key={index} position={[entry.latitude, entry.longitude]}>
            <Popup>
              <strong>Status:</strong> {entry.status}<br />
              <strong>Time:</strong> {entry.time}<br />
              <strong>Location:</strong> {entry.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ELDMap;

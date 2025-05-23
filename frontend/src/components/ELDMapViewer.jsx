import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../assets/css/ELDMapViewer.css';

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ✅ Fix broken default Leaflet marker icons in React+Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ✅ Custom icons
const startIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const endIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const midIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

// ✅ FitBounds helper
const FitBoundsHelper = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 1) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [20, 20] });
    } else if (positions.length === 1) {
      map.setView(positions[0], 15);
    }
  }, [positions, map]);

  return null;
};

const ELDMapViewer = () => {
  const { id: tripId } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await api.get(`/trips/${tripId}/logs/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);
      } catch (err) {
        console.error('Failed to fetch ELD logs:', err);
        setError('Failed to load log data.');
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchLogs();
    } else {
      setError('Trip ID not found.');
      setLoading(false);
    }
  }, [tripId]);

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (logs.length === 0) {
    return (
      <div>
        <h2>ELD Log Viewer for Trip #{tripId}</h2>
        <p>No logs available for this trip.</p>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  const positions = logs.map(log => [log.latitude, log.longitude]);
  const startPosition = positions[0];
  const endPosition = positions[positions.length - 1];

  return (
    <div>
      <h2>ELD Log Viewer for Trip #{tripId}</h2>
      <div className="map-wrapper">
        <MapContainer
          center={startPosition}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBoundsHelper positions={positions} />

          <Polyline positions={positions} color="blue" />

          {/* Start Marker */}
          <Marker position={startPosition} icon={startIcon}>
            <Popup>Start Point</Popup>
          </Marker>

          {/* End Marker */}
          <Marker position={endPosition} icon={endIcon}>
            <Popup>End Point</Popup>
          </Marker>

          {/* Other Log Markers */}
          {logs.map((log, index) => {
            const position = [log.latitude, log.longitude];
            if (index === 0 || index === logs.length - 1) return null;

            return (
              <Marker key={log.id} position={position} icon={midIcon}>
                <Popup>
                  <strong>{log.timestamp}</strong>
                  <br />
                  Remark: {log.remarks}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        style={{ marginTop: '10px' }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ELDMapViewer;



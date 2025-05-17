import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../assets/css/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [dailyLogId, setDailyLogId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get('/user-profile/');
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile');
        setLoading(false);
        console.error(err);
      }
    };
    loadUser();
  }, []);

  const validateLogId = () => {
    if (!dailyLogId.trim()) {
      alert('Please enter a valid Daily Log ID.');
      return false;
    }
    return true;
  };

  const handleCreateTrip = () => navigate('/create-trip');
  const handleCreateDailyLog = () => navigate('/create-daily-log');
  const handleELDLogEntry = () => navigate('/eld-log-entry');

  const handleViewRoute = () => {
    if (validateLogId()) {
      navigate(`/trips/${dailyLogId}/logs/`);
    }
  };

  const handlePreviewLogsheet = () => {
    if (validateLogId()) {
      navigate(`/logsheet-preview/${dailyLogId}`);
    }
  };



  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="dashboard-loading"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading user data...
        </motion.p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="dashboard-error"
      >
        <motion.p>{error}</motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard-main"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        whileHover={{ y: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="user-info-card"
      >
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </motion.div>

      <div className="button-group">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateTrip}
        >
          Create a New Trip
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateDailyLog}
        >
          Create Daily Log Sheet
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleELDLogEntry}
        >
          Add ELD Log Entry
        </motion.button>
      </div>

      <div className="log-actions">
        <motion.input
          type="text"
          placeholder="Enter Daily Log ID"
          value={dailyLogId}
          onChange={(e) => setDailyLogId(e.target.value)}
          whileFocus={{
            scale: 1.02,
            boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
          }}
        />
        <div className="log-buttons">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewRoute}
          >
            View ELD Route Map
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePreviewLogsheet}
          >
            Preview Logsheet PDF
          </motion.button>
          
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

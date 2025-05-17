import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/api';
import '../assets/css/ELDLogEntryForm.css';

const ELDLogEntryForm = () => {
  const [formData, setFormData] = useState({
    daily_log: '',
    status: '',
    location: '',
    latitude: '',
    longitude: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dailyLogs, setDailyLogs] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
      },
      error => {
        console.error('Geolocation error:', error);
        alert('Location permission is required to log your coordinates.');
      }
    );

    const fetchDailyLogs = async () => {
      try {
        const response = await api.get('/daily-logs/');
        setDailyLogs(response.data);
      } catch (err) {
        console.error('Error fetching daily logs:', err);
      }
    };

    fetchDailyLogs();
  }, []);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/eld-logs/create/', formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit log entry:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        className="success-message"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ✅ Log entry submitted successfully!
      </motion.div>
    );
  }

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form 
        className="eld-log-form"
        onSubmit={handleSubmit}
        whileHover={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      >
        <motion.h2 
          className="form-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ELD Log Entry
        </motion.h2>

        <div className="form-group">
          <label className="form-label">Daily Log</label>
          <motion.select
            className="form-select"
            name="daily_log"
            value={formData.daily_log}
            onChange={handleChange}
            required
            whileFocus={{ borderColor: '#4a90e2' }}
          >
            <option value="">-- Select Daily Log --</option>
            {dailyLogs.map(log => (
              <option key={log.id} value={log.id}>
                {log.date}
              </option>
            ))}
          </motion.select>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <motion.select 
            className="form-select"
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            required
            whileFocus={{ borderColor: '#4a90e2' }}
          >
            <option value="">-- Select Status --</option>
            <option value="Off Duty">Off Duty</option>
            <option value="Sleeper Berth">Sleeper Berth</option>
            <option value="Driving">Driving</option>
            <option value="On Duty (Not Driving)">On Duty (Not Driving)</option>
          </motion.select>
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <motion.input
            className="form-input"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
            whileFocus={{ borderColor: '#4a90e2' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Remarks</label>
          <motion.textarea
            className="form-textarea"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter remarks (optional)"
            whileFocus={{ borderColor: '#4a90e2' }}
          />
        </div>

        <motion.button 
          type="submit" 
          className="submit-button"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Submitting...
            </motion.span>
          ) : 'Submit Log Entry'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ELDLogEntryForm;
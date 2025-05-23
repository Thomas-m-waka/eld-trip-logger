import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/api';
import '../assets/css/DailyLogSheetForm.css';

const DailyLogSheetForm = () => {
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    trip: '',
    driver_number: '',
    driver_initials: '',
    co_driver_name: '',
    vehicle_number: '',
    shipper_name: '',
    commodity: '',
    load_number: '',
    home_address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available trips
  useEffect(() => {
    api.get('/trips/').then(res => setTrips(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/daily-logs/create/', formData);
      alert('Daily Log Sheet submitted successfully!');
      setFormData({
        trip: '',
        driver_number: '',
        driver_initials: '',
        co_driver_name: '',
        vehicle_number: '',
        shipper_name: '',
        commodity: '',
        load_number: '',
        home_address: '',
      });
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="daily-log-form-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 variants={itemVariants}>Daily Log Sheet</motion.h2>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="daily-log-form"
        variants={containerVariants}
      >
        <motion.div className="form-group" variants={itemVariants}>
          <label>Trip:</label>
          <select 
            name="trip" 
            value={formData.trip} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Trip</option>
            {trips.map(trip => (
              <option key={trip.id} value={trip.id}>
                Trip #{trip.id}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Driver Number:</label>
          <input 
            type="text" 
            name="driver_number" 
            value={formData.driver_number} 
            onChange={handleChange} 
            required 
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Driver Initials:</label>
          <input 
            type="text" 
            name="driver_initials" 
            value={formData.driver_initials} 
            onChange={handleChange} 
            required 
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Co-Driver Name:</label>
             <input 
            type="text" 
            name="co_driver_name" 
            pattern="[A-Za-z\s]+"
            title="Only letters allowed"
            value={formData.co_driver_name} 
            onChange={handleChange} 
            />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Vehicle Number:</label>
          <input 
            type="text" 
            name="vehicle_number" 
            value={formData.vehicle_number} 
            onChange={handleChange} 
            required 
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Shipper Name:</label>
                <input 
            type="text" 
            name="shipper_name" 
            pattern="[A-Za-z\s]+"
            title="Only letters allowed"
            value={formData.shipper_name} 
            onChange={handleChange} 
            />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Commodity:</label>
                    <input 
            type="text" 
            name="commodity" 
            pattern="[A-Za-z\s]+"
            title="Only letters allowed"
            value={formData.commodity} 
            onChange={handleChange} 
            />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Load Number:</label>
          <input 
            type="text" 
            name="load_number" 
            value={formData.load_number} 
            onChange={handleChange} 
          />
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label>Home Address:</label>
                <input 
        type="text" 
        name="home_address" 
        pattern="[A-Za-z0-9\s,.-]+" 
        title="Letters, numbers, and common address characters allowed"
        value={formData.home_address} 
        onChange={handleChange} 
        />
        </motion.div>

        <motion.button
  type="submit"
  disabled={isSubmitting}
  variants={itemVariants}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="submit-button"
>
  {isSubmitting ? 'Submitting...' : 'Submit Log Sheet'}
</motion.button>

      </motion.form>
    </motion.div>
  );
};

export default DailyLogSheetForm;

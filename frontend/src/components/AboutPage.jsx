import { motion } from 'framer-motion';
import { 
  FaGlobeAmericas, 
  FaUsers, 
  FaLightbulb, 
  FaRocket,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiWorld } from 'react-icons/gi';
import '../assets/css/AboutPage.css';

const About = () => {
  const stats = [
    { value: "10,000+", label: "Happy Travelers", icon: <FaUsers /> },
    { value: "50+", label: "Countries Covered", icon: <GiWorld /> },
    { value: "24/7", label: "Support", icon: <IoMdTime /> },
    { value: "2018", label: "Founded", icon: <FaRocket /> }
  ];

  
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About TripPlanner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Revolutionizing the way you plan and experience your travels
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <motion.div 
          className="story-content"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Our Story</h2>
          <p>
            TripPlanner was born in 2018 from a simple frustration: planning trips was too complicated. 
            Our founder, Alex Johnson, spent hours coordinating spreadsheets, maps, and booking confirmations 
            for a family vacation and thought, "There must be a better way."
          </p>
          <p>
            What started as a side project quickly grew into a mission to simplify travel planning for everyone. 
            Today, we're a passionate team of travel enthusiasts, tech experts, and customer experience advocates 
            dedicated to making trip planning effortless and enjoyable.
          </p>
        </motion.div>
        <motion.div 
          className="story-image"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="image-placeholder">
            <FaMapMarkerAlt className="placeholder-icon" />
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mission-statement"
        >
          To empower travelers with intuitive tools that transform trip planning from a chore into
          an exciting part of the journey itself.
        </motion.p>
        
        <div className="mission-points">
          <motion.div 
            className="mission-card"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mission-icon">
              <FaLightbulb />
            </div>
            <h3>Innovate</h3>
            <p>Continuously improve our platform with cutting-edge features</p>
          </motion.div>
          
          <motion.div 
            className="mission-card"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mission-icon">
              <FaHeart />
            </div>
            <h3>Empower</h3>
            <p>Give travelers the tools they need to create perfect trips</p>
          </motion.div>
          
          <motion.div 
            className="mission-card"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mission-icon">
              <FaGlobeAmericas />
            </div>
            <h3>Connect</h3>
            <p>Bring people and places together through better planning</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      

      {/* CTA Section */}
      <motion.section
        className="about-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Ready to plan your next adventure?</h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="cta-button">
            Start Planning Now
          </button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default About;
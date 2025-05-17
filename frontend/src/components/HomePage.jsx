import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaRoute, FaPlaneDeparture,FaQuoteLeft, FaSignInAlt, FaGlobeAmericas } from 'react-icons/fa';
import '../assets/css/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-title"
          >
            Discover the World with <span className="highlight">TripPlanner</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-subtitle"
          >
            Your all-in-one platform for seamless travel planning and unforgettable adventures
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hero-cta"
          >
            <Link to="/login" className="cta-button primary">
              <FaSignInAlt className="button-icon" />
              Start Planning Now
            </Link>
            <Link to="/features" className="cta-button secondary">
              <FaGlobeAmericas className="button-icon" />
              Explore Features
            </Link>
          </motion.div>
        </div>
        
        <div className="hero-image">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="pulse-animation"
          >
            <FaMapMarkedAlt className="map-icon" />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Travelers Love TripPlanner
        </motion.h2>
        
        <div className="features-grid">
          <motion.div 
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="feature-card"
          >
            <div className="feature-icon">
              <FaPlaneDeparture />
            </div>
            <h3>Smart Itineraries</h3>
            <p>Create perfect travel plans with our AI-powered itinerary builder that optimizes your time and interests.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="feature-card"
          >
            <div className="feature-icon">
              <FaRoute />
            </div>
            <h3>Optimized Routes</h3>
            <p>Get the most efficient travel routes with real-time traffic and transportation data.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="feature-card"
          >
            <div className="feature-icon">
              <FaMapMarkedAlt />
            </div>
            <h3>Interactive Maps</h3>
            <p>Visualize your entire trip with our dynamic maps featuring all your saved locations.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="testimonial-section"
      >
        <div className="testimonial-content">
          <FaQuoteLeft className="quote-icon" />
          <p className="testimonial-text">
            TripPlanner completely transformed how I travel. What used to take hours of research now takes minutes, 
            and I discover hidden gems I would have never found on my own!
          </p>
          <div className="testimonial-author">
            <div className="author-avatar"></div>
            <div className="author-info">
              <h4>Sarah Johnson</h4>
              <p>Frequent Traveler</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="footer-cta"
      >
        <h2>Ready to Revolutionize Your Travel Experience?</h2>
        <p>Join thousands of travelers who plan smarter with TripPlanner</p>
        <div className="cta-buttons">
          <Link to="/login" className="cta-button primary">
            Get Started - It's Free
          </Link>
          <Link to="/about" className="cta-button secondary">
            Learn More
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;

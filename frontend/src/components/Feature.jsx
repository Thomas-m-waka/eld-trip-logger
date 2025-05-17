import { motion } from 'framer-motion';
import { 
  FaTachometerAlt,
  FaClock,
  FaRoute,
  FaMapMarkedAlt,
  FaBell,
  FaChartBar,
  FaUsersCog,
  FaMobileAlt,
  FaCloudUploadAlt,
  FaClipboardList
} from 'react-icons/fa';
import '../assets/css/Feature.css';

const Feature = () => {
  const features = [
    {
      icon: <FaTachometerAlt />,
      title: "Real-Time HOS Monitoring",
      description: "Track drivers’ Hours of Service live to ensure FMCSA compliance and avoid violations.",
      delay: 0.1
    },
    {
      icon: <FaClock />,
      title: "Automatic Log Generation",
      description: "Generate daily driver logs automatically from engine data, reducing manual entry errors.",
      delay: 0.2
    },
    {
      icon: <FaRoute />,
      title: "Trip Replay",
      description: "Visualize the entire route of a trip with event markers and stop locations.",
      delay: 0.3
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Live Location Tracking",
      description: "Monitor current driver locations with accurate GPS data and route history.",
      delay: 0.4
    },
    
    {
      icon: <FaChartBar />,
      title: "Analytics Dashboard",
      description: "Visualize driving trends, violations, idle time, and compliance across your fleet.",
      delay: 0.6
    },
    {
      icon: <FaUsersCog />,
      title: "Driver Management",
      description: "Assign, manage, and track driver performance and logs from a centralized portal.",
      delay: 0.7
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Access",
      description: "Drivers can log duty statuses and view logs on their mobile devices even offline.",
      delay: 0.8
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Cloud Sync",
      description: "Logs and reports sync securely to the cloud in real-time for easy access and storage.",
      delay: 0.9
    },
    {
      icon: <FaClipboardList />,
      title: "Inspection Mode",
      description: "Simplified DOT inspection screen for quick log sharing with enforcement officers.",
      delay: 1.0
    }
  ];

  return (
    <div className="feature-page">
      {/* Hero Section */}
      <motion.section 
        className="feature-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="feature-hero-content">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Smart Features for Effortless ELD Compliance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover how ELDLog simplifies fleet compliance, monitoring, and reporting for drivers and managers.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Features Grid */}
      <section className="feature-main">
        <div className="feature-container">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
            >
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="feature-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <h2>Stay Compliant and Efficient with ELDLog</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="cta-button">
              Get Started with ELDLog
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Feature;

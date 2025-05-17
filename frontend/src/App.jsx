import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Feature from './components/Feature';
import Login from './components/LoginPage';
import Signup from './components/SignUpPage';
import About from './components/AboutPage';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import TripCreate from './components/TripCreate';
import DailyLogSheetForm from './components/DailyLogSheetForm';
import ELDLogEntryForm from './components/ELDLogEntryForm';
import ELDMapViewer from './components/ELDMapViewer'; 
import LogsheetPreviewPage from './components/LogsheetPreviewPage';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-trip"
            element={
              <PrivateRoute>
                <TripCreate />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-daily-log"
            element={
              <PrivateRoute>
                <DailyLogSheetForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/eld-log-entry"
            element={
              <PrivateRoute>
                <ELDLogEntryForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/trips/:id/logs/"
            element={
              <PrivateRoute>
                <ELDMapViewer />
              </PrivateRoute>
            }
          />

          <Route
            path="/logsheet-preview/:logsheetId"
            element={
              <PrivateRoute>
                <LogsheetPreviewPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

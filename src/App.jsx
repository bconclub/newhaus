import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/shared/ScrollToTop';
import PreviewLoader from './components/shared/PreviewLoader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import { initUTMTracking } from './utils/utmTracking';

function AppContent() {
  const location = useLocation();
  const [showPreview, setShowPreview] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);

  useEffect(() => {
    // Initialize UTM tracking on app load
    initUTMTracking();
  }, []);

  useEffect(() => {
    // Re-initialize UTM tracking when location changes (to capture new UTM params)
    initUTMTracking();
  }, [location]);

  useEffect(() => {
    // Show preloader on every homepage load/reload
    if (location.pathname === '/') {
      setShowPreview(true);
      setLoaderProgress(0);
    }
  }, [location.pathname]);

  const handlePreviewComplete = () => {
    setShowPreview(false);
    setLoaderProgress(0);
  };

  const handleProgress = (progress) => {
    setLoaderProgress(progress);
  };

  return (
    <>
      {showPreview && <PreviewLoader onComplete={handlePreviewComplete} onProgress={handleProgress} />}
      <div 
        className={showPreview ? 'pointer-events-none' : 'pointer-events-auto'}
      >
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Layout>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;

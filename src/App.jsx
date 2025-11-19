import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Check if preview has been shown in this session
    const previewShown = sessionStorage.getItem('previewShown');
    if (!previewShown) {
      setShowPreview(true);
    }
  }, []);

  const handlePreviewComplete = () => {
    sessionStorage.setItem('previewShown', 'true');
    setShowPreview(false);
  };

  return (
    <>
      {showPreview && <PreviewLoader onComplete={handlePreviewComplete} />}
      <Router>
        <ScrollToTop />
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
      </Router>
    </>
  );
}

export default App;

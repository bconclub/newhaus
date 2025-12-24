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
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/545b7664-b202-46ed-99da-ac669a646d51',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:38',message:'handlePreviewComplete called',data:{beforeShowPreview:showPreview},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    setShowPreview(false);
    setLoaderProgress(0);
    // #region agent log
    setTimeout(()=>{
      const contentDiv=document.querySelector('div[class*="pointer-events"]');
      const homeContent=document.querySelector('main')||document.querySelector('[class*="Home"]');
      fetch('http://127.0.0.1:7246/ingest/545b7664-b202-46ed-99da-ac669a646d51',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:42',message:'After setShowPreview(false)',data:{wrapperDiv:contentDiv?.className,preloaderInDOM:!!document.querySelector('[class*="z-[9999]"]'),contentDivExists:!!contentDiv,homeContentExists:!!homeContent,bodyBg:getComputedStyle(document.body).backgroundColor,htmlBg:getComputedStyle(document.documentElement).backgroundColor},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'G'})}).catch(()=>{});
    },200);
    // #endregion
  };

  const handleProgress = (progress) => {
    setLoaderProgress(progress);
  };

  // #region agent log
  useEffect(()=>{
    const contentDiv=document.querySelector('div[class*="pointer-events"]');
    const homeContent=document.querySelector('main')||document.querySelector('[class*="Home"]');
    fetch('http://127.0.0.1:7246/ingest/545b7664-b202-46ed-99da-ac669a646d51',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:47',message:'showPreview state changed',data:{showPreview,className:showPreview?'pointer-events-none':'pointer-events-auto',preloaderInDOM:!!document.querySelector('[class*="z-[9999]"]'),contentDivExists:!!contentDiv,contentDivClassName:contentDiv?.className,homeContentExists:!!homeContent,bodyBg:getComputedStyle(document.body).backgroundColor},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'G'})}).catch(()=>{});
  },[showPreview]);
  // #endregion
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

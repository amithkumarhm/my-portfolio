import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/common/Layout'
import HomePage from './pages/HomePage'

// Custom component to handle back button behavior
const NavigationHandler = () => {
  const location = useLocation();

  // Listen for back button press
  React.useEffect(() => {
    const handleBackButton = (e) => {
      // If we're not on the home page, prevent default and scroll to top
      if (window.location.hash && window.location.hash !== '#home') {
        e.preventDefault();
        window.location.hash = '#home';
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return null;
};

const App = () => {
  return (
    <Router>
      <NavigationHandler />
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* Add a catch-all route that redirects to home */}
          <Route path='*' element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
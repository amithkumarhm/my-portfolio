import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/common/Layout'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/common/ThemeContext'

// Custom component to handle back button behavior
const NavigationHandler = () => {
  const location = useLocation();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleBackButton = (e) => {
      // If we're not at the top, prevent default and scroll to top
      if (!isAtTop) {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setIsAtTop(true);
        return false;
      }
      // If we're at the top, allow default behavior (exit)
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isAtTop]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App
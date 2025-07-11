import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';
import HomeScreen from './screens/HomeScreen';
import UniformScreen from './screens/UniformScreen';
import WeddingDressScreen from './screens/WeddingDress';
import TraditionalScreen from './screens/TraditionalScreen';
import CommunicationScreen from './screens/CommunicationScreen';
import AboutScreen from './screens/AboutScreen';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <div style={styles.container}>
        <Header cartCount={cart.length} />
        
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<HomeScreen addToCart={addToCart} />} />
            <Route path="/uniforms" element={<UniformScreen addToCart={addToCart} />} />
            <Route path="/wedding-dresses" element={<WeddingDressScreen addToCart={addToCart} />} />
            <Route path="/traditional" element={<TraditionalScreen addToCart={addToCart} />} />
            <Route path="/communication" element={<CommunicationScreen cart={cart} />} />
            <Route path="/about" element={<AboutScreen />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: '20px',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  }
};

export default App;
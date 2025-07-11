import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageHolder from '../components/ImageHolder';
import { baseApiUrl } from '../styles/common';
// Import the background image
import backGrnd from '../BackGrnd.png';

const HomeScreen = ({ addToCart }) => {
  const navigate = useNavigate();
  const [productsByCategory, setProductsByCategory] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState('slide-in');
  const prevCategoryRef = useRef(0);
  
  const categories = [
    { name: 'School Uniform', apiParam: 'School+Uniform' },
    { name: 'Traditional Dresses', apiParam: 'Traditional+Dresses' },
    { name: 'Wedding Dresses', apiParam: 'Wedding+Dresses' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all categories simultaneously
        const responses = await Promise.all(
          categories.map(cat => 
            fetch(`${baseApiUrl}/products/?category=${cat.apiParam}`)
          )
        );
        
        const categoryData = await Promise.all(
          responses.map(res => res.json())
        );
        
        // Create products by category map
        const productsMap = {};
        categories.forEach((cat, index) => {
          productsMap[cat.name] = categoryData[index];
        });
        
        setProductsByCategory(productsMap);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Determine slide direction based on category change
      const nextCategory = (currentCategory + 1) % categories.length;
      const direction = nextCategory > prevCategoryRef.current ? 'slide-in-right' : 'slide-in-left';
      
      prevCategoryRef.current = currentCategory;
      setSlideDirection('slide-out');
      
      setTimeout(() => {
        setCurrentCategory(nextCategory);
        setSlideDirection(direction);
      }, 500);
    }, 5000); // Changed to 5 seconds
    
    return () => clearInterval(interval);
  }, [currentCategory, categories.length]);

  const handleOrder = (product) => {
    addToCart(product);
    alert(`${product.name} added to your order list! Go to Communication to complete.`);
  };

  const handleOrderNowClick = () => {
    navigate('/communication');
  };

  // Get current category products
  const currentCategoryName = categories[currentCategory]?.name || '';
  const categoryProducts = productsByCategory[currentCategoryName] || [];
  const displayProducts = categoryProducts.slice(0, 4);

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.title}>Welcome to Bothakga bja Mahlako</h2>
        <p style={styles.subtitle}>Quality, Expertly Tailored Apparel for Every Occasion.</p>
        <button 
          style={styles.orderButton}
          onClick={handleOrderNowClick}
          aria-label="Order Now"
        >
          Order Now
        </button>
      </div>
      
      <div style={styles.categoryHeader}>
        <h3 style={styles.categoryTitle}>
          {currentCategoryName}
        </h3>
      </div>
      
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <i className="fas fa-spinner fa-spin" style={styles.spinner}></i>
          <p>Loading products...</p>
        </div>
      ) : (
        <div 
          style={{ 
            ...styles.productsContainer, 
            ...styles[slideDirection] 
          }}
        >
          {displayProducts.length > 0 ? (
            displayProducts.map(product => (
              <ImageHolder 
                key={product.id} 
                product={product} 
                onOrder={handleOrder} 
              />
            ))
          ) : (
            <p style={styles.noProducts}>No products available in this category</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  headerContainer: {
    backgroundColor: '#4e73df',
    background: `linear-gradient(rgb(246, 246, 247), rgba(43, 67, 139, 0.1)), url(${backGrnd}) center/cover no-repeat`,
    padding: '40px 20px',
    textAlign: 'center',
    color: 'white',
    borderRadius: '10px',
    marginBottom: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  subtitle: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '0 auto 25px auto',
    opacity: 0.9,
  },
  orderButton: {
    backgroundColor: '#1cc88a',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    ':hover': {
      backgroundColor: '#17a673',
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
    }
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #eee'
  },
  categoryTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#4e73df',
    textAlign: 'center',
  },
  productsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    opacity: 1,
  },
  'slide-in-right': {
    transform: 'translateX(0)',
    opacity: 1,
  },
  'slide-in-left': {
    transform: 'translateX(0)',
    opacity: 1,
  },
  'slide-out': {
    transform: 'translateX(-100%)',
    opacity: 0,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px'
  },
  spinner: {
    fontSize: '40px',
    color: '#4e73df',
    marginBottom: '20px'
  },
  noProducts: {
    textAlign: 'center',
    gridColumn: '1 / -1',
    padding: '40px 0',
    color: '#6c757d'
  }
};

export default HomeScreen;
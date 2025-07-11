import React, { useState, useEffect } from 'react';
import ImageHolder from '../components/ImageHolder';
import { baseApiUrl } from '../styles/common';

const TraditionalScreen = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseApiUrl}/products/?category=Traditional+Dresses`);
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching traditional dresses:', error);
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    addToCart(product);
    alert(`${product.name} added to your order list! Go to Communication to complete.`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Traditional Dresses</h2>
      
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <i className="fas fa-spinner fa-spin" style={styles.spinner}></i>
          <p>Loading traditional dresses...</p>
        </div>
      ) : (
        <div style={styles.productsContainer}>
          {products.length > 0 ? (
            products.map(product => (
              <ImageHolder 
                key={product.id} 
                product={product} 
                onOrder={handleOrder} 
              />
            ))
          ) : (
            <p style={styles.noProducts}>No traditional dresses available at the moment</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px 0'
  },
  title: {
    textAlign: 'center',
    color: '#1cc88a',
    marginBottom: '30px'
  },
  productsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
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
    color: '#1cc88a',
    marginBottom: '20px'
  },
  noProducts: {
    textAlign: 'center',
    gridColumn: '1 / -1',
    padding: '40px 0',
    color: '#6c757d'
  }
};

export default TraditionalScreen;
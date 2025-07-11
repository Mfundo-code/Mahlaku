import React, { useState, useEffect } from 'react';
import ImageHolder from '../components/ImageHolder';
import { baseApiUrl } from '../styles/common';

const findClosestSchool = (schools, query) => {
  if (!query || !schools.length) return null;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Try exact match first
  const exactMatch = schools.find(school => 
    school.name.toLowerCase() === normalizedQuery
  );
  if (exactMatch) return exactMatch;
  
  // Try partial match
  const partialMatch = schools.find(school => 
    school.name.toLowerCase().includes(normalizedQuery)
  );
  if (partialMatch) return partialMatch;
  
  // Fuzzy match with simple distance algorithm
  const results = schools.map(school => {
    const name = school.name.toLowerCase();
    let distance = 0;
    let matches = 0;
    
    // Calculate character matches
    const queryChars = normalizedQuery.split('');
    const nameChars = name.split('');
    
    queryChars.forEach(char => {
      if (nameChars.includes(char)) matches++;
    });
    
    distance = Math.max(normalizedQuery.length, name.length) - matches;
    
    return {
      school,
      distance,
      similarity: matches / Math.max(normalizedQuery.length, name.length)
    };
  });
  
  // Find best match with highest similarity
  const bestMatch = results.sort((a, b) => b.similarity - a.similarity)[0];
  return bestMatch.similarity >= 0.4 ? bestMatch.school : null;
};

const UniformScreen = ({ addToCart }) => {
  const [schoolName, setSchoolName] = useState('');
  const [schools, setSchools] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schoolError, setSchoolError] = useState('');
  const [suggestedSchool, setSuggestedSchool] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${baseApiUrl}/schools/`);
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };
    
    fetchSchools();
  }, []);

  const handleSearch = async () => {
    if (!schoolName.trim()) {
      setSchoolError('Please enter a school name');
      return;
    }
    
    setIsLoading(true);
    setSchoolError('');
    setSuggestedSchool(null);
    
    try {
      // Find closest school match using fuzzy search
      const closestSchool = findClosestSchool(schools, schoolName);
      
      if (!closestSchool) {
        setSchoolError('School not found. Please request assistance or try another name.');
        setProducts([]);
        setIsLoading(false);
        return;
      }
      
      // Check if we need to confirm with user
      const normalizedInput = schoolName.toLowerCase().trim();
      const normalizedSchool = closestSchool.name.toLowerCase();
      
      if (!normalizedSchool.includes(normalizedInput)) {
        setSuggestedSchool(closestSchool);
        setSchoolError(`Did you mean ${closestSchool.name}?`);
        setProducts([]);
        setIsLoading(false);
        return;
      }
      
      // Fetch products for this school
      const response = await fetch(`${baseApiUrl}/products/?school=${closestSchool.id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setSchoolError('Failed to load products. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleUseSuggestion = async () => {
    if (!suggestedSchool) return;
    
    setIsLoading(true);
    setSchoolError('');
    
    try {
      const response = await fetch(`${baseApiUrl}/products/?school=${suggestedSchool.id}`);
      const data = await response.json();
      setProducts(data);
      setSchoolName(suggestedSchool.name); // Update input with correct name
    } catch (error) {
      console.error('Error fetching products:', error);
      setSchoolError('Failed to load products. Please try again.');
    }
    
    setSuggestedSchool(null);
    setIsLoading(false);
  };

  const handleOrder = (product) => {
    addToCart(product);
    alert(`${product.name} added to your order list! Go to Communication to complete.`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>School Uniforms</h2>
      
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="Enter your school name"
          style={styles.searchInput}
        />
        <button 
          style={styles.searchButton}
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Find Uniforms'}
        </button>
      </div>
      
      {schoolError && (
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{schoolError}</p>
          
          {suggestedSchool && (
            <button 
              style={styles.suggestionButton}
              onClick={handleUseSuggestion}
            >
              Yes, show {suggestedSchool.name} uniforms
            </button>
          )}
          
          <button 
            style={styles.assistanceButton}
            onClick={() => window.location.href = '/communication'}
          >
            Request Assistance
          </button>
          <button 
            style={styles.otherProductsButton}
            onClick={() => window.location.href = '/'}
          >
            See More Products
          </button>
        </div>
      )}
      
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <i className="fas fa-spinner fa-spin" style={styles.spinner}></i>
          <p>Loading uniforms...</p>
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
          ) : !schoolError && (
            <p style={styles.instruction}>
              Enter your school name above to see available uniforms
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Added new style for suggestion button
const styles = {
  container: {
    padding: '20px 0'
  },
  title: {
    textAlign: 'center',
    color: '#4e73df',
    marginBottom: '30px'
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '30px',
    maxWidth: '600px',
    margin: '0 auto 30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  searchInput: {
    flex: 1,
    padding: '12px 15px',
    border: 'none',
    fontSize: '16px',
    outline: 'none'
  },
  searchButton: {
    backgroundColor: '#4e73df',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2e59d9'
    },
    ':disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed'
    }
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  errorText: {
    margin: '0 0 15px'
  },
  assistanceButton: {
    backgroundColor: '#e74a3b',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#d62c1a'
    }
  },
  otherProductsButton: {
    backgroundColor: '#36b9cc',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2c9faf'
    }
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
    color: '#4e73df',
    marginBottom: '20px'
  },
  instruction: {
    textAlign: 'center',
    gridColumn: '1 / -1',
    padding: '40px 0',
    color: '#6c757d'
  },
  // New style for suggestion button
  suggestionButton: {
    backgroundColor: '#4e73df',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 10px 10px 0',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2e59d9'
    }
  }
};

export default UniformScreen;
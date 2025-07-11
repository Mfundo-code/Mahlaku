import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUserTie, FaHeart, FaShapes, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import LogoB from '../LogoB.png'; 

const Header = ({ cartCount }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check screen size to determine mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        {/* Replace text with logo image */}
        <img 
          src={LogoB} 
          alt="Mahlaku Apparel Logo" 
          style={styles.logoImage} 
          onClick={() => navigate('/')}
        />
      </div>
      
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav style={styles.nav}>
          <Link to="/" style={styles.navButton}>
            Home
          </Link>
          <Link to="/uniforms" style={styles.navButton}>
            School Uniform
          </Link>
          <Link to="/wedding-dresses" style={styles.navButton}>
            Wedding Dresses
          </Link>
          <Link to="/traditional" style={styles.navButton}>
            Traditional
          </Link>
          
          <div style={styles.dropdownContainer}>
            <button 
              style={styles.iconButton} 
              onClick={toggleDropdown}
              aria-label="More options"
            >
              <FaInfoCircle style={styles.largeIcon} />
            </button>
            
            {showDropdown && (
              <div style={styles.dropdownMenu}>
                <Link to="/about" style={styles.dropdownItem}>About Us</Link>
                <Link to="/communication" style={styles.dropdownItem}>Contact Us</Link>
              </div>
            )}
          </div>
          
          <button 
            style={styles.iconButton}
            onClick={() => navigate('/communication')}
            aria-label="Communication"
          >
            <FaEnvelope style={styles.largeIcon} />
            {cartCount > 0 && (
              <span style={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </nav>
      )}
      
      {/* Mobile Navigation */}
      {isMobile && (
        <div style={styles.mobileNav}>
          <button 
            style={styles.mobileCommunicationButton}
            onClick={() => navigate('/communication')}
            aria-label="Communication"
          >
            <FaEnvelope style={styles.largeIcon} />
            {cartCount > 0 && (
              <span style={styles.mobileCartBadge}>{cartCount}</span>
            )}
          </button>
          
          <button 
            style={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FaTimes style={styles.largeIcon} /> : <FaBars style={styles.largeIcon} />}
          </button>
        </div>
      )}
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && isMobile && (
        <div style={styles.mobileMenuOverlay} onClick={toggleMobileMenu}>
          <div style={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={toggleMobileMenu}>
              <FaTimes style={styles.largeIcon} />
            </button>
            
            <div style={styles.mobileMenuItems}>
              <Link to="/" style={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                <FaHome style={styles.mobileIcon} /> Home
              </Link>
              <Link to="/uniforms" style={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                <FaUserTie style={styles.mobileIcon} /> School Uniform
              </Link>
              <Link to="/wedding-dresses" style={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                <FaHeart style={styles.mobileIcon} /> Wedding Dresses
              </Link>
              <Link to="/traditional" style={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                <FaShapes style={styles.mobileIcon} /> Traditional
              </Link>
              <Link to="/about" style={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                <FaInfoCircle style={styles.mobileIcon} /> About Us
              </Link>
              <Link to="/communication" style={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                <FaEnvelope style={styles.mobileIcon} /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(to right, #e6f7ff, #ffffff)',
    color: '#2c3e50',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: '60px', // Slightly increased height for logo
    borderBottom: '1px solid #d1e8ff',
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  // Replaced text logo with image
  logoImage: {
    height: '40px', // Adjust height as needed
    cursor: 'pointer',
    maxWidth: '100%',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  navButton: {
    backgroundColor: '#4e73df',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '30px',
    padding: '8px 18px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    ':hover': {
      backgroundColor: '#224abe',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    }
  },
  iconButton: {
    background: 'none',
    border: 'none',
    color: '#4e73df',
    padding: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'all 0.3s ease',
    fontSize: '24px',
    width: '40px',
    height: '40px',
    ':hover': {
      backgroundColor: '#e6f7ff',
      transform: 'scale(1.1)',
    }
  },
  largeIcon: {
    fontSize: '24px',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    minWidth: '180px',
    zIndex: 100,
    padding: '10px 0',
    border: '1px solid #e3e6f0',
  },
  dropdownItem: {
    display: 'block',
    padding: '10px 20px',
    textDecoration: 'none',
    color: '#4e73df',
    fontWeight: '500',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f8f9fc',
      color: '#224abe',
      paddingLeft: '25px',
    }
  },
  cartBadge: {
    backgroundColor: '#e74a3b',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  
  // Mobile styles
  mobileNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  mobileMenuButton: {
    background: 'none',
    border: 'none',
    color: '#4e73df',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#e6f7ff',
    }
  },
  mobileCommunicationButton: {
    background: 'none',
    border: 'none',
    color: '#4e73df',
    cursor: 'pointer',
    padding: '8px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#e6f7ff',
    }
  },
  mobileCartBadge: {
    backgroundColor: '#e74a3b',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  mobileMenuOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mobileMenu: {
    width: '280px',
    height: '100%',
    backgroundColor: 'white',
    boxShadow: '-2px 0 15px rgba(0,0,0,0.1)',
    padding: '20px',
    position: 'relative',
    overflowY: 'auto',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#4e73df',
    cursor: 'pointer',
    position: 'absolute',
    top: '15px',
    right: '15px',
    fontSize: '24px',
  },
  mobileMenuItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '40px',
  },
  mobileMenuItem: {
    padding: '15px 20px',
    textDecoration: 'none',
    color: '#4e73df',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    transition: 'all 0.3s',
    fontWeight: '500',
    backgroundColor: '#f8f9fc',
    ':hover': {
      backgroundColor: '#e6f7ff',
      transform: 'translateX(5px)',
    }
  },
  mobileIcon: {
    marginRight: '15px',
    fontSize: '20px',
    color: '#4e73df',
    width: '24px',
    textAlign: 'center',
  },
};

export default Header;
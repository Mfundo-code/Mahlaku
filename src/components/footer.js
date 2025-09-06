import React, { useState, useEffect } from 'react';
import { footerStyle, socialIconStyle } from '../styles/common';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const currentYear = new Date().getFullYear();

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

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: 'https://www.facebook.com/BothakaBjaMahlako',
      whatsapp: 'https://wa.me/277659328906',
      location: "https://maps.app.goo.gl/goybeqWZtPNdCZqJA"
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {/* Social Media Section */}
        <div style={styles.socialSection}>
          <h4 style={styles.sectionTitle}>Connect With Us</h4>
          <div style={styles.socialContainer}>
            <div 
              style={styles.socialItem}
              onClick={() => handleSocialClick('facebook')}
            >
              <i className="fab fa-facebook-f" style={styles.socialIcon}></i>
              <span style={styles.socialText}>Facebook</span>
            </div>
            <div 
              style={styles.socialItem}
              onClick={() => handleSocialClick('whatsapp')}
            >
              <i className="fab fa-whatsapp" style={styles.socialIcon}></i>
              <span style={styles.socialText}>WhatsApp</span>
            </div>
            <div 
              style={styles.socialItem}
              onClick={() => handleSocialClick('location')}
            >
              <i className="fas fa-map-marker-alt" style={styles.socialIcon}></i>
              <span style={styles.socialText}>Location</span>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div style={styles.linksSection}>
          <h4 style={styles.sectionTitle}>Quick Links</h4>
          <div style={styles.linksContainer}>
            <a href="/" style={styles.link}>Home</a>
            <a href="/uniforms" style={styles.link}>School Uniforms</a>
            <a href="/wedding-dresses" style={styles.link}>Wedding Dresses</a>
            <a href="/traditional" style={styles.link}>Traditional Attire</a>
            <a href="/about" style={styles.link}>About Us</a>
            <a href="/communication" style={styles.link}>Contact</a>
          </div>
        </div>

        {/* Contact Info Section */}
        <div style={styles.contactSection}>
          <h4 style={styles.sectionTitle}>Contact Info</h4>
          <div style={styles.contactContainer}>
            <p style={styles.contactItem}>
              <i className="fas fa-phone" style={styles.contactIcon}></i>
              +27 65 932 8906
            </p>
            <p style={styles.contactItem}>
              <i className="fas fa-clock" style={styles.contactIcon}></i>
              Mon-Fri: 8:30 AM - 5:30 PM
            </p>
            <p style={styles.contactItem}>
              <i className="fas fa-map-marker-alt" style={styles.contactIcon}></i>
              Polokwane, South Africa
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={styles.copyrightSection}>
        <p style={styles.copyrightText}>
          &copy; {currentYear} Bothakga bja Mahlako. Created by{' '}
          <a
            href="https://wa.me/2761353762"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.devLink}
          >
            Mfundodev.com
          </a>
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#1a3a8f',
    padding: '40px 5% 20px',
    boxShadow: '0 -2px 20px rgba(0,0,0,0.1)',
    borderTop: '1px solid rgba(26, 58, 143, 0.1)',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
    marginBottom: '30px',
  },
  socialSection: {
    flex: '1',
    minWidth: '250px',
  },
  linksSection: {
    flex: '1',
    minWidth: '250px',
  },
  contactSection: {
    flex: '1',
    minWidth: '250px',
  },
  sectionTitle: {
    color: '#1a3a8f',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: '600',
    position: 'relative',
    paddingBottom: '10px',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  socialItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 15px',
    borderRadius: '8px',
    background: 'rgba(26, 58, 143, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(26, 58, 143, 0.1)',
      transform: 'translateX(5px)',
    }
  },
  socialIcon: {
    color: '#1a3a8f',
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
  },
  socialText: {
    fontWeight: '500',
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    color: '#1a3a8f',
    textDecoration: 'none',
    padding: '8px 0',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    ':hover': {
      color: '#4e73df',
      paddingLeft: '5px',
    }
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: 0,
  },
  contactIcon: {
    color: '#1a3a8f',
    fontSize: '16px',
    width: '20px',
    textAlign: 'center',
  },
  copyrightSection: {
    borderTop: '1px solid rgba(26, 58, 143, 0.1)',
    paddingTop: '20px',
    textAlign: 'center',
  },
  copyrightText: {
    margin: 0,
    color: '#1a3a8f',
    fontSize: '14px',
  },
  devLink: {
    color: '#25D366',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#1a3a8f',
      textDecoration: 'underline',
    }
  }
};

// Add media queries for responsive design
const mediaQueries = `
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 20px;
    }
    
    .section {
      min-width: 100%;
    }
  }
`;

// Add the media queries to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = mediaQueries;
document.head.appendChild(styleSheet);

export default Footer;
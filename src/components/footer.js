import React from 'react';
import { footerStyle, socialIconStyle } from '../styles/common';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: 'https://www.facebook.com/BothakaBjaMahlako',
      whatsapp: 'https://wa.me/27659328906',
      location: "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12819.912951207127!2d29.489362794426704!3d-24.31402321246719!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v1752253201142!5m2!1sen!2sza"
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <footer style={footerStyle}>
      <div style={styles.socialContainer}>
        <i 
          className="fab fa-facebook" 
          style={socialIconStyle} 
          onClick={() => handleSocialClick('facebook')}
        />
        <i 
          className="fab fa-whatsapp" 
          style={socialIconStyle} 
          onClick={() => handleSocialClick('whatsapp')}
        />
        <i 
          className="fas fa-map-marker-alt" 
          style={socialIconStyle} 
          onClick={() => handleSocialClick('location')}
        />
      </div>
      
      <p style={styles.copyright}>
  &copy; {currentYear} Bothakga bja Mahlako. Created by{' '}
  <a
    href="https://wa.me/2761353762"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: '#25D366', textDecoration: 'none' }}
  >
    Mfundo
  </a>.
</p>
    </footer>
  );
};

const styles = {
  socialContainer: {
    margin: '10px 0'
  },
  copyright: {
    margin: '5px 0',
    fontSize: '14px'
  },
  address: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#ddd'
  }
};

export default Footer;
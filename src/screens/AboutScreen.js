import React from 'react';

const AboutUsScreen = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>About Us</h2>
      
      <div style={styles.content}>
        <div style={styles.aboutSection}>
          
          <h3 style={styles.sectionTitle}>Our Mission</h3>
          <p style={styles.paragraph}>
            We strive to provide high-quality, affordable clothing that honors traditional 
            craftsmanship while meeting modern needs. From school uniforms to wedding attire, 
            each piece is designed with care, attention to detail, and respect for the diverse 
            cultures of South Africa.
          </p>
          
          <h3 style={styles.sectionTitle}>Our Values</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>Quality craftsmanship in every stitch</li>
            <li style={styles.listItem}>Authentic representation of cultural heritage</li>
            <li style={styles.listItem}>Affordable pricing for all communities</li>
            <li style={styles.listItem}>Sustainable and ethical production practices</li>
            <li style={styles.listItem}>Exceptional customer service</li>
          </ul>
        </div>
        
        <div style={styles.contactSection}>
         
          <h3 style={styles.sectionTitle}>Contact Information</h3>
          <p style={styles.paragraph}>
            <i className="fas fa-phone" style={styles.icon}></i>
            +27 65 932n8906
          </p>
          
          <h3 style={styles.sectionTitle}>Business Hours</h3>
          <p style={styles.paragraph}>
            Monday-Friday: 8:30 AM - 5:30 PM<br />
            Saturday: 9:00 AM - 2:00 PM<br />
            Sunday: Closed
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px 0',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    color: '#4e73df',
    marginBottom: '30px'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px'
  },
  aboutSection: {
    flex: 2,
    minWidth: '300px'
  },
  contactSection: {
    flex: 1,
    minWidth: '300px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px'
  },
  sectionTitle: {
    color: '#4e73df',
    marginTop: '0',
    borderBottom: '2px solid #eaecf4',
    paddingBottom: '10px'
  },
  paragraph: {
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '20px'
  },
  listItem: {
    marginBottom: '10px',
    lineHeight: '1.5'
  },
  icon: {
    marginRight: '10px',
    color: '#4e73df',
    width: '20px'
  }
};

export default AboutUsScreen;
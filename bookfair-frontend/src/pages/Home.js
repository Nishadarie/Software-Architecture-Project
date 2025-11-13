import React, { useState, useEffect } from "react";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={styles.pageContainer}>
      {/* Navigation Bar */}
      <nav style={{
        ...styles.navbar,
        backgroundColor: scrollY > 50 ? 'rgba(31, 41, 55, 0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none'
      }}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📚</span>
            <span style={styles.logoText}>CIBF 2025</span>
          </div>
          <div style={styles.navLinks}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
            <a href="/login" style={styles.navButton}>Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Overlay */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span style={styles.badgeDot}></span>
            Sri Lanka's Premier Literary Event
          </div>
          <h1 style={styles.heroHeading}>
            Colombo International<br />
            <span style={styles.heroHighlight}>Book Fair 2025</span>
          </h1>
          <p style={styles.heroSubText}>
            Reserve your exhibition space in Sri Lanka's biggest celebration of books.<br />
            Join publishers, authors, and thousands of book enthusiasts.
          </p>
          <div style={styles.heroButtons}>
            <a href="/stall-reservation" style={styles.buttonPrimary}>
              <span>Reserve Your Stall</span>
              <span style={styles.buttonArrow}>→</span>
            </a>
            <a href="/stalls" style={styles.buttonSecondary}>
              <span>Explore Floor Plan</span>
            </a>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Exhibitors</div>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>100K+</div>
              <div style={styles.statLabel}>Visitors</div>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>7 Days</div>
              <div style={styles.statLabel}>Of Books</div>
            </div>
          </div>
        </div>
        <div style={styles.heroPattern}></div>
      </section>

      {/* About Section with Cards */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>About the Fair</span>
            <h2 style={styles.sectionHeading}>
              Where Stories Come Alive
            </h2>
            <p style={styles.sectionSubtext}>
              Experience the largest annual literary exhibition in Sri Lanka
            </p>
          </div>
          <div style={styles.aboutGrid}>
            <div style={styles.aboutCard}>
              <div style={styles.aboutIcon}>🌏</div>
              <h3 style={styles.aboutCardTitle}>Global Reach</h3>
              <p style={styles.aboutCardText}>
                The Colombo International Book Fair brings together publishers, authors, 
                and literary enthusiasts from across the globe in one magnificent venue.
              </p>
            </div>
            <div style={styles.aboutCard}>
              <div style={styles.aboutIcon}>💼</div>
              <h3 style={styles.aboutCardTitle}>Business Hub</h3>
              <p style={styles.aboutCardText}>
                Network with industry leaders, negotiate rights, and discover new titles 
                in a professional environment designed for growth.
              </p>
            </div>
            <div style={styles.aboutCard}>
              <div style={styles.aboutIcon}>🎯</div>
              <h3 style={styles.aboutCardTitle}>Digital Portal</h3>
              <p style={styles.aboutCardText}>
                Our advanced platform enables seamless stall reservations, instant confirmations, 
                and real-time management of your exhibition presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.featuresSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>Platform Features</span>
            <h2 style={styles.sectionHeading}>
              Everything You Need
            </h2>
          </div>
          <div style={styles.featuresGrid}>
            <FeatureCard
              icon="🎫"
              title="Quick Reservations"
              description="Reserve up to three stalls per business in minutes with our streamlined booking system."
              color="#008C8C"
            />
            <FeatureCard
              icon="🗺️"
              title="Interactive Maps"
              description="Visualize the entire exhibition floor and select your ideal location with real-time availability."
              color="#A3E635"
            />
            <FeatureCard
              icon="📱"
              title="QR Entry Pass"
              description="Receive instant confirmation emails with unique QR codes for hassle-free entry and verification."
              color="#1F2937"
            />
            <FeatureCard
              icon="📊"
              title="Dashboard Management"
              description="Staff can monitor reservations, approve requests, and track occupancy in real-time."
              color="#008C8C"
            />
            <FeatureCard
              icon="🔔"
              title="Smart Notifications"
              description="Stay updated with automated alerts about your reservation status and important updates."
              color="#A3E635"
            />
            <FeatureCard
              icon="🔒"
              title="Secure Platform"
              description="Your data is protected with enterprise-grade security and encrypted transactions."
              color="#1F2937"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={styles.processSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>Simple Process</span>
            <h2 style={styles.sectionHeading}>
              Get Started in 4 Steps
            </h2>
          </div>
          <div style={styles.processGrid}>
            <ProcessStep
              number="01"
              title="Create Account"
              description="Sign up with your business details or log in to your existing account."
            />
            <ProcessStep
              number="02"
              title="Browse Stalls"
              description="Explore the interactive floor plan and view all available exhibition spaces."
            />
            <ProcessStep
              number="03"
              title="Reserve Space"
              description="Select and reserve up to three stalls that match your requirements."
            />
            <ProcessStep
              number="04"
              title="Get Confirmation"
              description="Receive instant email confirmation with your personalized QR entry pass."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaHeading}>Ready to Showcase Your Books?</h2>
          <p style={styles.ctaText}>
            Join hundreds of exhibitors at Sri Lanka's most prestigious book fair
          </p>
          <a href="/stall-reservation" style={styles.ctaButton}>
            Reserve Your Stall Now
            <span style={styles.buttonArrow}>→</span>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.container}>
          <div style={styles.contactGrid}>
            <div style={styles.contactInfo}>
              <h2 style={styles.contactHeading}>Get in Touch</h2>
              <p style={styles.contactText}>
                Our support team is here to help you with any questions about stall reservations and the exhibition.
              </p>
              <div style={styles.contactDetails}>
                <div style={styles.contactItem}>
                  <div style={styles.contactIconWrapper}>📞</div>
                  <div>
                    <div style={styles.contactLabel}>Phone</div>
                    <div style={styles.contactValue}>+94 11 234 5678</div>
                  </div>
                </div>
                <div style={styles.contactItem}>
                  <div style={styles.contactIconWrapper}>✉️</div>
                  <div>
                    <div style={styles.contactLabel}>Email</div>
                    <div style={styles.contactValue}>support@bookfair.lk</div>
                  </div>
                </div>
                <div style={styles.contactItem}>
                  <div style={styles.contactIconWrapper}>🏢</div>
                  <div>
                    <div style={styles.contactLabel}>Address</div>
                    <div style={styles.contactValue}>Sri Lanka Book Publishers Association, Colombo</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.contactForm}>
              <input type="text" placeholder="Your Name" style={styles.input} />
              <input type="email" placeholder="Your Email" style={styles.input} />
              <textarea placeholder="Your Message" rows="4" style={{...styles.input, resize: 'vertical'}}></textarea>
              <button style={styles.submitButton}>Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div style={styles.footerBrand}>
              <div style={styles.footerLogo}>
                <span style={styles.logoIcon}>📚</span>
                <span style={styles.logoText}>CIBF 2025</span>
              </div>
              <p style={styles.footerText}>
                Sri Lanka's premier international book fair, celebrating literature and knowledge.
              </p>
            </div>
            <div style={styles.footerLinks}>
              <h4 style={styles.footerHeading}>Quick Links</h4>
              <a href="/stalls" style={styles.footerLink}>View Stalls</a>
              <a href="/stall-reservation" style={styles.footerLink}>Reserve Now</a>
              <a href="/login" style={styles.footerLink}>Login</a>
            </div>
            <div style={styles.footerLinks}>
              <h4 style={styles.footerHeading}>Support</h4>
              <a href="#contact" style={styles.footerLink}>Contact Us</a>
              <a href="#" style={styles.footerLink}>FAQs</a>
              <a href="#" style={styles.footerLink}>Terms & Conditions</a>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>© 2025 Colombo International Book Fair. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      style={{
        ...styles.featureCard,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(0, 140, 140, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{...styles.featureIcon, backgroundColor: color + '15', color: color}}>
        {icon}
      </div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDescription}>{description}</p>
    </div>
  );
};

const ProcessStep = ({ number, title, description }) => {
  return (
    <div style={styles.processStep}>
      <div style={styles.processNumber}>{number}</div>
      <h3 style={styles.processTitle}>{title}</h3>
      <p style={styles.processDescription}>{description}</p>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: "#F9FAFB",
    overflowX: "hidden",
  },
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "20px 0",
    transition: "all 0.3s ease",
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#F9FAFB",
    letterSpacing: "1px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  navLink: {
    color: "#F9FAFB",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.3s",
  },
  navButton: {
    backgroundColor: "#008C8C",
    color: "#F9FAFB",
    padding: "10px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  heroSection: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1F2937 0%, #008C8C 100%)",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(163, 230, 53, 0.1) 0%, transparent 50%)",
  },
  heroPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(249, 250, 251, 0.05) 1px, transparent 0)`,
    backgroundSize: "40px 40px",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    maxWidth: "900px",
    padding: "0 20px",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(249, 250, 251, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "8px 20px",
    borderRadius: "50px",
    color: "#A3E635",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "30px",
    border: "1px solid rgba(163, 230, 53, 0.2)",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#A3E635",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
  heroHeading: {
    fontSize: "4rem",
    fontWeight: "800",
    color: "#F9FAFB",
    marginBottom: "25px",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  },
  heroHighlight: {
    background: "linear-gradient(135deg, #A3E635 0%, #008C8C 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubText: {
    fontSize: "1.2rem",
    color: "rgba(249, 250, 251, 0.8)",
    marginBottom: "40px",
    lineHeight: "1.8",
    maxWidth: "700px",
    margin: "0 auto 40px",
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "60px",
  },
  buttonPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#A3E635",
    color: "#1F2937",
    padding: "16px 32px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
    transition: "all 0.3s",
    boxShadow: "0 10px 30px rgba(163, 230, 53, 0.3)",
  },
  buttonSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "transparent",
    color: "#F9FAFB",
    padding: "16px 32px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
    border: "2px solid rgba(249, 250, 251, 0.2)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s",
  },
  buttonArrow: {
    fontSize: "20px",
    transition: "transform 0.3s",
  },
  heroStats: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    flexWrap: "wrap",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#A3E635",
    marginBottom: "5px",
  },
  statLabel: {
    fontSize: "14px",
    color: "rgba(249, 250, 251, 0.7)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  statDivider: {
    width: "1px",
    height: "50px",
    backgroundColor: "rgba(249, 250, 251, 0.2)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionBadge: {
    display: "inline-block",
    backgroundColor: "#008C8C15",
    color: "#008C8C",
    padding: "8px 20px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  sectionHeading: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "15px",
    lineHeight: "1.2",
  },
  sectionSubtext: {
    fontSize: "1.2rem",
    color: "#6B7280",
    maxWidth: "600px",
    margin: "0 auto",
  },
  aboutSection: {
    padding: "100px 0",
    backgroundColor: "#FFFFFF",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  aboutCard: {
    padding: "40px",
    backgroundColor: "#F9FAFB",
    borderRadius: "16px",
    transition: "all 0.3s",
    border: "2px solid transparent",
  },
  aboutIcon: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  aboutCardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "15px",
  },
  aboutCardText: {
    fontSize: "1rem",
    color: "#6B7280",
    lineHeight: "1.7",
  },
  featuresSection: {
    padding: "100px 0",
    backgroundColor: "#F9FAFB",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    padding: "40px",
    borderRadius: "16px",
    transition: "all 0.3s",
    border: "1px solid #E5E7EB",
  },
  featureIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    marginBottom: "25px",
  },
  featureTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "15px",
  },
  featureDescription: {
    fontSize: "1rem",
    color: "#6B7280",
    lineHeight: "1.7",
  },
  processSection: {
    padding: "100px 0",
    backgroundColor: "#FFFFFF",
  },
  processGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
  },
  processStep: {
    textAlign: "center",
    position: "relative",
  },
  processNumber: {
    fontSize: "4rem",
    fontWeight: "800",
    color: "#008C8C15",
    marginBottom: "20px",
    lineHeight: "1",
  },
  processTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "15px",
  },
  processDescription: {
    fontSize: "1rem",
    color: "#6B7280",
    lineHeight: "1.7",
  },
  ctaSection: {
    padding: "100px 20px",
    background: "linear-gradient(135deg, #008C8C 0%, #1F2937 100%)",
    position: "relative",
    overflow: "hidden",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  ctaHeading: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#F9FAFB",
    marginBottom: "20px",
  },
  ctaText: {
    fontSize: "1.3rem",
    color: "rgba(249, 250, 251, 0.8)",
    marginBottom: "40px",
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#A3E635",
    color: "#1F2937",
    padding: "18px 40px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "700",
    transition: "all 0.3s",
    boxShadow: "0 10px 30px rgba(163, 230, 53, 0.3)",
  },
  contactSection: {
    padding: "100px 0",
    backgroundColor: "#F9FAFB",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "60px",
    alignItems: "start",
  },
  contactInfo: {
    paddingRight: "20px",
  },
  contactHeading: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "20px",
  },
  contactText: {
    fontSize: "1.1rem",
    color: "#6B7280",
    marginBottom: "40px",
    lineHeight: "1.7",
  },
  contactDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  contactItem: {
    display: "flex",
    alignItems: "start",
    gap: "20px",
  },
  contactIconWrapper: {
    width: "50px",
    height: "50px",
    backgroundColor: "#008C8C15",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  contactLabel: {
    fontSize: "14px",
    color: "#6B7280",
    marginBottom: "5px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  contactValue: {
    fontSize: "1.1rem",
    color: "#1F2937",
    fontWeight: "600",
  },
  contactForm: {
    backgroundColor: "#FFFFFF",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "2px solid #E5E7EB",
    fontSize: "16px",
    fontFamily: "inherit",
    transition: "all 0.3s",
    outline: "none",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#008C8C",
    color: "#F9FAFB",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  footer: {
    backgroundColor: "#1F2937",
    padding: "60px 0 30px",
    color: "#F9FAFB",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "60px",
    marginBottom: "40px",
  },
  footerBrand: {
    maxWidth: "350px",
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  footerText: {
    color: "rgba(249, 250, 251, 0.7)",
    lineHeight: "1.7",
  },
  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  footerHeading: {
    fontSize: "1.1rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#F9FAFB",
  },
  footerLink: {
    color: "rgba(249, 250, 251, 0.7)",
    textDecoration: "none",
    transition: "color 0.3s",
    fontSize: "15px",
  },
  footerBottom: {
    paddingTop: "30px",
    borderTop: "1px solid rgba(249, 250, 251, 0.1)",
    textAlign: "center",
    color: "rgba(249, 250, 251, 0.5)",
    fontSize: "14px",
  },
};

export default Home;
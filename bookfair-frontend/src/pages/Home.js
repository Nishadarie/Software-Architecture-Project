import React from "react";

const Home = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroHeading}>Welcome to the Annual Book Fair 🎉</h1>
        <p style={styles.heroSubText}>
          Explore the world of books, connect with publishers, and join exciting events!
        </p>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionHeading}>About the Book Fair</h2>
        <p style={styles.sectionText}>
          Our Book Fair brings together authors, publishers, and book lovers in one place. 
          Enjoy workshops, book launches, interactive sessions, and exclusive discounts.
          Whether you're a reader, a writer, or a publisher, there's something for everyone!
        </p>
      </section>

      {/* Highlights Section */}
      <section style={styles.highlightsSection}>
        <h2 style={styles.sectionHeading}>Highlights</h2>
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h3>Stall Reservations</h3>
            <p>Reserve your stall and showcase your books to thousands of visitors.</p>
          </div>
          <div style={styles.card}>
            <h3>Author Sessions</h3>
            <p>Meet your favorite authors, attend workshops, and get signed copies.</p>
          </div>
          <div style={styles.card}>
            <h3>Exclusive Discounts</h3>
            <p>Enjoy special deals and discounts on a wide range of books.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 Book Fair. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    fontFamily: "'Arial', sans-serif",
    background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "50px",
  },
  heroHeading: {
    fontSize: "3rem",
    color: "#222",
    marginBottom: "10px",
  },
  heroSubText: {
    fontSize: "1.2rem",
    color: "#555",
    maxWidth: "600px",
    margin: "0 auto",
  },
  aboutSection: {
    maxWidth: "800px",
    textAlign: "center",
    marginBottom: "50px",
  },
  sectionHeading: {
    fontSize: "2rem",
    color: "#222",
    marginBottom: "15px",
  },
  sectionText: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.6",
  },
  highlightsSection: {
    textAlign: "center",
    marginBottom: "50px",
  },
  cardsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "250px",
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    color: "#555",
    fontSize: "14px",
    padding: "20px 0",
  },
};

export default Home;

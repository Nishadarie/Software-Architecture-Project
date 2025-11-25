import React, { useState, useEffect } from "react";

// Modern Sidebar Filters Component
const SidebarFilters = ({ sizeFilter, setSizeFilter, showAvailableOnly, setShowAvailableOnly }) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h3 style={styles.sidebarTitle}>Filters</h3>
        <span style={styles.filterBadge}>🎯</span>
      </div>

      <div style={styles.filterSection}>
        <label style={styles.filterLabel}>Stall Size</label>
        <div style={styles.sizeButtons}>
          {["All", "Small", "Medium", "Large"].map((size) => (
            <button
              key={size}
              onClick={() => setSizeFilter(size)}
              style={{
                ...styles.sizeButton,
                ...(sizeFilter === size ? styles.sizeButtonActive : {}),
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.filterSection}>
        <label style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
            style={styles.checkbox}
          />
          <span style={styles.checkboxLabel}>Show Available Only</span>
        </label>
      </div>

      <div style={styles.legend}>
        <h4 style={styles.legendTitle}>Legend</h4>
        <div style={styles.legendItem}>
          <div style={{...styles.legendDot, backgroundColor: "#A3E635"}}></div>
          <span style={styles.legendText}>Available</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendDot, backgroundColor: "#DC2626"}}></div>
          <span style={styles.legendText}>Reserved</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendDot, backgroundColor: "#008C8C"}}></div>
          <span style={styles.legendText}>Selected</span>
        </div>
      </div>

      <div style={styles.priceInfo}>
        <h4 style={styles.priceTitle}>Pricing</h4>
        <div style={styles.priceItem}>
          <span>Small</span>
          <span style={styles.priceAmount}>Rs. 10,000</span>
        </div>
        <div style={styles.priceItem}>
          <span>Medium</span>
          <span style={styles.priceAmount}>Rs. 15,000</span>
        </div>
        <div style={styles.priceItem}>
          <span>Large</span>
          <span style={styles.priceAmount}>Rs. 25,000</span>
        </div>
      </div>
    </div>
  );
};

// Modern Stall Map Component
const StallMap = ({ stalls, onSelectStall, selectedStallId }) => {
  const [hoveredStall, setHoveredStall] = useState(null);

  return (
    <div style={styles.mapContainer}>
      <div style={styles.mapHeader}>
        <h2 style={styles.mapTitle}>Available Stalls</h2>
        <div style={styles.stallCount}>
          <span style={styles.countNumber}>{stalls.filter(s => s.available).length}</span>
          <span style={styles.countLabel}>available</span>
        </div>
      </div>
      
      <div style={styles.stallGrid}>
        {stalls.map((stall) => (
          <button
            key={stall.id}
            onClick={() => stall.available && onSelectStall(stall)}
            onMouseEnter={() => setHoveredStall(stall.id)}
            onMouseLeave={() => setHoveredStall(null)}
            disabled={!stall.available}
            style={{
              ...styles.stallButton,
              backgroundColor: !stall.available 
                ? "#FEE2E2" 
                : selectedStallId === stall.id
                ? "#008C8C"
                : hoveredStall === stall.id
                ? "#D4F4DD"
                : "#F0FDF4",
              border: !stall.available
                ? "2px solid #DC2626"
                : selectedStallId === stall.id
                ? "2px solid #008C8C"
                : hoveredStall === stall.id
                ? "2px solid #A3E635"
                : "2px solid #BBF7D0",
              color: !stall.available
                ? "#DC2626"
                : selectedStallId === stall.id
                ? "#FFFFFF"
                : "#1F2937",
              cursor: stall.available ? "pointer" : "not-allowed",
              transform: hoveredStall === stall.id && stall.available ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hoveredStall === stall.id && stall.available 
                ? "0 8px 16px rgba(163, 230, 53, 0.2)" 
                : "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={styles.stallId}>{stall.name || stall.id}</div>
            <div style={styles.stallSize}>{stall.size}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Modern Stall Modal Component
const StallModal = ({ stall, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>✕</button>
        
        <div style={styles.modalHeader}>
          <div style={styles.modalIcon}>🎫</div>
          <h2 style={styles.modalTitle}>Reserve Stall {stall.id}</h2>
        </div>

        <div style={styles.stallDetails}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Size:</span>
            <span style={styles.detailValue}>{stall.size}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Price:</span>
            <span style={styles.detailValuePrice}>Rs. {stall.price.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Business Name *</label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              style={styles.input}
              placeholder="Enter your business name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Person *</label>
            <input
              type="text"
              required
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              style={styles.input}
              placeholder="Full name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={styles.input}
              placeholder="your@email.com"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={styles.input}
              placeholder="+94 XX XXX XXXX"
            />
          </div>

          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" style={styles.confirmButton}>
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modern Toast Component
const Toast = ({ message, actionLabel, onAction, onClose }) => {
  return (
    <div style={styles.toast}>
      <div style={styles.toastContent}>
        <span style={styles.toastMessage}>{message}</span>
        <button onClick={onAction} style={styles.toastAction}>
          {actionLabel}
        </button>
      </div>
      <button onClick={onClose} style={styles.toastClose}>✕</button>
    </div>
  );
};

// Modern QR Pass Modal Component
const QRPassModal = ({ stall, qrCodeBase64, onClose }) => {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.qrModal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>✕</button>
        
        <div style={styles.qrHeader}>
          <div style={styles.qrIcon}>🎉</div>
          <h2 style={styles.qrTitle}>Reservation Confirmed!</h2>
          <p style={styles.qrSubtitle}>Your entry pass has been generated</p>
        </div>

        <div style={styles.qrPassCard}>
          <div style={styles.qrPassHeader}>
            <h3 style={styles.passTitle}>Colombo Book Fair 2025</h3>
            <span style={styles.passStall}>Stall {stall.id}</span>
          </div>
          
          <div style={styles.qrCodePlaceholder}>
            {qrCodeBase64 ? (
              <img 
                src={`data:image/png;base64,${qrCodeBase64}`} 
                alt="QR Code" 
                style={styles.qrCodeImage}
              />
            ) : (
              <>
                <div style={styles.qrPattern}></div>
                <span style={styles.qrText}>QR CODE</span>
              </>
            )}
          </div>

          <div style={styles.passDetails}>
            <div style={styles.passDetailRow}>
              <span style={styles.passLabel}>Size:</span>
              <span style={styles.passValue}>{stall.size}</span>
            </div>
            <div style={styles.passDetailRow}>
              <span style={styles.passLabel}>Amount Paid:</span>
              <span style={styles.passValue}>Rs. {stall.price.toLocaleString()}</span>
            </div>
            <div style={styles.passDetailRow}>
              <span style={styles.passLabel}>Stall ID:</span>
              <span style={styles.passValue}>{stall.id}</span>
            </div>
          </div>

          <div style={styles.passFooter}>
            <p style={styles.passNote}>
              📧 A copy has been sent to your email
            </p>
          </div>
        </div>

        <button onClick={onClose} style={styles.qrCloseButton}>
          Close
        </button>
      </div>
    </div>
  );
};

// Main Reserve Stall Component
export default function ReserveStall() {
  const [stalls, setStalls] = useState([]);
  const [selectedStall, setSelectedStall] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showQRPass, setShowQRPass] = useState(false);
  const [reservedStall, setReservedStall] = useState(null);
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [sizeFilter, setSizeFilter] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch stalls from backend on component mount
  useEffect(() => {
    loadStalls();
  }, []);

  const loadStalls = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      // Check if user is logged in
      if (!accessToken) {
        console.warn("No access token found, user may not be logged in");
        generateDefaultStalls();
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8083'}/api/stalls`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Map backend stalls to frontend format
          const mappedStalls = data.data.map(stall => ({
            id: stall.id,
            name: stall.name || stall.id,
            size: stall.size || "Medium",
            price: stall.price || 10000,
            available: stall.status === "AVAILABLE"
          }));
          setStalls(mappedStalls);
        } else {
          // If no stalls exist, generate some for demo
          generateDefaultStalls();
        }
      } else {
        console.warn("Failed to load stalls from API, using default stalls");
        // If API fails, generate default stalls
        generateDefaultStalls();
      }
    } catch (error) {
      console.error("Error loading stalls:", error);
      if (error.message === "Failed to fetch") {
        console.warn("Backend not reachable, using default stalls. Make sure backend is running on http://localhost:8083");
      }
      // If error, generate default stalls
      generateDefaultStalls();
    } finally {
      setLoading(false);
    }
  };

  const generateDefaultStalls = () => {
    const defaultStalls = [];
    for (let i = 1; i <= 80; i++) {
      defaultStalls.push({
        id: `A${String(i).padStart(2, "0")}`,
        name: `A${String(i).padStart(2, "0")}`,
        size: i <= 30 ? "Small" : i <= 55 ? "Medium" : "Large",
        price: i <= 30 ? 10000 : i <= 55 ? 15000 : 25000,
        available: Math.random() > 0.3,
      });
    }
    for (let i = 81; i <= 138; i++) {
      defaultStalls.push({
        id: `B${i}`,
        name: `B${i}`,
        size: i <= 100 ? "Small" : i <= 120 ? "Medium" : "Large",
        price: i <= 100 ? 10000 : i <= 120 ? 15000 : 25000,
        available: Math.random() > 0.3,
      });
    }
    setStalls(defaultStalls);
  };

  const filteredStalls = stalls.filter((stall) => {
    if (sizeFilter !== "All" && stall.size !== sizeFilter) return false;
    if (showAvailableOnly && !stall.available) return false;
    return true;
  });

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading stalls...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerSection}>
        <div style={styles.headerContent}>
          <h1 style={styles.pageTitle}>Reserve Your Stall</h1>
          <p style={styles.pageSubtitle}>
            Select your preferred stall location from the available options below
          </p>
        </div>
      </div>

      <div style={styles.mainContent}>
        <SidebarFilters
          sizeFilter={sizeFilter}
          setSizeFilter={setSizeFilter}
          showAvailableOnly={showAvailableOnly}
          setShowAvailableOnly={setShowAvailableOnly}
        />

        <div style={styles.contentArea}>
          <StallMap 
            stalls={filteredStalls} 
            onSelectStall={setSelectedStall}
            selectedStallId={selectedStall?.id}
          />

          <div style={styles.floorPlanSection}>
            <div style={styles.floorPlanHeader}>
              <h3 style={styles.floorPlanTitle}>Floor Plan Reference</h3>
              <p style={styles.floorPlanSubtitle}>
                Use this layout to understand stall placement and proximity
              </p>
            </div>
            <div style={styles.floorPlanContainer}>
              <div style={styles.floorPlanPlaceholder}>
                <span style={styles.floorPlanIcon}>🗺️</span>
                <p style={styles.floorPlanText}>Floor plan image would display here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedStall && (
        <StallModal
          stall={selectedStall}
          onClose={() => setSelectedStall(null)}
          onConfirm={async (formData) => {
            try {
              const accessToken = localStorage.getItem("accessToken");
              
              // Check if user is logged in
              if (!accessToken) {
                alert("Please log in first to make a reservation.");
                return;
              }
              
              const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8083'}/api/reservations`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                  businessId: formData.businessName, // You may need to adjust this
                  stallIds: [selectedStall.id]
                })
              });

              const data = await response.json();

              if (response.ok && data.success) {
                // Update local state
                setStalls(stalls.map((s) =>
                  s.id === selectedStall.id ? { ...s, available: false, ...formData } : s
                ));
                
                // Store reservation data with QR code
                const reservationData = {
                  ...selectedStall,
                  ...formData,
                  reservationId: data.reservationId,
                  qrCodeBase64: data.qrCodeBase64
                };
                
                setReservedStall(reservationData);
                setQrCodeBase64(data.qrCodeBase64);
                setSelectedStall(null);
                setToastMessage("✅ Reservation successful!");
              } else {
                const errorMsg = data.error || data.message || "Reservation failed. Please try again.";
                console.error("Reservation failed:", errorMsg);
                alert(errorMsg);
              }
            } catch (error) {
              console.error("Reservation error:", error);
              let errorMsg = "Something went wrong. Please try again.";
              
              if (error.message === "Failed to fetch") {
                errorMsg = "Cannot connect to the backend server.\n\nPlease make sure:\n1. Backend is running on http://localhost:8083\n2. No firewall is blocking the connection\n3. Backend has been restarted after recent changes";
              } else if (error.message) {
                errorMsg = error.message;
              }
              
              alert(errorMsg);
            }
          }}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          actionLabel="View QR Pass"
          onAction={() => {
            setToastMessage("");
            setShowQRPass(true);
          }}
          onClose={() => setToastMessage("")}
        />
      )}

      {showQRPass && reservedStall && (
        <QRPassModal stall={reservedStall} qrCodeBase64={qrCodeBase64} onClose={() => setShowQRPass(false)} />
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  headerSection: {
    backgroundColor: "#1F2937",
    background: "linear-gradient(135deg, #1F2937 0%, #008C8C 100%)",
    padding: "60px 20px 40px",
    borderBottom: "4px solid #A3E635",
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  pageTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#F9FAFB",
    marginBottom: "10px",
    letterSpacing: "-0.02em",
  },
  pageSubtitle: {
    fontSize: "1.1rem",
    color: "rgba(249, 250, 251, 0.8)",
  },
  mainContent: {
    display: "flex",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "30px 20px",
    gap: "30px",
  },
  sidebar: {
    width: "280px",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    height: "fit-content",
    position: "sticky",
    top: "30px",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "2px solid #F3F4F6",
  },
  sidebarTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1F2937",
    margin: 0,
  },
  filterBadge: {
    fontSize: "1.5rem",
  },
  filterSection: {
    marginBottom: "25px",
  },
  filterLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  sizeButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sizeButton: {
    padding: "12px 16px",
    backgroundColor: "#F9FAFB",
    border: "2px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#6B7280",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  sizeButtonActive: {
    backgroundColor: "#008C8C",
    color: "#FFFFFF",
    borderColor: "#008C8C",
    boxShadow: "0 4px 12px rgba(0, 140, 140, 0.2)",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    padding: "12px",
    backgroundColor: "#F9FAFB",
    borderRadius: "10px",
    transition: "all 0.2s",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  checkboxLabel: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#1F2937",
  },
  legend: {
    marginTop: "30px",
    paddingTop: "25px",
    borderTop: "2px solid #F3F4F6",
  },
  legendTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: "15px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  legendDot: {
    width: "20px",
    height: "20px",
    borderRadius: "6px",
    flexShrink: 0,
  },
  legendText: {
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500",
  },
  priceInfo: {
    marginTop: "25px",
    padding: "20px",
    backgroundColor: "#F0FDF4",
    borderRadius: "12px",
    border: "2px solid #BBF7D0",
  },
  priceTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: "15px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  priceItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "14px",
    color: "#6B7280",
  },
  priceAmount: {
    fontWeight: "700",
    color: "#008C8C",
  },
  contentArea: {
    flex: 1,
  },
  mapContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginBottom: "30px",
  },
  mapHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "2px solid #F3F4F6",
  },
  mapTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1F2937",
    margin: 0,
  },
  stallCount: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    backgroundColor: "#F0FDF4",
    padding: "10px 20px",
    borderRadius: "50px",
  },
  countNumber: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#008C8C",
  },
  countLabel: {
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500",
  },
  stallGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
    gap: "12px",
  },
  stallButton: {
    padding: "16px 8px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  stallId: {
    fontSize: "15px",
    fontWeight: "700",
  },
  stallSize: {
    fontSize: "11px",
    opacity: 0.8,
  },
  floorPlanSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  floorPlanHeader: {
    marginBottom: "20px",
  },
  floorPlanTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "8px",
  },
  floorPlanSubtitle: {
    fontSize: "14px",
    color: "#6B7280",
  },
  floorPlanContainer: {
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    border: "2px solid #E5E7EB",
  },
  floorPlanPlaceholder: {
    aspectRatio: "16/9",
    backgroundColor: "#F9FAFB",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  floorPlanIcon: {
    fontSize: "3rem",
  },
  floorPlanText: {
    fontSize: "14px",
    color: "#6B7280",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(31, 41, 55, 0.7)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    position: "relative",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#F3F4F6",
    border: "none",
    borderRadius: "8px",
    width: "36px",
    height: "36px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6B7280",
    transition: "all 0.2s",
  },
  modalHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  modalIcon: {
    fontSize: "3rem",
    marginBottom: "15px",
  },
  modalTitle: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#1F2937",
    margin: 0,
  },
  stallDetails: {
    backgroundColor: "#F9FAFB",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  detailLabel: {
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "16px",
    color: "#1F2937",
    fontWeight: "700",
  },
  detailValuePrice: {
    fontSize: "18px",
    color: "#008C8C",
    fontWeight: "800",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1F2937",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "2px solid #E5E7EB",
    fontSize: "15px",
    fontFamily: "inherit",
    transition: "all 0.2s",
    outline: "none",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  cancelButton: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#F3F4F6",
    color: "#6B7280",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  confirmButton: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#008C8C",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(0, 140, 140, 0.3)",
  },
  toast: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#1F2937",
    color: "#FFFFFF",
    padding: "20px 25px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    zIndex: 2000,
    minWidth: "300px",
  },
  toastContent: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flex: 1,
  },
  toastMessage: {
    fontSize: "15px",
    fontWeight: "600",
  },
  toastAction: {
    backgroundColor: "#A3E635",
    color: "#1F2937",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  toastClose: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "4px",
  },
  qrModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    position: "relative",
  },
  qrHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  qrIcon: {
    fontSize: "3.5rem",
    marginBottom: "15px",
  },
  qrTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "10px",
  },
  qrSubtitle: {
    fontSize: "15px",
    color: "#6B7280",
  },
  qrPassCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: "16px",
    padding: "30px",
    border: "2px solid #E5E7EB",
    marginBottom: "25px",
  },
  qrPassHeader: {
    textAlign: "center",
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "2px solid #E5E7EB",
  },
  passTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "8px",
  },
  passStall: {
    display: "inline-block",
    backgroundColor: "#008C8C",
    color: "#FFFFFF",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "700",
  },
  qrCodePlaceholder: {
    width: "200px",
    height: "200px",
    margin: "0 auto 25px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    border: "2px solid #E5E7EB",
    position: "relative",
  },
  qrPattern: {
    width: "150px",
    height: "150px",
    backgroundImage: `
      linear-gradient(0deg, #1F2937 2px, transparent 2px),
      linear-gradient(90deg, #1F2937 2px, transparent 2px)
    `,
    backgroundSize: "20px 20px",
    opacity: 0.3,
  },
  qrText: {
    position: "absolute",
    fontSize: "12px",
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: "2px",
  },
  qrCodeImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  passDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  passDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
  },
  passLabel: {
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500",
  },
  passValue: {
    fontSize: "15px",
    color: "#1F2937",
    fontWeight: "700",
  },
  passFooter: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "2px solid #E5E7EB",
    textAlign: "center",
  },
  passNote: {
    fontSize: "14px",
    color: "#6B7280",
    margin: 0,
  },
  qrCloseButton: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#008C8C",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(0, 140, 140, 0.3)",
  },
};
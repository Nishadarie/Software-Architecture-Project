import React, { useState } from "react";
import SidebarFilters from "../components/SidebarFilters";
import StallMap from "../components/StallMap";
import StallModal from "../components/StallModal";
import Toast from "../components/Toast";
import QRPassModal from "../components/QRPassModal";
import floorPlan from "../assets/floorplan.png";

export default function ReserveStall() {
  // ✅ Generate the required stalls
  const generateStalls = () => {
    const stalls = [];

    // A01 - A80
    for (let i = 1; i <= 80; i++) {
      stalls.push({
        id: `A${String(i).padStart(2, "0")}`,
        size: i <= 30 ? "Small" : i <= 55 ? "Medium" : "Large",
        price: i <= 30 ? 10000 : i <= 55 ? 15000 : 25000,
        available: Math.random() > 0.3,
      });
    }

    // B81 - B138
    for (let i = 81; i <= 138; i++) {
      stalls.push({
        id: `B${i}`,
        size: i <= 100 ? "Small" : i <= 120 ? "Medium" : "Large",
        price: i <= 100 ? 10000 : i <= 120 ? 15000 : 25000,
        available: Math.random() > 0.3,
      });
    }

    return stalls;
  };

  const [stalls, setStalls] = useState(generateStalls());
  const [selectedStall, setSelectedStall] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showQRPass, setShowQRPass] = useState(false);
  const [reservedStall, setReservedStall] = useState(null);

  // ✅ Filter states
  const [sizeFilter, setSizeFilter] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // ✅ Apply Filters
  const filteredStalls = stalls.filter((stall) => {
    if (sizeFilter !== "All" && stall.size !== sizeFilter) return false;
    if (showAvailableOnly && !stall.available) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", height: "100vh", padding: "20px" }}>

      {/* ✅ Sidebar Filters */}
      <SidebarFilters
        sizeFilter={sizeFilter}
        setSizeFilter={setSizeFilter}
        showAvailableOnly={showAvailableOnly}
        setShowAvailableOnly={setShowAvailableOnly}
      />

      <div style={{ flex: 1, marginLeft: "20px" }}>
        <h1>Reserve Your Stall</h1>

        {/* ✅ Stall Buttons at Top */}
        <StallMap stalls={filteredStalls} onSelectStall={setSelectedStall} />

        {/* ✅ Instruction Text */}
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#444" }}>
          <strong>Refer the floorplan below to understand stall placement.</strong>
        </p>

        {/* ✅ Floor Plan */}
        <img
          src={floorPlan}
          alt="Floor Plan"
          style={{
            width: "650px",
            height: "auto",
            display: "block",
            marginTop: "10px",
            border: "2px solid #ccc",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* ✅ Reservation Modal */}
      {selectedStall && (
        <StallModal
          stall={selectedStall}
          onClose={() => setSelectedStall(null)}
          onConfirm={() => {
            setStalls(stalls.map((s) =>
              s.id === selectedStall.id ? { ...s, available: false } : s
            ));
            setReservedStall(selectedStall);
            setSelectedStall(null);
            setToastMessage("✅ Reservation successful!");
          }}
        />
      )}

      {/* ✅ Toast Notification */}
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

      {/* ✅ QR Pass Modal */}
      {showQRPass && reservedStall && (
        <QRPassModal stall={reservedStall} onClose={() => setShowQRPass(false)} />
      )}
    </div>
  );
}

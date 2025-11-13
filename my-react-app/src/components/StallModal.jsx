import React from "react";

export default function StallModal({ stall, onClose, onConfirm }) {
  function handleConfirm() {
    onConfirm();
  }

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "8px",
        width: "300px",
        textAlign: "center"
      }}>
        <h3>Confirm Reservation</h3>
        <p><b>Stall:</b> {stall.id}</p>
        <p><b>Size:</b> {stall.size}</p>
        <p><b>Price:</b> Rs.{stall.price}</p>
        <p>Do you want to reserve this stall?</p>

        <button onClick={handleConfirm} style={{ marginRight: "10px" }}>
          Confirm
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

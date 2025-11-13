import React from "react";

export default function QRPassModal({ stall, onClose }) {
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
        <h2>QR Pass</h2>
        <p>Stall: <b>{stall.id}</b></p>

        {/* Placeholder - actual QR will come later */}
        <div style={{
          width: "150px",
          height: "150px",
          background: "#ddd",
          margin: "20px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          (QR CODE)
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

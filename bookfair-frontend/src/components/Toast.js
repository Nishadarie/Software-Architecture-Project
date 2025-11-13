import React, { useEffect } from "react";

export default function Toast({ message, actionLabel, onAction, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#333",
      color: "#fff",
      padding: "12px 18px",
      borderRadius: "6px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}>
      <span>{message}</span>

      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            padding: "6px 10px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

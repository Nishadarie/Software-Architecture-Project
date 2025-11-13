import React from "react";

export default function StallMap({ stalls, onSelectStall }) {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(15, 1fr)", // 15 per row
    gap: "6px", // tighter spacing
    marginTop: "15px",
  };

  const stallStyle = (available) => ({
    padding: "6px 4px",        // ✅ Reduced height significantly
    borderRadius: "4px",
    textAlign: "center",
    cursor: available ? "pointer" : "not-allowed",
    backgroundColor: available ? "#4CAF50" : "#888",
    color: "white",
    fontWeight: "600",
    fontSize: "11px",          // smaller text
    lineHeight: "1.1",         // reduces extra space inside
    transition: "0.25s",
  });

  return (
    <div style={containerStyle}>
      {stalls.map((stall) => (
        <div
          key={stall.id}
          style={stallStyle(stall.available)}
          onClick={() => stall.available && onSelectStall(stall)}
          title={`${stall.size} Stall — Rs.${stall.price}`}
        >
          {stall.id}
        </div>
      ))}
    </div>
  );
}

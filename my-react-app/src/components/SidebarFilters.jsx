import React from "react";

export default function SidebarFilters({ sizeFilter, setSizeFilter, showAvailableOnly, setShowAvailableOnly }) {
  return (
    <div style={{ width: "200px", borderRight: "1px solid #ccc", paddingRight: "20px" }}>
      <h3>Filters</h3>

      <label>Stall Size:</label>
      <select
        value={sizeFilter}
        onChange={(e) => setSizeFilter(e.target.value)}
        style={{ width: "100%", padding: "6px", marginBottom: "12px" }}
      >
        <option value="All">All</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
        />
        Show only available
      </label>
    </div>
  );
}

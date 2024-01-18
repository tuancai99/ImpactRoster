import React from "react";
import "../style/StatusBadge.css";

const StatusBadge = ({ status }) => {
  const badgeClass = status ? "status-badge active" : "status-badge inactive";

  return <div className={badgeClass}>{status ? "Active" : "Inactive"}</div>;
};

export default StatusBadge;

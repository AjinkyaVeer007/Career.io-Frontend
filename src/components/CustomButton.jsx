import React from "react";

function CustomButton({ name, bgColor, color, icon, handleClick }) {
  return (
    <div
      onClick={handleClick}
      style={{ backgroundColor: bgColor, color: color }}
      className="p-2 rounded text-center pointer d-flex align-items-center justify-content-center gap-2"
    >
      {icon && <div>{icon}</div>}
      <div>{name}</div>
    </div>
  );
}

export default CustomButton;

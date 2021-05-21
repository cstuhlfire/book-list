import React from "react";

function Subheading({ children }) {
  return (
    <div
      style={{ marginBottom: 30,
               border: "solid",
               borderColor: "lightgrey" }}>
      {children}
    </div>
  );
}

export default Subheading;

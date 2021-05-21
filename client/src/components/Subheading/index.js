import React from "react";

function Subheading({ children }) {
  return (
    <div
      style={{ marginTop: 20,
               border: "solid",
               borderColor: "lightgrey" }}>
      {children}
    </div>
  );
}

export default Subheading;

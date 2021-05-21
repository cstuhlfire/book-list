import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 250,
              clear: "both", 
              paddingTop: 80,
              marginTop: 30, 
              textAlign: "center",
              border: "solid",
              borderColor: "lightgrey" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;

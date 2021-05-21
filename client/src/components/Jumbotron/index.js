import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 200,
              clear: "both", 
              paddingTop: 50,
              marginTop: 30, 
              textAlign: "center",
              backgroundColor: "#f2f2f2",
              border: "solid",
              borderColor: "lightgrey" }}
      className="jumbotron" >
      {children}
    </div>
  );
}

export default Jumbotron;

import React from "react";
import "./index.css";

function NoMatchRoute() {
  return (
    <div className="noMatchRoute">
      <div>
        <span>404. That's an error</span>
        <p>The requested URL was not found on this server. </p>
        <p>That’s all we know.</p>
      </div>
    </div>
  );
}

export default NoMatchRoute;

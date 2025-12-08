import React from "react";
import "./BookLoader.css";

function BookLoader() {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>Loading book data...</p>
    </div>
  );
}

export default BookLoader;

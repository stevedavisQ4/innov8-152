import React from "react";
import "./loader.component.css";

export const LoadingSpinner = (): JSX.Element => {
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    );
}

export default LoadingSpinner;
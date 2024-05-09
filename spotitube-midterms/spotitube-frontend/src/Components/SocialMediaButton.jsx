import { React } from "react";
import "../assets/css/custom.css";

function SocialMediaButton({ logo, text }) {
  return (
    <button
      className="social-media-button d-flex align-items-center justify-content-center gap-2 w-100 rounded p-3"
      style={{ backgroundColor: "#640D14" }}
    >
      <img
        src={logo}
        alt="Social Media Logo"
        className="social-media-logo logo social-logo"
        style={{ marginLeft: "15px", width: "40px", height: "auto" }}
      />
      <span className="social-media-text text-dark">{text}</span>
    </button>
  );
}

export default SocialMediaButton;

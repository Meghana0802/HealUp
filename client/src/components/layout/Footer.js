import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="start-part">
          <div className="brand-container">
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          <p>HealUp</p>
          </div>
          <div className="desc">
          <p>Explore our resources to enhance your life and well-being.Discover practical tools and guidance for a healthier, happier you.</p>
          </div>
        </div>
        <div className="follow-container">
          <p>Follow Us On</p>
          <div className="follow-icons">
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} className="icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faXTwitter} className="icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} className="icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <p>&copy; 2024 HealUp. All rights reserved.</p>
      </div>
    </>
  );
}

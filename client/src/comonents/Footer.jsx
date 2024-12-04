import React, { useState } from "react";
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    setEmail("");
  };

  return (
    <div className="footer">
      <h2>SneakerVerse</h2>
      <h5>Subscribe to our newsletter</h5>
      <input
        type="text"
        placeholder="Input your email"
        value={email} // Set the value of the input
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="blue-button" onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Footer;

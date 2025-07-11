import React from "react";
import "./HelpCenter.css";
import { FaQuestionCircle, FaEnvelope, FaPhoneAlt, FaComments } from "react-icons/fa";

const HelpCenter = () => {
  return (
    <div className="help-center-page">
      <div className="help-container">
        <div className="help-header">
          <h2><FaQuestionCircle /> Help Center</h2>
          <p>We're here to assist you. Find answers or get in touch with support.</p>
        </div>

        <div className="help-section">
          <h3>Frequently Asked Questions</h3>
          <ul className="faq-list">
            <li><strong>How do I reset my password?</strong> - Go to Settings &gt; Security &gt; Reset Password.</li>
            <li><strong>How can I join a study group?</strong> - Navigate to Study Groups &gt; Join Group.</li>
            <li><strong>How to edit my profile?</strong> - Visit your profile and click on "Edit Profile".</li>
          </ul>
        </div>

        <div className="help-section">
          <h3>Contact Us</h3>
          <div className="contact-options">
            <div className="contact-card">
              <FaEnvelope />
              <h4>Email</h4>
              <p>support@edusmart.com</p>
            </div>
            <div className="contact-card">
              <FaPhoneAlt />
              <h4>Phone</h4>
              <p>+1 800 123 4567</p>
            </div>
            <div className="contact-card">
              <FaComments />
              <h4>Live Chat</h4>
              <p>Available Mon–Fri, 9am–6pm</p>
            </div>
          </div>
        </div>

        <div className="help-section">
          <h3>Submit a Request</h3>
          <form className="help-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Describe your issue..." rows="5" required></textarea>
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

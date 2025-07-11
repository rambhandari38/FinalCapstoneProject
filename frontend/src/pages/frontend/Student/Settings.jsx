import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>
      <div className="settings-container">
        <h2>Settings</h2>

        {/* Account Info */}
        <div className="settings-section">
          <h3>Account Information</h3>
          <div className="settings-item">
            <label>Name:</label>
            <input type="text" defaultValue="John Doe" />
          </div>
          <div className="settings-item">
            <label>Email:</label>
            <input type="email" defaultValue="johndoe@example.com" />
          </div>
          <button className="save-btn">Save Changes</button>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <h3>Privacy</h3>
          <div className="settings-item toggle">
            <label>Show profile to others</label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="settings-item toggle">
            <label>Email Notifications</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="settings-item toggle">
            <label>Push Notifications</label>
            <input type="checkbox" />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="settings-item toggle">
            <label>Dark Mode</label>
            <input type="checkbox" onChange={toggleTheme} checked={darkMode} />
          </div>
        </div>

        {/* Security */}
        <div className="settings-section">
          <h3>Security</h3>
          <div className="settings-item">
            <label>Change Password</label>
            <button className="secondary-btn">Update</button>
          </div>
          <div className="settings-item">
            <label>Delete Account</label>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

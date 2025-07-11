import React, { useState } from "react";
import "./Profile.css";

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [isEditing, setIsEditing] = useState(false);

  const toggleTab = (tab) => setActiveTab(tab);
  const handleEditClick = () => setIsEditing(true);
  const handleCloseModal = () => setIsEditing(false);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-photo">
            <img
              src="https://i.pravatar.cc/120?img=12"
              alt="Profile"
              className="avatar"
            />
            <button className="edit-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Jane Doe</h2>
            <p className="profile-role">Student | Computer Science</p>
            <div className="profile-meta">
              <span>ID: 102348</span>
              <span>Year: 3rd</span>
            </div>
            <div className="profile-progress">
              <label>Profile Completion</label>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "78%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={activeTab === "skills" ? "active" : ""}
            onClick={() => toggleTab("skills")}
          >
            My Skills
          </button>
          <button
            className={activeTab === "groups" ? "active" : ""}
            onClick={() => toggleTab("groups")}
          >
            Study Groups
          </button>
          <button
            className={activeTab === "goals" ? "active" : ""}
            onClick={() => toggleTab("goals")}
          >
            Learning Goals
          </button>
        </div>

        <div className="profile-content">
          {activeTab === "skills" && (
            <ul className="info-list">
              <li>✔️ Web Development - Intermediate</li>
              <li>✔️ Data Structures - Advanced</li>
              <li>✔️ UI/UX Design - Beginner</li>
            </ul>
          )}
          {activeTab === "groups" && (
            <ul className="info-list">
              <li>👨‍💻 Frontend Warriors</li>
              <li>📊 Data Analyzers</li>
              <li>🧠 AI Explorers</li>
            </ul>
          )}
          {activeTab === "goals" && (
            <ul className="info-list">
              <li>📚 Complete React course by July</li>
              <li>🏆 Publish a tech blog monthly</li>
              <li>📝 Prepare for internship interviews</li>
            </ul>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Profile</h3>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Major" />
            <input type="number" placeholder="Academic Year" />
            <input type="text" placeholder="Student ID" />
            <button onClick={handleCloseModal}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;

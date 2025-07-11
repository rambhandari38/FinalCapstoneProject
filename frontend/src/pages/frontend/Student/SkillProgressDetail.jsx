import React, { useState } from "react";
import "./SkillProgressDetail.css";
import { useNavigate } from "react-router-dom";

const SkillDetail = () => {
  const navigate = useNavigate();

  const skillTitle = "Web";
  const author = "Emma Johnson";
  const level = "Advanced";
  const topics = [
    "HTML Basics",
    "CSS Styling",
    "JavaScript Fundamentals",
    "Responsive Design",
  ];

  const [checkedItems, setCheckedItems] = useState(
    new Array(topics.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  const completedCount = checkedItems.filter(Boolean).length;
  const completionPercent = Math.round(
    (completedCount / topics.length) * 100
  );

  return (
    <div className="skill-detail-page">
      <div className="skill-detail-container">
        <div className="skill-detail-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <div className="skill-title">
            {skillTitle} - {author} ({level})
          </div>
          <button className="chat-btn">Chat with Mate</button>
        </div>

        <div className="progress-section">
          <p className="progress-label">Progress Tracker</p>
          <p>Completion: {completionPercent}%</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="topics-section">
          <h3>Topics</h3>
          <ul className="topics-list">
            {topics.map((topic, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {topic}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;

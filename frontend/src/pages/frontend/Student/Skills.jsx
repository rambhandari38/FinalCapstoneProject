import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Skills.css';

const allSkills = [
  { icon: '💻', title: 'Web Development', mentor: 'Emma Johnson', level: 'Advanced' },
  { icon: '📈', title: 'Data Analysis', mentor: 'Michael Chen', level: 'Intermediate' },
  { icon: '✍️', title: 'Creative Writing', mentor: 'Sarah Williams', level: 'Beginner' },
  { icon: '🧠', title: 'Machine Learning', mentor: 'Dr. Alan Turing', level: 'Advanced' },
  { icon: '🎨', title: 'Graphic Design', mentor: 'Lisa Monroe', level: 'Intermediate' },
  { icon: '🗣️', title: 'Public Speaking', mentor: 'Tony Robbins', level: 'Beginner' },
  { icon: '🌐', title: 'SEO Marketing', mentor: 'Neil Patel', level: 'Intermediate' },
];

const Skills = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = allSkills.filter(skill => {
    const matchesLevel = filter === 'All' || skill.level === filter;
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h2>My Skills</h2>
        <div className="skills-controls">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="offer-skill-button">+ Offer New Skill</button>
        </div>
      </div>

      <div className="skill-tabs">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <button
            key={level}
            className={`tab-button ${filter === level ? 'active' : ''}`}
            onClick={() => setFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="skill-list">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, idx) => (
            <div className="skill-card" key={idx}>
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-info">
                <div className="skill-title">{skill.title}</div>
                <div className="skill-mentor">Mentor: {skill.mentor}</div>
              </div>
              <div className={`skill-level ${skill.level.toLowerCase()}`}>{skill.level}</div>
              <button
                className="skill-form-button"
                onClick={() => navigate('/progress')}
              >
                Apply
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">No skills found.</div>
        )}
      </div>
    </div>
  );
};

export default Skills;

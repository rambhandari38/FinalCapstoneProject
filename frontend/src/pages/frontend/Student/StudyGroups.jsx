import React from 'react';
import './StudyGroups.css';

const groups = [
  {
    title: 'Web Devs Hub',
    description: 'HTML, CSS, React',
    members: 8,
  },
  {
    title: 'Data Science Circle',
    description: 'Python, Pandas, ML',
    members: 12,
  },
  {
    title: 'Advanced AI Forum',
    description: 'Deep Learning, LLMs',
    members: 7,
  },
  {
    title: 'Frontend Wizards',
    description: 'Animations & UI',
    members: 10,
  },
  {
    title: 'Lit Lovers',
    description: 'Poetry & Literature',
    members: 5,
  },
];

const StudyGroups = () => {
  return (
    <div className="study-groups-container">
      <div className="study-groups-header">
        <h2>Active Study Groups</h2>
        <button className="create-group">+ Create Group</button>
      </div>

      <div className="study-group-list">
        {groups.map((group, idx) => (
          <div className="study-group-card" key={idx}>
            <div className="group-info">
              <h3>{group.title}</h3>
              <p>{group.description}</p>
            </div>
            <div className="group-actions">
              <span className="member-count">{group.members} members</span>
              <button className="join-button">Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGroups;

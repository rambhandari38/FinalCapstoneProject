import React from 'react';
import './GradesPage.css';

const gradesData = [
  {
    subject: 'Introduction to Web Development',
    assessment: 'Quiz 1',
    score: 92
  },
  {
    subject: 'Advanced Calculus',
    assessment: 'Midterm Exam',
    score: 82
  },
  {
    subject: 'Contemporary American Fiction',
    assessment: 'Essay 1',
    score: 75
  },
  {
    subject: 'Database Systems',
    assessment: 'Project',
    score: 68
  }
];

const getGradeClass = (score) => {
  if (score >= 85) return 'good';
  if (score >= 70) return 'okay';
  return 'low';
};

const GradesPage = () => {
  return (
    <div className="grades-page">
      <div className="grades-container">
        <div className="grades-header">
          <h2>My Grades</h2>
          <button className="filter-btn">Filter</button>
        </div>

        {gradesData.map((grade, index) => (
          <div key={index} className="grade-card">
            <div className="grade-info">
              <h4>{grade.subject}</h4>
              <span>{grade.assessment}</span>
            </div>
            <span className={`grade-score ${getGradeClass(grade.score)}`}>
              {grade.score}/100
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradesPage;

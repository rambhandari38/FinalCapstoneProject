import React from 'react';
import './MyCourses.css';



const courses = [
  {
    title: 'Introduction to Web Development',
    progress: 75,
    image: require('./images/book1.jpg'),
  },
  {
    title: 'Advanced Calculus',
    progress: 60,
    image: require('./images/book2.jpg'),
  },
  {
    title: 'Contemporary American Fiction',
    progress: 45,
    image: require('./images/book3.jpg'),
  },
    {
    title: 'Advanced Java',
    progress: 15,
    image: require('./images/book4.jpg'),
  },
];

const MyCourses = () => {
  return (
    <div className="my-courses-wrapper">
      <div className="my-courses-container">
        <div className="my-courses-header">
          <h2>My Courses</h2>
          <div className="my-courses-actions">
            <button className="view-all-btn">View All</button>
            <button className="add-course-btn">+ Add Course</button>
          </div>
        </div>

        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>Progress: {course.progress}%</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;

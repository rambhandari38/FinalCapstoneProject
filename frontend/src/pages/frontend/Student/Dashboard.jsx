import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Top Welcome Section */}
      <div className="dashboard-top">
        <div className="welcome-card">
          <h2>Welcome back, Bhattarai!</h2>
          <p>You have 3 assignments due this week and 2 upcoming exams. Start preparing now!</p>
          <div className="welcome-buttons">
         <button onClick={() => navigate('/courses')}>My Courses</button>
            <button onClick={() => navigate('/schedule')}>View Schedule</button>
          </div>
        </div>

        <div className="stats-card">
          <div>
            📚 <p>Courses</p> <strong>8</strong>
          </div>
          <div>
            📝 <p>Assignments</p> <strong>4</strong>
          </div>
          <div>
            🧠 <p>Skills</p> <strong>12</strong>
          </div>
          <div>
            📖 <p>Books</p> <strong>59</strong>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>📘 Current Courses</h3>
          <div>
           <button onClick={() => navigate('/courses')}>View All</button>
            <button className="add-btn">+ Add Course</button>
          </div>
        </div>
        <div className="courses">
          <div className="course-card">
            <img src={require('./images/book1.jpg')} alt="" />
            <p><strong>Introduction to Web Development</strong></p>
          </div>
          <div className="course-card">
            <img src={require('./images/book2.jpg')} alt="" />
            <p><strong>Advanced Calculus</strong></p>
          </div>
          <div className="course-card">
            <img src={require('./images/book3.jpg')} alt="" />
            <p><strong>Contemporary American Fiction</strong></p>
          </div>
          <div className="course-card">
            <img src={require('./images/book4.jpg')} alt="" />
            <p><strong>Introduction of JAVA</strong></p>
          </div>
        </div>
      </div>

      {/* Books + Skills */}
      <div className="dashboard-grid">
        {/* Recommended Books */}
        <div className="books-section">
          <div className="section-header">
            <h3>📚 Recommended Books</h3>
                <button onClick={() => navigate('/library')}>View Library</button>
          </div>
          <div className="books">
            {['book5.jpg', 'boook2.jpg', 'book6.jpg'].map((img, i) => (
              <div className="book-card" key={i}>
                <img src={require(`./images/${img}`)} alt="" />
                <p><strong>{['HTML & CSS', 'Calculus Made Easy', 'The Great Gatsby'][i]}</strong><br />
                  {['Jon Duckett', 'Silvanus', 'F. Scott Fitzgerald'][i]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Exchange */}
        <div className="skills-section">
          <div className="section-header">
            <h3>🤝 Skills Exchange</h3>
            <div>
             <button onClick={() => navigate('/skills')}>Browse All</button>
              <button className="add-btn">+ Offer Skill</button>
            </div>
          </div>
          <div className="skill-card">
            <p>💻 Web Development<br /><span>Emma Johnson</span></p>
            <span className="level advanced">Advanced</span>
          </div>
          <div className="skill-card">
            <p>📊 Data Analysis<br /><span>Michael Chen</span></p>
            <span className="level intermediate">Intermediate</span>
          </div>
          <div className="skill-card">
            <p>✍️ Creative Writing<br /><span>Emma Sarah Williams</span></p>
            <span className="level beginner">Beginner</span>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="announcements">
        <h3>📢 Announcements</h3>
        <div className="announcement-card">
          <strong>Midterm Exam Schedule Released</strong>
          <p>The midterm exam schedule is now available. Please check your course portals and prepare accordingly.</p>
        </div>
        <div className="announcement-card">
          <strong>Library Extended Hours</strong>
          <p>The library will remain open until midnight during finals week starting next Monday.</p>
        </div>
        <div className="announcement-card">
          <strong>New Skill Exchange Program</strong>
          <p>Join the new peer-to-peer learning initiative. Share your skills and learn from others.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

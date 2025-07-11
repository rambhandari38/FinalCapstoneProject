import React from 'react';
import './Schedule.css';

const scheduleData = [
  {
    day: 'Monday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 201' },
      { time: '11:00 AM - 12:30 PM', subject: 'Computer Science', location: 'Lab 3' },
    ],
  },
  {
    day: 'Tuesday',
    classes: [
      { time: '10:00 AM - 11:30 AM', subject: 'English Literature', location: 'Room 105' },
      { time: '2:00 PM - 3:30 PM', subject: 'Statistics', location: 'Room 212' },
    ],
  },
  {
    day: 'Wednesday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Physics', location: 'Room 109' },
      { time: '1:00 PM - 2:30 PM', subject: 'Philosophy', location: 'Room 111' },
    ],
  },
  {
    day: 'Thursday',
    classes: [
      { time: '10:00 AM - 11:30 AM', subject: 'Chemistry', location: 'Room 208' },
    ],
  },
  {
    day: 'Friday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Economics', location: 'Room 103' },
      { time: '11:00 AM - 12:30 PM', subject: 'Artificial Intelligence', location: 'Lab 1' },
    ],
  },
];

// const Schedule = () => {
//   return (
//     <div className="schedule-page">
//       <div className="schedule-container">
//         <h3>Weekly Schedule</h3>
//         <div className="schedule-grid">
//           {scheduleData.map((day, idx) => (
//             <div className="schedule-day" key={idx}>
//               <h3>{day.day}</h3>
//               {day.classes.map((cls, cIdx) => (
//                 <div className="class-card" key={cIdx}>
//                   <span className="time">{cls.time}</span>
//                   <span className="subject">{cls.subject}</span>
//                   <span className="location">{cls.location}</span>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;


const Schedule = () => {
  return (
    <div className="main-content"> {/* <-- Respect sidebar width */}
      <div className="schedule-page">
        <div className="schedule-container">
          <h3>Weekly Schedule</h3>
          <div className="schedule-grid">
            {scheduleData.map((day, idx) => (
              <div className="schedule-day" key={idx}>
                <h3>{day.day}</h3>
                {day.classes.map((cls, cIdx) => (
                  <div className="class-card" key={cIdx}>
                    <span className="time">{cls.time}</span>
                    <span className="subject">{cls.subject}</span>
                    <span className="location">{cls.location}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

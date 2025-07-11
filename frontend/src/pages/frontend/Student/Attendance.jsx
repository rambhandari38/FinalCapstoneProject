import React from 'react';
import './Attendance.css';

const courses = [
  {
    title: 'Mathematics 101',
    attendance: '92%',
    present: 41,
    late: 2,
    absent: 2,
    schedule: { days: 'Mon, Wed, Fri', time: '9:00 AM' },
    records: [
      { date: '2024-01-15', time: '8:55 AM', status: 'Present' },
      { date: '2024-01-12', time: '9:10 AM', status: 'Late' },
      { date: '2024-01-10', time: '8:50 AM', status: 'Present' },
      { date: '2024-01-08', time: '8:58 AM', status: 'Present' },
      { date: '2024-01-05', time: '-', status: 'Absent' },
    ],
  },
  {
    title: 'Physics 201',
    attendance: '88%',
    present: 26,
    late: 2,
    absent: 2,
    schedule: { days: 'Tue, Thu', time: '11:00 AM' },
    records: [
      { date: '2024-01-16', time: '10:55 AM', status: 'Present' },
      { date: '2024-01-11', time: '10:58 AM', status: 'Present' },
      { date: '2024-01-09', time: '11:15 AM', status: 'Late' },
      { date: '2024-01-04', time: '10:52 AM', status: 'Present' },
      { date: '2024-01-02', time: '10:57 AM', status: 'Present' },
    ],
  },
];

const Attendance = () => {
  return (
    <div className="attendance-page">
      {courses.map((course, index) => (
        <div className="course-card" key={index}>
          <div className="card-header">
            <h3>{course.title}</h3>
            <span className="attendance-rate">
              Attendance: <strong>{course.attendance}</strong>
            </span>
          </div>

          <div className="status-boxes">
            <div className="status present">{course.present}<span>Present</span></div>
            <div className="status late">{course.late}<span>Late</span></div>
            <div className="status absent">{course.absent}<span>Absent</span></div>
          </div>

          <div className="schedule">
            <div>📅 {course.schedule.days}</div>
            <div>⏰ {course.schedule.time}</div>
          </div>

          <hr />

          <h4>Recent Records</h4>
          <div className="records">
            {course.records.map((record, i) => (
              <div className="record-row" key={i}>
                <span>{record.date}</span>
                <span>{record.time}</span>
                <span className={`status-pill ${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attendance;

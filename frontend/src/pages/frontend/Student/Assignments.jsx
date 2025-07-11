import React, { useState } from 'react';
import './Assignments.css';

const initialAssignments = [
  {
    id: 1,
    title: 'HTML Project',
    description: 'Introduction to Web Development',
    dueDate: 'March 1, 2025',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Calculus Problem Set',
    description: 'Advanced Calculus',
    dueDate: 'April 1, 2025',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Book Review',
    description: 'Contemporary American Fiction',
    dueDate: 'May 1, 2025',
    status: 'Submitted',
  },
    {
    id: 4,
    title: 'Physics Lab Report',
    description: 'Kinematics and Newton’s Laws',
    dueDate: 'May 15, 2025',
    status: 'Pending',
  },
  {
    id: 5,
    title: 'Database Design',
    description: 'Entity-Relationship Model Assignment',
    dueDate: 'June 10, 2025',
    status: 'Pending',
  },
];

const Assignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleSubmit = () => {
    const updated = assignments.map((a) =>
      a.id === selectedAssignment.id ? { ...a, status: 'Submitted' } : a
    );
    setAssignments(updated);
    closeModal();
  };

  const filteredAssignments =
    filter === 'All'
      ? assignments
      : assignments.filter((a) => a.status === filter);

  return (
    <div className="assignments-page">
      <div className="assignments-container">
        <div className="assignments-header">
          <h2>Assignments</h2>
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Submitted</option>
          </select>
        </div>

        {filteredAssignments.map((assignment) => (
          <div className="assignment-card" key={assignment.id}>
            <div className="assignment-info">
              <strong>{assignment.title}</strong>
              <p>{assignment.description}</p>
              <span className={`status-tag ${assignment.status.toLowerCase()}`}>
                {assignment.status}
              </span>
            </div>
            <div className="assignment-actions">
              <span className="due-date">Due: {assignment.dueDate}</span>
              {assignment.status === 'Pending' && (
                <button
                  className="submit-btn"
                  onClick={() => openModal(assignment)}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Submit Assignment</h3>
            <p><strong>{selectedAssignment.title}</strong></p>
            <input type="file" className="modal-input" />
            <textarea className="modal-textarea" placeholder="Add comments..." />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;

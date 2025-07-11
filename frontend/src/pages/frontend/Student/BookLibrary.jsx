import React, { useState } from 'react';
import './BookLibrary.css';

const allBooks = [
  {
    title: 'HTML & CSS: Design and Building',
    author: 'Jon Duckett',
    // image: 'book1.png',
    image: require('./images/book1.jpg'),
    status: 'Available',
    category: 'Web Development',
  },
  {
    title: 'Calculus Made Easy',
    author: 'Silvanus',
    image: require('./images/boook2.jpg'),
    status: 'Available',
    category: 'Mathematics',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    image: require('./images/book6.jpg'),
    status: 'Issued',
    category: 'Literature',
  },
  {
   title: 'Clean Code',
    author: 'Robert C. Martin',
    image: require('./images/book7.jpg'),
    status: 'Issued',
    category: 'Literature',
  },
];

const BookLibrary = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredBooks = allBooks.filter(
    (book) =>
      (filter === 'All' || book.category === filter) &&
      book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="book-library-page">
      <div className="book-library-container">
        <div className="book-library-header">
          <h2>Available books</h2>
          <div className="book-library-actions">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Literature">Literature</option>
              <option value="Music">Music</option>
            </select>
            <button className="request-btn" onClick={() => setModalOpen(true)}>
              Request Book
            </button>
          </div>
        </div>

        <div className="book-grid">
          {filteredBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.image} alt={book.title} />
              <div className="book-details">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <span
                  className={`book-status ${
                    book.status === 'Issued' ? 'issued' : 'available'
                  }`}
                >
                  {book.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Request a New Book</h3>
              <input placeholder="Book Title" className="modal-input" />
              <input placeholder="Author Name" className="modal-input" />
              <textarea placeholder="Additional Notes" className="modal-textarea"></textarea>
              <div className="modal-actions">
                <button onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button>
                <button className="submit-btn">Submit Request</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookLibrary;

import React, { useState } from 'react';
import './BookRecommendations.css';

const allBooks = [
  {
    title: 'HTML & CSS: Design and Building',
    author: 'Jon Duckett',
    image: require('./images/book5.jpg'),
    status: 'Available',
  },
  {
    title: 'Calculus Made Easy',
    author: 'Silvanus',
    image: require('./images/book2.jpg'),
    status: 'Available',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    image: require('./images/book6.jpg'),
    status: 'Available',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    image: require('./images/book7.jpg'),
    status: 'Available',
  },
  {
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    image: require('./images/boook4.jpg'),
    status: 'Available',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    image: require('./images/book8.jpg'),
    status: 'Available',
  },
];

function getRandomBooks(count = 4) {
  const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const BookRecommendations = () => {
  const booksPerPage = 3;
  const [recommendedBooks, setRecommendedBooks] = useState(getRandomBooks(6)); // Get 6 so we can paginate
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRefresh = () => {
    setRecommendedBooks(getRandomBooks(6));
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex + booksPerPage < recommendedBooks.length) {
      setCurrentIndex(currentIndex + booksPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - booksPerPage >= 0) {
      setCurrentIndex(currentIndex - booksPerPage);
    }
  };

  const visibleBooks = recommendedBooks.slice(currentIndex, currentIndex + booksPerPage);

  return (
    <div className="book-recommendation-page">
      <div className="recommendation-container">
        <div className="recommendation-header">
          <h2>Books Recommended for You</h2>
          <button className="refresh-btn" onClick={handleRefresh}>
            Refresh
          </button>
        </div>

        <div className="book-grid">
          {visibleBooks.map((book, index) => (
            <div className="book-card" key={index}>
              <img src={book.image} alt={book.title} />
              <div className="book-info">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <span className="available">{book.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-buttons">
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            ◀ Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex + booksPerPage >= recommendedBooks.length}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendations;

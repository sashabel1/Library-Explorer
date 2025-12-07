import React from 'react';
import { Book } from '../types';
import './BookCard.css'; 

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}


/**
 * Helper function to generate a consistent background color based on the string length.
 * This ensures the same book always gets the same color, without storing it in the DB.
 * @param title - The title of the book.
 * @returns A hex color string.
 */
const getBookColor = (title: string) => {
  const colors = [
    '#5e2129', 
    '#203b30', 
    '#2c3e50', 
    '#5d4037', 
    '#4a235a' 
  ];
  return colors[title.length % colors.length];
};


/**
 * BookCard Component
 * * Represents a single book item in the grid layout. It features a dynamic cover design
 * and handles the user interaction for adding/removing favorites.
 * * Key behaviors:
 * - Dynamic Styling: Uses 'getBookColor' to assign a cover color.
 * - Event Handling: The favorite button uses 'stopPropagation' to prevent the click
 * from bubbling up to the card container.
 * * @param {BookCardProps} props
 */
export const BookCard: React.FC<BookCardProps> = ({ book, isFavorite, onToggleFavorite }) => {
  const coverColor = getBookColor(book.title);

  return (
    <div className="book-card-container">
  
      <div 
        className="book-cover" 
        style={{ backgroundColor: coverColor }}
      >

        <div className="gold-border-decoration"></div>

        <button 
          className={`bookmark-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(book.id); }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '★' : '☆'}
        </button>

        <div className="book-content">
          <h3 className="book-title">
            {book.title}
          </h3>
          
          <div className="title-divider"></div>

          <p className="book-author">{book.author}</p>
          <p className="book-year">{book.year}</p>
        </div>

        <div className="book-footer">
          <div className="rating-display">
            {'★'.repeat(Math.floor(book.rating))} 
            <span style={{ fontSize: '0.8rem', marginLeft: '5px' }}>({book.rating})</span>
          </div>
          
          <div className="tags-container">
            {book.tags.slice(0, 2).map(tag => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
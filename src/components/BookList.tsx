import React from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  favorites: string[]; 
  onToggleFavorite: (id: string) => void;
}

/**
 * BookList Component
 * * A presentational component responsible for rendering a list of books.
 * It handles the empty state (when no books match the filter) and iterates
 * over the data to render individual `BookCard` components.
 * @param {Book[]} props.books - The filtered list of books.
 * @param {string[]} props.favorites - List of currently favorite book IDs.
 * @param {function} props.onToggleFavorite - Handler for updating favorite state.
 * @returns {JSX.Element} A grid of BookCards or a "No books found" message.
 */

export const BookList: React.FC<BookListProps> = ({ books, favorites, onToggleFavorite }) => {
  if (!books || books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
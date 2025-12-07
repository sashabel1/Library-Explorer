import React, { useEffect, useState } from 'react';
import './App.css';
import { Book, Tag } from './types';
import { BookList } from './components/BookList';
import { Filters } from './components/Filters';


/**
 * App Component 
 * Responsibilities:
 * 1.Data Fetching: Retrieves book data from a static JSON endpoint on mount.
 * 2.State Management: Holds the state for the raw data, loading status, user filters, and favorites.
 * 3.Persistence: Synchronizes the user's favorite books with the browser's LocalStorage.
 * 4.Logic: Performs client-side filtering and sorting (Derived State) before passing data to children.
 */
function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('titleAZ');
  const [selectedTag, setSelectedTag] = useState<Tag | ''>('');
  const [minRating, setMinRating] = useState<number>(0);
  
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('libraryFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('/books.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
    localStorage.setItem('libraryFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('titleAZ');
    setSelectedTag('');
    setMinRating(0);
    setShowFavoritesOnly(false);  
  };

  const getFilteredBooks = () => {
    const filtered = books.filter(book => {
      const matchesSearch = 
        searchTerm === '' || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === '' || book.tags.includes(selectedTag);
      const matchesRating = book.rating >= minRating;
      const matchesFavorite = !showFavoritesOnly || favorites.includes(book.id);
      return matchesSearch && matchesTag && matchesRating && matchesFavorite;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'titleAZ') return a.title.localeCompare(b.title);
      if (sortBy === 'titleZA') return b.title.localeCompare(a.title);
      if (sortBy === 'ratingHL') return b.rating - a.rating;
      if (sortBy === 'ratingLH') return a.rating - b.rating;
      return 0;
    });
  };

  const displayedBooks = getFilteredBooks();

  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Library Explorer</h1>

      <Filters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesChange={setShowFavoritesOnly}
        onReset={handleReset}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <p style={{ marginBottom: '10px' }}>Found {displayedBooks.length} books</p>
          <BookList 
            books={displayedBooks} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
          />
        </>
      )}
    </div>
  );
}

export default App;
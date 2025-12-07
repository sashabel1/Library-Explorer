import React from 'react';
import { Tag } from '../types';
import './Filters.css'; 

const ALL_TAGS: Tag[] = ['tech', 'non-fiction', 'fiction', 'fantasy', 'history', 'self-help', 'science'];

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedTag: Tag | '';
  onTagChange: (tag: Tag | '') => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  showFavoritesOnly: boolean;
  onShowFavoritesChange: (checked: boolean) => void;
  onReset: () => void;
}

/**
 * Filters Component
 * A purely presentational "Controlled Component" that renders the search bar,
 * sort dropdowns, and filter controls.
 * It does not hold its own state; instead, it relies entirely on props passed
 * from the parent component (Lifting State Up).
 * @param {FiltersProps} props - All state values and event handlers are passed via props.
 */
export const Filters: React.FC<FiltersProps> = ({
  searchTerm, onSearchChange,
  sortBy, onSortChange,
  selectedTag, onTagChange,
  minRating, onMinRatingChange,
  showFavoritesOnly, onShowFavoritesChange,
  onReset
}) => {
  return (
    <div className="filters-container">
      
      <div className="filters-top-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select 
          className="sort-select"
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="titleAZ">Title (A-Z)</option>
          <option value="titleZA">Title (Z-A)</option>
          <option value="ratingHL">Rating (High to Low)</option>
          <option value="ratingLH">Rating (Low to High)</option>
        </select>
      </div>

      <div className="filters-bottom-row">
        
        <select 
          className="tag-select"
          value={selectedTag} 
          onChange={(e) => onTagChange(e.target.value as Tag | '')}
        >
          <option value="">All Categories</option>
          {ALL_TAGS.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>

        <div className="rating-container">
            <span className="rating-label">
              Min Rating:
            </span>
            
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onMinRatingChange(star)}
                className={`star-btn ${star <= minRating ? 'active' : ''}`}
                title={`Filter ${star} stars & up`}
              >
                ★
              </button>
            ))}
        </div>

        <label className="favorites-label">
          <input 
            type="checkbox" 
            className="favorites-checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => onShowFavoritesChange(e.target.checked)}
          />
          Favorites Only
        </label>

        <button onClick={onReset} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
};
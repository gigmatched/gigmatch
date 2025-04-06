import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  // Map of category values to display names
  const categoryDisplayNames = {
    'musician-album': 'Musician & Album',
    'music-technology': 'Music Technology',
    'music-business': 'Music Business',
    'musician-guides': 'Musician Guides',
    'music-events': 'Music Events',
    'music-venues': 'Music Venues'
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Categories</h3>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            activeCategory === null
              ? 'bg-[#09E1CE] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === category
                ? 'bg-[#09E1CE] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {categoryDisplayNames[category] || category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

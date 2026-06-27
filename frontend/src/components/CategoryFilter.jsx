import React from 'react';

const CATEGORIES = [
  'All',
  'Electronics',
  'Fashion & Clothing',
  'Books & Academic Materials',
  'Hostel Essentials',
  'Gadgets',
  'Creative & Handmade',
  'Beauty & Personal Care',
  'Sports & Fitness',
  'Others'
];

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="categories-wrapper" id="marketplace-categories">
      {CATEGORIES.map((cat) => {
        const val = cat === 'All' ? '' : cat;
        const isActive = (selectedCategory || '') === val;
        return (
          <button
            key={cat}
            className={`category-chip ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(val)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

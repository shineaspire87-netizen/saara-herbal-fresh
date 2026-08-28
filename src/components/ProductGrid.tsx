'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { SlidersHorizontal, Search, Sparkles, AlertCircle } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'All Products') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          (p.tamilName && p.tamilName.toLowerCase().includes(q)) ||
          p.healthBenefits.some((b) => b.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <section id="products-section" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs sm:text-sm tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Farm Fresh Heritage Rice</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif mt-1">
            Our Organic Rice Collection
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 mt-1 max-w-xl">
            100% naturally farmed, chemical-free, traditional paddy grains packed with vital nutrients and dietary fiber.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-semibold text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs sm:text-sm bg-white border border-emerald-200 rounded-lg px-3 py-1.5 text-gray-800 focus:outline-none focus:border-emerald-600 font-medium"
          >
            <option value="featured">Featured & Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Category Pills (Horizontal Scrolling on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Filter Info / Reset */}
      {(searchQuery || selectedCategory !== 'All Products') && (
        <div className="mb-6 flex items-center justify-between bg-emerald-50/90 border border-emerald-200 p-3 rounded-xl text-xs sm:text-sm text-emerald-900">
          <div>
            Showing <strong>{filteredProducts.length}</strong> items
            {searchQuery && (
              <span> matching &quot;<strong>{searchQuery}</strong>&quot;</span>
            )}
            {selectedCategory !== 'All Products' && (
              <span> in <strong>{selectedCategory}</strong></span>
            )}
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Products');
            }}
            className="text-emerald-700 font-bold underline hover:text-emerald-900 text-xs"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-emerald-200 p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 font-serif">No rice varieties found</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            We couldn&apos;t find any rice matching your search criteria. Try a different variety name or reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Products');
            }}
            className="bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-emerald-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};

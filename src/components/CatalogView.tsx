/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Star, Clock, BarChart2, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA } from '../data';

interface CatalogViewProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onEnroll: (course: Course) => void;
  enrolledCourseIds: string[];
}

export default function CatalogView({
  searchQuery,
  onSearchQueryChange,
  onEnroll,
  enrolledCourseIds
}: CatalogViewProps) {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All Durations');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<string>('Highest Rated');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState<string | null>(null);

  // Constants
  const categoriesList = ['Business & Leadership', 'Data Science', 'Digital Marketing', 'Software Engineering', 'Design', 'Finance'];
  const levelsList = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const itemsPerPage = 6;

  // Toggle category helper
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      // Search matches
      const matchesSearch = searchQuery
        ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Category matches
      const matchesCategory = selectedCategories.length > 0
        ? selectedCategories.includes(course.category)
        : true;

      // Level matches
      const matchesLevel = selectedLevel !== 'All'
        ? course.level === selectedLevel
        : true;

      // Duration matches
      const matchesDuration = selectedDuration !== 'All Durations'
        ? (selectedDuration === 'Short' && course.durationCategory === 'Short') ||
          (selectedDuration === 'Medium' && course.durationCategory === 'Medium') ||
          (selectedDuration === 'Intensive' && course.durationCategory === 'Intensive')
        : true;

      // Price matches
      const matchesPrice = course.price <= priceRange;

      return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'Highest Rated') return b.rating - a.rating;
      if (sortBy === 'Newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0;
    });
  }, [searchQuery, selectedCategories, selectedLevel, selectedDuration, priceRange, sortBy]);

  // Paginated chunk
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;

  const handleEnrollClick = (course: Course) => {
    onEnroll(course);
    setEnrollSuccessMessage(`Successfully enrolled in ${course.title}!`);
    setTimeout(() => {
      setEnrollSuccessMessage(null);
    }, 4000);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevel('All');
    setSelectedDuration('All Durations');
    setPriceRange(5000);
    onSearchQueryChange('');
    setCurrentPage(1);
  };

  return (
    <div className="pt-28 pb-12 max-w-[1280px] mx-auto px-4 md:px-16 animate-fade-in">
      {/* Toast Confirmation for Enrollment */}
      {enrollSuccessMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#003d9b] text-white py-3.5 px-6 rounded-xl shadow-2xl flex items-center gap-3 border border-blue-400/20 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <div className="flex flex-col">
            <span className="font-bold text-sm">Enrollment Confirmed</span>
            <span className="text-xs text-blue-100">{enrollSuccessMessage}</span>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-xs font-semibold text-gray-500">
        <a className="hover:text-[#003d9b] transition-colors" href="#" onClick={(e) => { e.preventDefault(); handleClearFilters(); }}>
          Home
        </a>
        <span className="text-gray-400 text-[10px]">&gt;</span>
        <span className="text-[#051a3e] font-bold">Course Catalog</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-28 bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Filters</h3>
              <button 
                onClick={handleClearFilters}
                className="text-xs font-semibold text-[#003d9b] hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Categories filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Categories</h4>
              <div className="flex flex-col gap-2.5">
                {categoriesList.map(category => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="rounded border-gray-300 text-[#003d9b] focus:ring-[#003d9b] w-4.5 h-4.5 cursor-pointer"
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#003d9b] transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-gray-200/55"></div>

            {/* Difficulty filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Difficulty Level</h4>
              <div className="flex flex-col gap-2.5">
                {levelsList.map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="text-[#003d9b] focus:ring-[#003d9b] border-gray-300 w-4.5 h-4.5 cursor-pointer"
                      name="level"
                      type="radio"
                      checked={selectedLevel === level}
                      onChange={() => { setSelectedLevel(level); setCurrentPage(1); }}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#003d9b] transition-colors">
                      {level === 'All' ? 'All Levels' : level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-gray-200/55"></div>

            {/* Duration filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Duration</h4>
              <select
                className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-[#003d9b] focus:border-[#003d9b] outline-none cursor-pointer"
                value={selectedDuration}
                onChange={(e) => { setSelectedDuration(e.target.value); setCurrentPage(1); }}
              >
                <option>All Durations</option>
                <option value="Short">Short (1-4 weeks)</option>
                <option value="Medium">Medium (1-3 months)</option>
                <option value="Intensive">Intensive (3+ months)</option>
              </select>
            </div>

            <div className="h-[1px] bg-gray-200/55"></div>

            {/* Price slider */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Price Range</h4>
              <div className="space-y-3">
                <input
                  className="w-full accent-[#003d9b] cursor-pointer"
                  max="5000"
                  min="0"
                  step="100"
                  type="range"
                  value={priceRange}
                  onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                />
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>$0</span>
                  <span className="text-[#003d9b] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    Up to ${priceRange.toLocaleString()}
                  </span>
                  <span>$5,000+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main courses content */}
        <div className="flex-grow">
          {/* Top header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#051a3e] mb-1">Explore Elite Programs</h1>
              <p className="text-sm text-gray-500">
                Showing {filteredCourses.length} high-performance courses for professionals.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Sort by:</span>
              <select
                className="bg-transparent border-none font-bold text-[#003d9b] focus:ring-0 cursor-pointer text-sm py-1 pl-1 pr-6"
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              >
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Courses grid */}
          {paginatedCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-100 text-center px-6">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="font-bold text-gray-900 mb-1 text-base">No programs found</h3>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                We couldn't find any courses matching your specific search and filter combinations. Try adjusting your parameters or clear all filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 px-5 py-2.5 bg-[#003d9b] text-white rounded-lg font-semibold shadow-sm hover:bg-blue-800 transition-all text-sm active:scale-95"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedCourses.map(course => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
                  >
                    {/* Course image and tags */}
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      {course.isBestseller && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 bg-[#003d9b] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                            Bestseller
                          </span>
                        </div>
                      )}
                      {course.isNew && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                            New
                          </span>
                        </div>
                      )}
                      
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={course.title}
                        src={course.image}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1 text-[#003d9b]">
                          <Star className="w-3.5 h-3.5 fill-[#003d9b]" />
                          <span className="text-xs font-bold">{course.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#003d9b] transition-colors line-clamp-2 h-12 leading-snug">
                        {course.title}
                      </h2>
                      
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      <p className="text-xs text-gray-400 mb-4 mt-auto">
                        By {course.instructor}
                      </p>

                      <div className="flex items-center gap-4 py-3 border-t border-gray-100 text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart2 className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">{course.level}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-black text-gray-900">${course.price.toLocaleString()}</span>
                        {isEnrolled ? (
                          <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-bold text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                            Enrolled
                          </span>
                        ) : (
                          <button
                            onClick={() => handleEnrollClick(course)}
                            className="px-4 py-2 bg-[#003d9b] text-white rounded-lg font-bold text-xs hover:bg-blue-800 transition-all active:scale-95 shadow-sm"
                          >
                            Enroll Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#003d9b] text-white shadow-sm'
                      : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

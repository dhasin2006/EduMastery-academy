/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Menu, GraduationCap, ArrowUpRight } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onOpenPortal: () => void;
}

export default function Header({
  activeView,
  onViewChange,
  searchQuery,
  onSearchQueryChange,
  onOpenPortal
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-20 flex items-center transition-all duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-16 max-w-[1280px] mx-auto">
        {/* Logo and navigation links */}
        <div className="flex items-center gap-12">
          <button 
            onClick={() => onViewChange('home')}
            className="text-2xl font-extrabold text-[#003d9b] tracking-tight hover:opacity-90 active:scale-95 transition-all text-left"
            id="logo-button"
          >
            EduMaster Academy
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onViewChange('home')}
              className={`font-medium transition-colors duration-200 py-1 ${
                activeView === 'home'
                  ? 'text-[#003d9b] border-b-2 border-[#003d9b] font-semibold'
                  : 'text-gray-500 hover:text-[#003d9b]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange('catalog')}
              className={`font-medium transition-colors duration-200 py-1 ${
                activeView === 'catalog'
                  ? 'text-[#003d9b] border-b-2 border-[#003d9b] font-semibold'
                  : 'text-gray-500 hover:text-[#003d9b]'
              }`}
            >
              Courses
            </button>
            <button
              onClick={onOpenPortal}
              className={`font-medium transition-colors duration-200 py-1 ${
                activeView === 'portal' || activeView === 'player'
                  ? 'text-[#003d9b] border-b-2 border-[#003d9b] font-semibold'
                  : 'text-gray-500 hover:text-[#003d9b]'
              }`}
            >
              Student Portal
            </button>
          </nav>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-4">
          {/* Real-time search query sync across page */}
          {(activeView === 'home' || activeView === 'catalog') && (
            <div className="relative hidden lg:block w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-gray-50 border-none rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#003d9b] text-sm text-gray-700 outline-none"
                placeholder="Search courses..."
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchQueryChange(e.target.value);
                  if (activeView !== 'catalog') {
                    onViewChange('catalog');
                  }
                }}
              />
            </div>
          )}

          {/* Adapt header elements for Portal or Player mode */}
          {activeView === 'portal' || activeView === 'player' ? (
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
              
              <div className="flex items-center gap-3 pl-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#003d9b] font-bold text-sm shadow-sm border border-blue-200">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-gray-900 leading-none">John Doe</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Premium Student</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={onOpenPortal}
                className="px-4 py-2 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all text-sm flex items-center gap-1"
              >
                <GraduationCap className="w-4 h-4 text-[#003d9b]" />
                <span className="hidden sm:inline">Student Login</span>
              </button>
              <button 
                onClick={onOpenPortal}
                className="px-5 py-2.5 rounded-lg bg-[#003d9b] text-white font-semibold shadow-md hover:bg-blue-800 transition-all active:scale-95 text-sm flex items-center gap-1"
              >
                Portal
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Hamburger Menu for Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden p-4 flex flex-col gap-3 animate-fade-in">
          <button
            onClick={() => {
              onViewChange('home');
              setMobileMenuOpen(false);
            }}
            className={`py-2 px-4 rounded-lg text-left font-semibold ${activeView === 'home' ? 'bg-blue-50 text-[#003d9b]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Home
          </button>
          <button
            onClick={() => {
              onViewChange('catalog');
              setMobileMenuOpen(false);
            }}
            className={`py-2 px-4 rounded-lg text-left font-semibold ${activeView === 'catalog' ? 'bg-blue-50 text-[#003d9b]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Courses
          </button>
          <button
            onClick={() => {
              onOpenPortal();
              setMobileMenuOpen(false);
            }}
            className={`py-2 px-4 rounded-lg text-left font-semibold ${activeView === 'portal' || activeView === 'player' ? 'bg-blue-50 text-[#003d9b]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Student Portal
          </button>
          
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-[#003d9b]"
              placeholder="Search courses..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </header>
  );
}

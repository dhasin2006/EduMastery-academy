/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Globe, Share2, Award, Mail } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#d8e2ff] border-t border-blue-200/40 mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About column */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl font-bold text-[#003d9b]">EduMaster Academy</div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering the next generation of global leaders through prestigious, tech-forward education and mentorship.
          </p>
          <div className="flex gap-4">
            <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform text-[#003d9b]">
              <Globe className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform text-[#003d9b]">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform text-[#003d9b]">
              <Award className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Programs column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#051a3e]">Programs</h4>
          <div className="flex flex-col gap-2.5">
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              Executive Leadership
            </a>
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              Applied Data Science
            </a>
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              Fintech Mastery
            </a>
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              Advanced UX Design
            </a>
          </div>
        </div>

        {/* Company column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#051a3e]">Company</h4>
          <div className="flex flex-col gap-2.5">
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              About Our Academy
            </a>
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              Institutional Partners
            </a>
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              Careers
            </a>
            <a className="text-sm text-gray-600 hover:text-[#003d9b] hover:underline transition-all" href="#">
              Help Center
            </a>
          </div>
        </div>

        {/* Newsletter column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#051a3e]">Newsletter</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Subscribe for exclusive insights and premium program updates.
          </p>
          {subscribed ? (
            <div className="p-3 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200 animate-fade-in">
              Success! Thank you for subscribing.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                className="flex-grow rounded-lg border-gray-200 bg-white px-3.5 py-2 text-sm focus:ring-2 focus:ring-[#003d9b] outline-none border text-gray-700"
                placeholder="Email address"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#003d9b] hover:bg-blue-800 text-white font-bold rounded-lg text-sm transition-all shadow-sm active:scale-95"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-blue-200/20 py-8 px-6 md:px-16 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} EduMaster Academy. Empowering leaders through prestigious learning.
        </span>
        <div className="flex gap-6 text-xs font-semibold text-gray-500">
          <a className="hover:text-[#003d9b] transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-[#003d9b] transition-colors" href="#">
            Terms of Service
          </a>
          <a className="hover:text-[#003d9b] transition-colors" href="#">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Code2, Briefcase, Palette, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

interface BentoCategoriesProps {
  onCategoryClick: (category: string) => void;
  onViewAllCategories: () => void;
}

export default function BentoCategories({ onCategoryClick, onViewAllCategories }: BentoCategoriesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Header of Bento section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-[#051a3e] mb-3">Explore Specialized Disciplines</h2>
            <p className="text-sm text-gray-500">
              Discover our curated selection of high-impact categories led by industry veterans and global experts.
            </p>
          </div>
          <button
            onClick={onViewAllCategories}
            className="text-[#003d9b] font-semibold flex items-center gap-1 hover:underline text-sm group"
          >
            View All Categories
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[500px]">
          {/* Tech & AI (Large double span card) */}
          <div
            onClick={() => onCategoryClick('Data Science')}
            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 bg-[#003d9b]"
          >
            {/* Background image overlay with clean overlay gradient */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYu00pdrH1LagpjLNwsbaCimV2AR1-pdVqWOy-NZ-c0dB5WNu-6T8ZtBWzxb-ZFVsOHEE17NUt24v20c18qndPmiE2V9KWnexZ87TpKHkr2Ynd2sqRjUWQ6LXRXm3NrAve0t1rZ_p8stKGfAJJobZadmrC_kI_U7UTLATMINVkgpnpcfOMOFXjGxqFjPXSvPNFEGVBTCSX0dQE6ixOMbV88ZTD8Uvh8D9CmXoTPAu6cMhjRLBUuphoJI7zT_3ebVU0X9k5GkHNhAI')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 flex flex-col items-start text-white">
              <span className="p-3 bg-white/10 rounded-xl mb-4 backdrop-blur-sm border border-white/10">
                <Code2 className="w-6 h-6 text-[#afecff]" />
              </span>
              <h3 className="text-2xl font-bold mb-2">Technology &amp; AI</h3>
              <p className="text-white/80 text-sm mb-4 leading-relaxed max-w-sm">
                Master machine learning, cloud architecture, and modern development frameworks.
              </p>
              <span className="text-xs font-bold uppercase tracking-widest text-[#afecff] bg-white/10 px-3 py-1 rounded-full border border-white/5">
                142 Courses
              </span>
            </div>
          </div>

          {/* Business Leadership (Horizontal top right card) */}
          <div
            onClick={() => onCategoryClick('Business & Leadership')}
            className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-50 border border-gray-100"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-10"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeeWdACaUXknyySAmHnYnN9iAK1GSJqR9GaIV8U2m534tm5Df5BPW0fRAYPS4mV_yC8i0kEsIL3cXD-9BAkf14VL5cRIfVPb8sSlUx_uhvw6aBGeTnIPrbP6bsUA9eWd2n0pdqkeTxjtavCAokMyCxabEmyUmDcKMKDUGpsoikcyh8lylJXUOQ1sNKbMnk6Bk_OFshYzVi4uGFRUP9y2E-NJHYF6XYh_oXeFPQgzuBkHdR6zlULKddRX6YH77mvY6a4CsASGlyDvg')`,
              }}
            />
            <div className="relative p-8 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col">
                  <span className="p-2.5 bg-blue-50 text-[#003d9b] rounded-xl self-start mb-4 border border-blue-100/40">
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Business Leadership</h3>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                    Executive management and strategic thinking for modern leaders.
                  </p>
                </div>
                <span className="bg-[#003d9b] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  Popular
                </span>
              </div>
            </div>
          </div>

          {/* Creative Arts */}
          <div
            onClick={() => onCategoryClick('Design')}
            className="relative rounded-2xl group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-50 border border-gray-100"
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <span className="p-2.5 bg-purple-50 text-purple-700 rounded-xl self-start border border-purple-100/40">
                <Palette className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Creative Arts</h3>
                <p className="text-xs text-gray-500">UI/UX and Visual Narrative</p>
              </div>
            </div>
          </div>

          {/* Finance */}
          <div
            onClick={() => onCategoryClick('Finance')}
            className="relative rounded-2xl group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-50 border border-gray-100"
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <span className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl self-start border border-emerald-100/40">
                <Landmark className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Finance</h3>
                <p className="text-xs text-gray-500">Strategic Investment &amp; Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

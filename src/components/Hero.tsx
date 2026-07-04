/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBrowseCourses: () => void;
  onGetStarted: () => void;
}

export default function Hero({ onBrowseCourses, onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[640px] md:min-h-[760px] flex items-center overflow-hidden bg-[#faf9ff] pt-20">
      {/* Background image & gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center scale-105 opacity-80"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDsbWhMJD-D0HG1fRY32urAXKSAesmFj8jht67YMJpaqqXouis5b5Y_Dh8du9gK3hBhTsf37oJS94QJ41sc1cIf9_UIlkeuFGQxRzArgFMuClbicuVJ099QOjQOcglb0xMye6d_5IxB2a5P7Q-ZvfgqKa3zisqzCJj3-CfCpIDZfIAXnsfSNWsn6iMYAvEl7GzL8bkpqd3OCks-T7qTxo7JfCweWMavqzlRBn9EqveBX7ZT9dg0O2B4GwSUf1iuLXHfnT2nu91PQE')`,
          }}
        />
        {/* Authoritative blue/slate and light grey visual gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent md:block hidden"></div>
        <div className="absolute inset-0 bg-white/95 md:hidden block"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 max-w-[1280px] mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Tag */}
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider uppercase bg-blue-100 text-[#003d9b] rounded-full">
            Premier Learning Platform
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#051a3e] leading-tight tracking-tight mb-6">
            Master Your Future with{' '}
            <span className="text-[#003d9b]">World-Class</span> Learning
          </h1>

          {/* Slogan */}
          <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
            Unlock your potential with expert-led courses designed for high-stakes professional growth.
            Experience an authoritative curriculum tailored for future leaders.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-[#003d9b] text-white rounded-lg font-semibold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 text-sm"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBrowseCourses}
              className="px-8 py-4 bg-gray-100 text-[#003d9b] hover:bg-gray-200 border border-gray-200 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
            >
              Browse Courses
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Instructor/Student pile */}
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                alt="Instructor Sarah Chen"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUzVCFnsRodGvAokc0H2RwAM4wvBj3qc_R4mXLA5cHoboAwxcxgqwaTQgObAfB8q5axekuK3V5Gr_rkUgAPuhtgEoNB9EixtvFeLqkgDp2JSZZU0GpmEsXL1l1B8JQZI8tIPLpfp4eY_laQ_t3I_Nn6S3XhnmpKmVNVGM4tpLMGM2GRngZ8PJ015rk4bxxTLk92eax6evS3sW67M_lGXbipP6cl-MASUO2mGj_ir6Yxmjz4CUBVrqRnt_YJsdfSQbV9X3XdzpViO0"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                alt="Expert Marcus"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe1jBj2o9gxQokojjEzEbPgC_XHDnUsGkD7fs97QukkaDK91JCZRPWGw_3F19ltpsrM9tL-BKGfPFB8-wiGumlI8x3Xo7iTRMYvRL5RhvzkbiuGuYKk1GXXlBBkXOWJ3xDzEiMqhgoO6jucqWKbBIfuiwHDOp1L-A2VqJCobpvLNoNqMJQLVlTVUsT8P_bSiL48KRg32oXnQy6PEifF1ydQ7kiaM-iIoJBtR6MMZNilMOXDbTreDGggt-vx9XwajMMPw6L3LgY3y0"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                alt="Expert Designer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP00RYmQ89HfbbLsysiKjX1x7T1Re54rBfRf_9ndPna_VH0nEOippENkKQUFq5kJnaoWmT1YTsEF0dELHKZ_CpdSWvxMSuY30w-q7Yte7pUUFWaBPlGhs7CsfPJFmumP2EcqtH2701RYA4YBguWOVU4hccI66DHKE3_uUqRzEtNMMrMcEWixeFBt00YxH58L4FVKlMn51xFXwu7435V2TYhwkiXLOawGWpNn59M8zNXCB-P7qduY0g8eHqkGuF24I09UYt66kQJcE"
              />
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Joined by <span className="text-[#003d9b] font-bold">12,000+</span> students this month
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

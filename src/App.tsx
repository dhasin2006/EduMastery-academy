/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Star, Clock, BarChart2, ShieldCheck, Landmark, Users, ArrowUpRight } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import BentoCategories from './components/BentoCategories';
import CatalogView from './components/CatalogView';
import PortalView from './components/PortalView';
import PlayerView from './components/PlayerView';

import { AppView, Course, ActiveCourse } from './types';
import { 
  COURSES_DATA, 
  ACTIVE_COURSES_DATA, 
  RECENT_ACTIVITIES, 
  CERTIFICATES, 
  DEADLINES 
} from './data';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time enrolled state
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([
    'analytics-ai', 'algorithmic-trading'
  ]);
  
  // Custom states inside the active courses for the portal
  const [activeCourses, setActiveCourses] = useState<ActiveCourse[]>(ACTIVE_COURSES_DATA);
  const [recentActivities, setRecentActivities] = useState(RECENT_ACTIVITIES);
  const [certificates, setCertificates] = useState(CERTIFICATES);
  const [deadlines, setDeadlines] = useState(DEADLINES);

  // Active Player course
  const [activePlayerCourse, setActivePlayerCourse] = useState<{ title: string; image: string }>({
    title: 'Advanced Leadership Strategy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDin3skF1Ykmh_aQCp3daTFikTqSo8JNIx1nslrxW0AlHConpw5zi0zKgk5QQqxBdEFAtXYBqMCzIuIdmhmt4Z7RVkb152jtGJSWSZdVNcqHi85g2OtJNu_dMStX6zMzfoE0zBkBZsdowDXpKo7cCzhsvNuoG5olsT8QLZ4R8mdbjNy1HZtCCQ_GTGtGit8t6DBV9BqdmReTFmQh1nTi6MKm-ROUxw0wqgj6_kR7QjofDUvUWzjKqeAhByxqBGJ8e4ywGVaWpaHl2M'
  });

  // Handle new enrollment from Catalog
  const handleEnroll = (course: Course) => {
    if (!enrolledCourseIds.includes(course.id)) {
      setEnrolledCourseIds(prev => [...prev, course.id]);
      
      // Map Course structure to active course
      const newActive: ActiveCourse = {
        id: `active-${Date.now()}`,
        courseId: course.id,
        title: course.title,
        progress: 0,
        instructor: course.instructor,
        category: course.category,
        image: course.image,
        currentModule: 'Module 1: Foundations',
        currentLesson: '1.1 Course Introduction'
      };
      
      setActiveCourses(prev => [newActive, ...prev]);

      // Add timeline activity
      setRecentActivities(prev => [
        {
          id: `act-${Date.now()}`,
          title: `Enrolled in ${course.title}`,
          type: 'download',
          time: 'Just now'
        },
        ...prev
      ]);
    }
  };

  // Open the Student Portal and auto-scroll to view top
  const handleOpenPortal = () => {
    setActiveView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch View Helper
  const handleViewChange = (view: AppView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resume course helper from portal
  const handleResumeCourse = (course: ActiveCourse) => {
    setActivePlayerCourse({
      title: course.title,
      image: course.image
    });
    setActiveView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter 3 elite bestseller courses to display as featured row on Home view
  const featuredCourses = useMemo(() => {
    return COURSES_DATA.filter(c => c.isBestseller).slice(0, 3);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased font-sans flex flex-col justify-between">
      {/* Persistent Navigation Header */}
      <Header
        activeView={activeView}
        onViewChange={handleViewChange}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onOpenPortal={handleOpenPortal}
      />

      {/* Primary Application Screens */}
      <main className="flex-grow">
        {activeView === 'home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            {/* Hero Launch Section */}
            <Hero 
              onBrowseCourses={() => handleViewChange('catalog')} 
              onGetStarted={handleOpenPortal} 
            />

            {/* Bento Grid Categories Section */}
            <BentoCategories 
              onCategoryClick={(category) => {
                setSearchQuery('');
                handleViewChange('catalog');
              }}
              onViewAllCategories={() => handleViewChange('catalog')}
            />

            {/* Curated Featured Programs Deck */}
            <section className="py-20 bg-gray-50/50 border-y border-gray-100">
              <div className="px-6 md:px-16 max-w-[1280px] mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#003d9b] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100/40">
                    Premium Selections
                  </span>
                  <h2 className="text-3xl font-bold text-[#051a3e] mt-4 mb-4">Curated Featured Programs</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Gain exclusive competency from courses recognized by leading institutions and top executives worldwide.
                  </p>
                </div>

                {/* Grid Deck */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredCourses.map(course => {
                    const isEnrolled = enrolledCourseIds.includes(course.id);
                    return (
                      <div 
                        key={course.id} 
                        className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full cursor-pointer"
                        onClick={() => handleViewChange('catalog')}
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={course.title}
                            src={course.image}
                          />
                          <span className="absolute top-4 left-4 px-3 py-1 bg-[#003d9b] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                            Featured Path
                          </span>
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                {course.category}
                              </span>
                              <div className="flex items-center gap-1 text-[#003d9b]">
                                <Star className="w-3.5 h-3.5 fill-[#003d9b]" />
                                <span className="text-xs font-bold">{course.rating.toFixed(1)}</span>
                              </div>
                            </div>

                            <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#003d9b] transition-all h-12 line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                              {course.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-gray-100 mt-auto">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{course.duration}</span>
                              </div>
                              <span className="text-sm font-black text-[#003d9b]">View Program</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Why Choose Us proofs */}
            <section className="py-24 bg-white">
              <div className="px-6 md:px-16 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#003d9b]">
                    Academy Advantages
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#051a3e] tracking-tight leading-tight">
                    Academic standards optimized for leadership impact
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    EduMaster Academy integrates authoritative methodology with state-of-the-art tooling. Join peers globally in achieving certified technical mastery.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex gap-4 items-start text-left">
                      <div className="w-10 h-10 bg-blue-50 text-[#003d9b] rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Official Certification Pathways</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">Earn credentials validated by industry leading organizations and elite global councils.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start text-left">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Peer Advisory &amp; Networking</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">Engage directly in shared workspaces and interactive team-forecasting groups.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start text-left">
                      <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 border border-purple-100">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">1-on-1 Faculty Mentorship</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">Book dedicated reviews and interactive support from certified program mentors.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-gray-100 bg-gray-50">
                  <img 
                    className="w-full h-full object-cover brightness-95"
                    alt="Corporate meeting design"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsxeyyao9vXT_reEXm_8jK87qefZ1qE8YXu32uMvxF0lngPy-FD2_DpXYzLmzAps9JF0mdZIY9Jm_40SFfN_FA_iGJxQ320AeF8lTewo2tqFyihJ-aYR3YiOHa2Jw0x0V4k3YWP6pEuMf3dSISdd5v9CPXXIH-UV4YT6u7nEZqvW667A3fMyoT493dn33LEe9DJpVvmAjPbmguimr7fI__NmIIgCRzlzavsRzKwiCq6cmfQpsl0GmtkJ7Y3ppsCYgISbbq5iU8SQw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </div>
            </section>

            {/* CTA Join block */}
            <section className="py-20 bg-gradient-to-r from-blue-900 to-[#003d9b] text-white text-center">
              <div className="px-6 md:px-16 max-w-[1280px] mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Are you ready to unlock executive success?</h2>
                <p className="text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
                  Join thousands of elite professionals advancing their metrics and governance paths. Start learning today.
                </p>
                <button
                  onClick={handleOpenPortal}
                  className="mt-4 px-8 py-3.5 bg-white text-[#003d9b] font-extrabold rounded-xl hover:bg-blue-50 transition-all shadow-md active:scale-95 inline-flex items-center gap-2 text-sm"
                >
                  Enter Portal Now
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </motion.div>
        )}

        {/* Course Catalog View */}
        {activeView === 'catalog' && (
          <CatalogView
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onEnroll={handleEnroll}
            enrolledCourseIds={enrolledCourseIds}
          />
        )}

        {/* Student Portal Dashboard View */}
        {activeView === 'portal' && (
          <PortalView
            activeCourses={activeCourses}
            recentActivities={recentActivities}
            certificates={certificates}
            deadlines={deadlines}
            onResumeCourse={handleResumeCourse}
            onExploreCourses={() => handleViewChange('catalog')}
          />
        )}

        {/* Custom Video Syllabus Player View */}
        {activeView === 'player' && (
          <PlayerView
            courseTitle={activePlayerCourse.title}
            courseImage={activePlayerCourse.image}
            onBackToPortal={handleOpenPortal}
          />
        )}
      </main>

      {/* Shared Footer component */}
      <Footer />
    </div>
  );
}

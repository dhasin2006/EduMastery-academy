/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  LineChart, 
  Play, 
  Calendar, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Check, 
  X, 
  HelpCircle, 
  TrendingUp, 
  Flame, 
  ArrowRight,
  BookMarked,
  Layers,
  MessageSquare,
  Gift,
  Search,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveCourse, RecentActivity, Certificate, Deadline } from '../types';

interface PortalViewProps {
  activeCourses: ActiveCourse[];
  recentActivities: RecentActivity[];
  certificates: Certificate[];
  deadlines: Deadline[];
  onResumeCourse: (activeCourse: ActiveCourse) => void;
  onExploreCourses: () => void;
}

// Chart data type
interface DailyStat {
  day: string;
  minutes: number;
  course: string;
  topic: string;
}

const WEEKLY_STATS: DailyStat[] = [
  { day: 'Mon', minutes: 45, course: 'Advanced Leadership Strategy', topic: '2.1 Leadership Dynamics' },
  { day: 'Tue', minutes: 80, course: 'Global Economics & Trade', topic: '1.2 Macro Factors' },
  { day: 'Wed', minutes: 35, course: 'Advanced Predictive Analytics & AI', topic: 'Neural Networks basics' },
  { day: 'Thu', minutes: 120, course: 'Algorithmic Trading & Quant Finance', topic: 'Statistical Arbitrage' },
  { day: 'Fri', minutes: 55, course: 'Advanced Leadership Strategy', topic: 'Mentorship Strategy Session' },
  { day: 'Sat', minutes: 90, course: 'Global Economics & Trade', topic: 'Macroeconomic Resource Optimization' },
  { day: 'Sun', minutes: 110, course: 'Advanced Predictive Analytics & AI', topic: 'Deep Learning Architectures' }
];

// Practice quizzes
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PRACTICE_QUIZZES: QuizQuestion[] = [
  {
    id: 1,
    question: "Which macroeconomic indicator is most indicative of high-frequency liquidity stress?",
    options: [
      "Long-Term Government Yields",
      "Real-Time Interbank Lending Spread (TED Spread)",
      "Consumer Confidence Index",
      "Lagging Unemployment Claims"
    ],
    correctAnswer: 1,
    explanation: "The TED spread (difference between 3-month Treasury bill and 3-month SOFR/LIBOR) represents actual credit risk in bank lending, acting as a direct real-time indicator of banking sector liquidity stress."
  },
  {
    id: 2,
    question: "In Deep Learning, what is the core purpose of a residual connection (Skip Connection)?",
    options: [
      "To decrease overall training batch sizes",
      "To completely bypass non-linear activation functions",
      "To mitigate vanishing/exploding gradients in deep models",
      "To force random dropout of neuron pathways"
    ],
    correctAnswer: 2,
    explanation: "Residual connections allow gradients to flow directly back through the network without attenuation, preventing vanishing gradients in extremely deep neural networks."
  },
  {
    id: 3,
    question: "What does a 95% 1-day Value at Risk (VaR) of $10 Million imply for an investment portfolio?",
    options: [
      "The portfolio is guaranteed to lose exactly $10 Million in one day.",
      "There is a 95% probability the daily loss will be at least $10 Million.",
      "There is a 5% tail probability that the daily loss will exceed $10 Million.",
      "The maximum possible loss of the portfolio is mathematically capped at $10 Million."
    ],
    correctAnswer: 2,
    explanation: "A 95% 1-day VaR of $10M means that in 95% of normal trading days, losses will not exceed $10M, leaving a 5% chance (tail risk) of losses exceeding $10M."
  }
];

// Simulated AI responses
const AI_COACH_RESPONSES: Record<string, string> = {
  stochastics: "Stochastic processes model random variables over time (like asset price walks or queue arrivals). In quantitative finance, we use geometric Brownian motion: dS_t = μ S_t dt + σ S_t dW_t, where dW_t is a random Wiener process representing market noise.",
  deeplearning: "Deep neural networks learn hierarchically. Early layers capture simple features (edges, textures), while deep layers synthesize them into abstract representations. Optimizers like Adam maintain individual adaptive learning rates per weight based on gradient moments.",
  leadership: "In corporate governance, strategic risk mitigation involves establishing institutional fail-safes: transparent delegation metrics, diverse advisory pools, double-checks on major capital allocations, and psychological safety so bad news travels fast.",
  default: "Excellent question! That topic is covered comprehensively in the third module of our certified curriculum. To optimize your understanding, try connecting it to your active practical projects, or book a 1-on-1 Strategy session with your Mentor."
};

export default function PortalView({
  activeCourses,
  recentActivities,
  certificates,
  deadlines,
  onResumeCourse,
  onExploreCourses
}: PortalViewProps) {
  // Chart selection state
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(3); // Default Thursday
  const selectedDayStat = WEEKLY_STATS[selectedDayIndex];

  // Daily Streak gamification state
  const [streakDays, setStreakDays] = useState<boolean[]>([true, true, true, true, true, false, false]); // Mon-Sun
  const [claimedReward, setClaimedReward] = useState<boolean>(false);
  const [rewardMessage, setRewardMessage] = useState<string>("");

  // Quiz Console State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const currentQuiz = PRACTICE_QUIZZES[currentQuizIndex];

  // AI Tutor console states
  const [aiQuery, setAiQuery] = useState<string>("");
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Hello John! I'm your elite AI Strategic Coach. Select one of the high-stakes prompts below or type any topic to receive instantaneous methodology reviews." }
  ]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Toggle Streak Days
  const handleToggleDay = (idx: number) => {
    const updated = [...streakDays];
    updated[idx] = !updated[idx];
    setStreakDays(updated);
  };

  // Streak Count
  const streakCount = streakDays.filter(Boolean).length;

  // Handle Quiz Submission
  const handleQuizAnswer = (optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(optionIdx);
  };

  const submitQuiz = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
  };

  const nextQuiz = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setCurrentQuizIndex((prev) => (prev + 1) % PRACTICE_QUIZZES.length);
  };

  // Ask AI Tutor
  const handleAskAI = (queryText: string) => {
    if (!queryText.trim() || isAiTyping) return;
    
    // Add user query to chat
    const newLogs = [...chatLog, { sender: 'user' as const, text: queryText }];
    setChatLog(newLogs);
    setAiQuery("");
    setIsAiTyping(true);

    // Analyze query for keywords
    const lower = queryText.toLowerCase();
    let responseText = AI_COACH_RESPONSES.default;
    
    if (lower.includes('stochastic') || lower.includes('brownian') || lower.includes('quant')) {
      responseText = AI_COACH_RESPONSES.stochastics;
    } else if (lower.includes('deep') || lower.includes('neural') || lower.includes('gradient')) {
      responseText = AI_COACH_RESPONSES.deeplearning;
    } else if (lower.includes('leader') || lower.includes('risk') || lower.includes('governance')) {
      responseText = AI_COACH_RESPONSES.leadership;
    }

    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'ai' as const, text: responseText }]);
      setIsAiTyping(false);
    }, 900);
  };

  // Claim Reward
  const claimRewardBadge = () => {
    if (streakCount < 5) {
      setRewardMessage("Learn at least 5 days this week to unlock the certified Strategy Master Badge! 📚");
      return;
    }
    setClaimedReward(true);
    setRewardMessage("Success! Strategy Master badge added to your Digital Vault and synced with LinkedIn. 🏆");
  };

  return (
    <div 
      className="min-h-screen text-gray-900 pt-24 pb-16 transition-all duration-500 relative"
      style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
    >
      {/* Background ambient circular overlay for layout rhythm */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.15),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 relative z-10">
        
        {/* TOP LEVEL BRANDED HEADER (Glassmorphism Banner) */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/15 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                Executive Workspace
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/25 border border-emerald-400/40 rounded-full text-[9px] font-bold text-emerald-200 uppercase tracking-wider">
                Live Session Active
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">John's Leadership Dashboard</h1>
            <p className="text-blue-100/90 text-xs md:text-sm mt-1 max-w-xl leading-relaxed">
              Synthesizing quantitative finance, deep learning architectures, and strategic resource governance. You have achieved <span className="font-extrabold text-white underline decoration-amber-300 decoration-2">65% overall progress</span>.
            </p>
          </div>
          
          <button 
            onClick={() => activeCourses.length > 0 ? onResumeCourse(activeCourses[0]) : onExploreCourses()}
            className="px-5 py-3 bg-white text-[#2563EB] hover:bg-blue-50 font-black rounded-xl text-xs transition-all flex items-center gap-2 active:scale-95 shadow-lg shrink-0"
          >
            {activeCourses.length > 0 ? 'Resume active module' : 'Explore Academic Catalog'}
            <ArrowRight className="w-4 h-4 text-[#2563EB]" />
          </button>
        </div>

        {/* METRICS QUICK CARDS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/95 backdrop-blur shadow-lg border border-white/40 rounded-2xl p-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Streak Count</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{streakCount} / 7 days</p>
              </div>
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2.5 font-medium">Daily consistency multiplier active</p>
          </div>

          <div className="bg-white/95 backdrop-blur shadow-lg border border-white/40 rounded-2xl p-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Core Programs</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{activeCourses.length} Active</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center border border-blue-100">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2.5 font-medium">Next deadline in 2 days</p>
          </div>

          <div className="bg-white/95 backdrop-blur shadow-lg border border-white/40 rounded-2xl p-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Study Time</p>
                <p className="text-2xl font-black text-gray-900 mt-1">48.5 Hours</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2.5 font-medium">Week-over-week +14% increase</p>
          </div>

          <div className="bg-white/95 backdrop-blur shadow-lg border border-white/40 rounded-2xl p-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Certificates</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{certificates.length} Verifiable</p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2.5 font-medium">LinkedIn credentials active</p>
          </div>
        </div>

        {/* PRIMARY COLUMNS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8-COLUMN MAIN BLOCK */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* INTERACTIVE WEEKLY ANALYTICS CHART */}
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                    <h2 className="text-lg font-black text-gray-900">Weekly Learning Metrics</h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Click any day to view rigorous session logs</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-3 h-3 rounded-md bg-[#2563EB]"></span>
                    <span>Lectures</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-3 h-3 rounded-md bg-[#7C3AED]"></span>
                    <span>Sandbox Code</span>
                  </div>
                </div>
              </div>

              {/* Interactive SVG / Bar layout */}
              <div className="h-64 flex items-end justify-between gap-2.5 pt-6 pb-2 px-2 border-b border-gray-100">
                {WEEKLY_STATS.map((stat, idx) => {
                  const isSelected = selectedDayIndex === idx;
                  // Max minutes is 120, normalize height to percentage
                  const heightPct = (stat.minutes / 120) * 100;
                  
                  return (
                    <div 
                      key={stat.day} 
                      onClick={() => setSelectedDayIndex(idx)}
                      className="flex-grow flex flex-col items-center group cursor-pointer"
                    >
                      {/* Tooltip on hover */}
                      <div className={`absolute mb-20 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none transform -translate-y-8 z-10`}>
                        {stat.minutes} mins
                      </div>

                      {/* Bar columns */}
                      <div className="w-full max-w-[40px] bg-gray-100/80 rounded-t-lg h-44 flex items-end overflow-hidden relative">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`w-full rounded-t-lg transition-colors duration-200 ${
                            isSelected 
                              ? 'bg-gradient-to-t from-[#2563EB] to-[#7C3AED] shadow-md' 
                              : 'bg-gray-400 group-hover:bg-blue-400'
                          }`}
                        />
                      </div>

                      {/* Day Label */}
                      <span className={`text-xs mt-3.5 font-bold transition-colors ${isSelected ? 'text-[#2563EB] scale-110 font-black' : 'text-gray-400'}`}>
                        {stat.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Day Details Card panel */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedDayIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 p-4 bg-blue-50/50 border border-blue-100/60 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-[#2563EB] bg-blue-100/55 px-2.5 py-0.5 rounded-full border border-blue-200/40">
                      Logs: {selectedDayStat.day}
                    </span>
                    <h4 className="font-extrabold text-sm text-gray-900">{selectedDayStat.course}</h4>
                    <p className="text-xs text-gray-500 font-medium">Focus Topic: <span className="font-bold text-gray-700">{selectedDayStat.topic}</span></p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl font-black text-[#2563EB] flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {selectedDayStat.minutes} <span className="text-xs font-bold text-gray-500">Minutes</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Goal completion: {Math.min(100, Math.round((selectedDayStat.minutes/60)*100))}% daily target</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* MY ACTIVE PROGRAMS CARD (High fidelity cards with progress actions) */}
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-[#2563EB]" />
                    My Active Programs
                  </h2>
                  <p className="text-xs text-gray-500">Track and immediately resume your high-stakes studies</p>
                </div>
                <button 
                  onClick={onExploreCourses}
                  className="text-xs font-black text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  Browse Full Catalog
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {activeCourses.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mb-3" />
                  <h3 className="font-bold text-gray-700 text-sm mb-1">No active enrollments</h3>
                  <p className="text-xs text-gray-400 max-w-xs mb-6">
                    You are not currently enrolled in any academic programs. Choose an elite path to start.
                  </p>
                  <button
                    onClick={onExploreCourses}
                    className="px-5 py-2.5 bg-[#2563EB] text-white font-semibold text-xs rounded-xl shadow-md hover:bg-blue-800 transition-all"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCourses.map(course => (
                    <div 
                      key={course.id}
                      className="border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full group"
                    >
                      {/* Header Thumbnail info */}
                      <div className="h-32 bg-gray-100 relative overflow-hidden shrink-0">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt={course.title}
                          src={course.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/50 backdrop-blur text-white text-[9px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                          {course.category}
                        </span>
                      </div>

                      {/* Info & Progress */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-black text-gray-900 text-sm leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-1">
                            {course.title}
                          </h3>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                            By {course.instructor}
                          </p>
                          <div className="mt-3.5 bg-gray-50/70 rounded-xl p-3 border border-gray-100">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Current Lesson</p>
                            <p className="text-xs font-extrabold text-gray-800 line-clamp-1 mt-0.5">{course.currentLesson}</p>
                          </div>
                        </div>

                        {/* Progress slider bar & CTA */}
                        <div className="mt-5">
                          <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-1.5">
                            <span>{course.progress}% Completed</span>
                            <span className="text-[#2563EB]">Resume ➜</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full transition-all duration-500"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <button
                              onClick={() => onResumeCourse(course)}
                              className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white hover:opacity-90 text-[10px] font-black rounded-lg flex items-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
                            >
                              <Play className="w-3 h-3 fill-white text-white border-none" />
                              LAUNCH
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INTERACTIVE ELITE AI COACH MODULE */}
            <div className="bg-[#1E1B4B] text-white rounded-3xl p-6 shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-purple-500/20 to-blue-500/0 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] rounded-xl flex items-center justify-center border border-white/20 shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm">Interactive AI Study Coach</h3>
                    <p className="text-[10px] text-purple-200">Antigravity Model Engine • Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wider">Live response ready</span>
                </div>
              </div>

              {/* Chat screen logs */}
              <div className="space-y-4 max-h-56 overflow-y-auto pr-1 mb-4 flex flex-col text-xs scrollbar-thin">
                {chatLog.map((chat, i) => (
                  <div 
                    key={i}
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      chat.sender === 'user' 
                        ? 'bg-[#2563EB] text-white self-end rounded-tr-none shadow-md' 
                        : 'bg-white/10 text-white/95 border border-white/5 self-start rounded-tl-none shadow-md'
                    }`}
                  >
                    <p>{chat.text}</p>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="p-3 bg-white/5 border border-white/5 text-white/80 rounded-2xl rounded-tl-none max-w-[40%] self-start flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                )}
              </div>

              {/* Sample Quick prompt buttons */}
              <div className="mb-4">
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-purple-300 mb-2">High-Stakes Prompt Presets</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleAskAI("Explain stochastic Brownian motion")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-white transition-all active:scale-95 text-left"
                  >
                    📈 Stochastic asset math
                  </button>
                  <button 
                    onClick={() => handleAskAI("Optimizing deep learning architectures")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-white transition-all active:scale-95 text-left"
                  >
                    🧠 Deep learning gradients
                  </button>
                  <button 
                    onClick={() => handleAskAI("What is risk mitigation in leadership?")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-white transition-all active:scale-95 text-left"
                  >
                    🛡️ Executive Risk mitigation
                  </button>
                </div>
              </div>

              {/* Chat Input form */}
              <div className="flex gap-2.5">
                <input 
                  type="text"
                  placeholder="Ask Coach Julian about quantum statistics, leadership logic..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI(aiQuery)}
                  className="flex-grow bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-medium"
                />
                <button 
                  onClick={() => handleAskAI(aiQuery)}
                  className="w-11 h-11 bg-white hover:bg-gray-100 text-[#1E1B4B] rounded-xl flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 4-COLUMN SIDEBAR BLOCK */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* GAMIFIED STREAK CHECKLIST */}
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black text-gray-900 text-sm flex items-center gap-1.5">
                    <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Consistency Tracker
                  </h3>
                  <p className="text-[10px] text-gray-400">Mark study achievements this week</p>
                </div>
                <span className="text-xs font-black text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {streakCount}/7 Days
                </span>
              </div>

              {/* Weekday check blocks */}
              <div className="grid grid-cols-7 gap-1.5 mb-5">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                  const isChecked = streakDays[idx];
                  return (
                    <button 
                      key={idx}
                      onClick={() => handleToggleDay(idx)}
                      className={`h-11 rounded-lg flex flex-col items-center justify-center transition-all border ${
                        isChecked 
                          ? 'bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white border-transparent shadow-sm' 
                          : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[9px] font-bold uppercase">{day}</span>
                      {isChecked ? (
                        <Check className="w-3 h-3 mt-0.5 stroke-[3]" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Claim Reward status box */}
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-900">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="font-extrabold text-amber-800 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-amber-600" />
                    Weekly Strategy Award
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    {streakCount >= 5 ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
                <p className="text-amber-900/80 leading-relaxed text-[11px]">
                  Study 5 consecutive days to claim your verified Strategy Master digital badge.
                </p>
                
                {rewardMessage && (
                  <div className="mt-3 p-2 bg-white/80 border border-amber-200 rounded-lg text-[10px] font-bold text-amber-800 animate-fade-in leading-tight">
                    {rewardMessage}
                  </div>
                )}

                <button 
                  onClick={claimRewardBadge}
                  disabled={claimedReward}
                  className={`w-full mt-3 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm ${
                    claimedReward 
                      ? 'bg-emerald-600 text-white cursor-default' 
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  {claimedReward ? 'Badge Claimed ✓' : 'Claim Weekly Badge 🏆'}
                </button>
              </div>
            </div>

            {/* INTERACTIVE DAILY PRACTICE QUIZ CONSOLE */}
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black text-gray-900 text-sm flex items-center gap-1.5">
                    <HelpCircle className="w-5 h-5 text-[#2563EB]" />
                    Rigorous Recall Quiz
                  </h3>
                  <p className="text-[10px] text-gray-400">Reinforce your professional competence</p>
                </div>
                <span className="text-[10px] font-bold bg-[#2563EB]/10 text-[#2563EB] px-2 py-0.5 rounded">
                  Q {currentQuizIndex + 1} of {PRACTICE_QUIZZES.length}
                </span>
              </div>

              {/* Question text */}
              <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 mb-4">
                <p className="text-xs font-bold text-gray-800 leading-relaxed">
                  "{currentQuiz.question}"
                </p>
              </div>

              {/* Choice options */}
              <div className="space-y-2 mb-4">
                {currentQuiz.options.map((opt, oIdx) => {
                  let optStyle = "border-gray-100 hover:border-gray-200 bg-white text-gray-700";
                  
                  if (selectedAnswer === oIdx) {
                    optStyle = "border-[#2563EB] bg-blue-50/40 text-gray-900 font-extrabold";
                  }

                  if (quizSubmitted) {
                    if (oIdx === currentQuiz.correctAnswer) {
                      optStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-900 font-extrabold";
                    } else if (selectedAnswer === oIdx) {
                      optStyle = "border-red-400 bg-red-50/30 text-red-900";
                    } else {
                      optStyle = "opacity-60 border-gray-100 bg-white text-gray-500";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleQuizAnswer(oIdx)}
                      disabled={quizSubmitted}
                      className={`w-full p-3 text-left text-xs rounded-xl border transition-all duration-150 flex items-start gap-2.5 ${optStyle}`}
                    >
                      <span className="font-bold text-gray-400 shrink-0">{String.fromCharCode(65 + oIdx)})</span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quiz feedback block */}
              {quizSubmitted && (
                <div className="p-3.5 bg-blue-50/40 border border-blue-100/40 rounded-2xl text-[11px] leading-relaxed text-blue-900/90 mb-4 animate-fade-in">
                  <div className="flex items-center gap-1.5 font-extrabold text-[#2563EB] mb-1">
                    <span>Explanation Feedback</span>
                  </div>
                  <p>{currentQuiz.explanation}</p>
                </div>
              )}

              {/* Actions submit/next */}
              {!quizSubmitted ? (
                <button 
                  onClick={submitQuiz}
                  disabled={selectedAnswer === null}
                  className={`w-full py-2.5 font-extrabold text-xs rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                    selectedAnswer === null 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white'
                  }`}
                >
                  Verify Answer
                </button>
              ) : (
                <button 
                  onClick={nextQuiz}
                  className="w-full py-2.5 bg-gray-900 text-white hover:bg-black font-extrabold text-xs rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  Next Challenge Question
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* UPCOMING DEADLINES CALENDAR */}
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 rounded-3xl p-6">
              <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-500" />
                Upcoming Milestones
              </h3>
              <div className="flex flex-col gap-4">
                {deadlines.map(dl => (
                  <div key={dl.id} className="flex items-center gap-4 p-1">
                    {/* Visual Date Indicator */}
                    <div className="w-11 h-12 bg-red-50 text-red-600 rounded-xl flex flex-col items-center justify-center border border-red-100/50 shrink-0 font-mono">
                      <span className="text-[8px] uppercase font-bold tracking-widest">{dl.month}</span>
                      <span className="text-base font-black leading-tight">{dl.date}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-black text-gray-800 line-clamp-1">{dl.title}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 bg-red-50 text-red-700 text-[9px] font-bold uppercase rounded-md border border-red-100/30">
                        {dl.daysLeft} days left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EARNED CERTIFICATES WALLET */}
            <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 rounded-3xl p-6">
              <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                Certified Accomplishments
              </h3>
              <div className="flex flex-col gap-3">
                {certificates.map(cert => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/40 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-xs font-extrabold text-gray-800 leading-tight">{cert.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{cert.issueDate}</p>
                    </div>
                    <button className="p-2.5 bg-white rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors shadow-sm border border-gray-100">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}


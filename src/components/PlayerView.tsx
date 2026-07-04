/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, FileText, CheckCircle2, Lock, HelpCircle, Save, Send, Volume2, Sparkles, Trophy, Download } from 'lucide-react';
import { SyllabusModule, SyllabusLesson } from '../types';
import { SYLLABUS_MODULES } from '../data';

interface PlayerViewProps {
  courseTitle: string;
  courseImage: string;
  onBackToPortal: () => void;
}

export default function PlayerView({ courseTitle, courseImage, onBackToPortal }: PlayerViewProps) {
  // Video Playback States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(160); // Starts at 2m40s
  const totalDuration = 2300; // 38:20 in seconds

  // Syllabus list inside state to handle progress checkbox completions
  const [modules, setModules] = useState<SyllabusModule[]>(SYLLABUS_MODULES);
  const [activeLesson, setActiveLesson] = useState<SyllabusLesson>({
    id: '2.1',
    title: '2.1 Leadership Dynamics',
    type: 'video',
    duration: '38:20',
    isCompleted: false,
    content: 'In this comprehensive module, we dive deep into the psychological underpinnings of corporate leadership. We\'ll explore how to navigate complex organizational structures while maintaining high levels of team engagement and professional integrity. This lesson covers key strategies used by Fortune 500 executives to foster innovation and resilience.'
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'quizzes' | 'notes'>('overview');

  // Interactive Quiz States
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Interactive Notes States
  const [newNote, setNewNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<{ id: string; timestamp: string; content: string }[]>([
    { id: '1', timestamp: '01:15', content: 'Leadership requires consistent accountability structures.' },
    { id: '2', timestamp: '02:40', content: 'Check the feedback loops with geodistributed project teams.' }
  ]);

  // AI Tutor Messages
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Hi John! I am your AI Master Coach. Ask me any question about "2.1 Leadership Dynamics" or request a quick summary of the case study!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Simulate tick when video is playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Convert seconds to MM:SS format
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Syllabus Lesson Click handler
  const handleLessonClick = (lesson: SyllabusLesson, moduleIndex: number) => {
    if (modules[moduleIndex].isLocked) return;
    
    // Highlight previous active lesson if any
    setActiveLesson(lesson);
    setIsPlaying(false);
    setCurrentTime(lesson.type === 'video' ? 160 : 0);
    setQuizSubmitted(false);
    setQuizAnswer(null);
  };

  // Toggle complete lesson checkbox
  const handleToggleLessonComplete = (moduleId: string, lessonId: string) => {
    setModules(prev => prev.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          lessons: mod.lessons.map(les => {
            if (les.id === lessonId) {
              return { ...les, isCompleted: !les.isCompleted };
            }
            return les;
          })
        };
      }
      return mod;
    }));
  };

  // Save Note Helper
  const handleSaveNote = () => {
    if (newNote.trim()) {
      setSavedNotes(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          timestamp: formatTime(currentTime),
          content: newNote.trim()
        }
      ]);
      setNewNote('');
    }
  };

  // Submit Quiz Helper
  const handleSubmitQuiz = () => {
    if (quizAnswer !== null) {
      setQuizSubmitted(true);
      const correct = quizAnswer === 2; // Let option 2 be correct
      setQuizScore(correct ? 100 : 0);
      if (correct) {
        // Complete current lesson!
        setModules(prev => prev.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(l => l.id === activeLesson.id ? { ...l, isCompleted: true } : l)
        })));
      }
    }
  };

  // Tutor Chat submit response simulation
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    // Simulate smart AI answer
    setTimeout(() => {
      let response = '';
      if (userText.toLowerCase().includes('summary') || userText.toLowerCase().includes('summarize')) {
        response = `Here is a summary of the current section on **Leadership Heuristics**:\n\n1. **Authority Loop**: High-impact leaders establish structural accountability prior to assigning execution tracks.\n2. **Feedback Resonance**: Ensure information radiates bidirectionally (top-down alignment and bottom-up validation) every 48 hours to minimize misalignment risks.\n3. **Psychological Trust**: Cultivate risk-tolerant environments so critical system errors are flagged before compounding.`;
      } else if (userText.toLowerCase().includes('trust') || userText.toLowerCase().includes('psychological')) {
        response = `Great question, John. In **Leadership Dynamics**, psychological safety serves as the primary system failure shield. Highly cohesive teams speak up early, preventing critical project and architecture failures before they impact the bottom line.`;
      } else {
        response = `Excellent perspective. That correlates precisely with our case study on leadership dynamics. At timestamp **${formatTime(currentTime)}** of this video, the instructor highlights that establishing robust metrics prevents ambiguity in geodistributed groups.`;
      }

      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="pt-28 pb-12 max-w-[1280px] mx-auto px-4 md:px-16 animate-fade-in">
      {/* Header and Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToPortal}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors border border-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <nav className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
              <span>{courseTitle}</span>
              <span>/</span>
              <span className="text-[#003d9b]">Learning Portal</span>
            </nav>
            <h1 className="text-lg font-extrabold text-gray-900 leading-tight">
              {activeLesson.title}
            </h1>
          </div>
        </div>

        {/* Dynamic score tracker */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>450 Experience Points</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main learning space (Video / Content + Tabs) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Simulated Premium Video Canvas */}
          <div className="bg-black aspect-video rounded-2xl relative overflow-hidden shadow-lg group select-none">
            {/* Poster / Background */}
            <img 
              className={`w-full h-full object-cover transition-all duration-300 ${isPlaying ? 'blur-sm opacity-90 brightness-50' : 'brightness-75'}`}
              alt="Video Poster"
              src={courseImage}
            />

            {/* Timed Tick Animation indicator */}
            {isPlaying && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                Streaming Video
              </div>
            )}

            {/* Play/Pause Large Central Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-[#003d9b]/90 text-white rounded-full flex items-center justify-center hover:scale-115 hover:bg-[#003d9b] shadow-2xl active:scale-90 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Custom Video Control Rail */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-center justify-between text-white gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:scale-110 active:scale-95 transition-transform text-white/90 hover:text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <span className="text-xs font-semibold font-mono tracking-wide text-white/85">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Progress Slider track */}
              <div className="flex-grow h-1.5 bg-white/20 rounded-full relative cursor-pointer group/slider">
                <div 
                  className="h-full bg-[#003d9b] rounded-full relative"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border border-blue-600 scale-0 group-hover/slider:scale-100 transition-transform"></span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <Volume2 className="w-4 h-4" />
                <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              {(['overview', 'resources', 'quizzes', 'notes'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-grow py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'border-[#003d9b] text-[#003d9b] bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Body Contents */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-4 text-left leading-relaxed text-gray-600">
                  <h3 className="font-extrabold text-gray-900 text-sm">About this Lesson</h3>
                  <p className="text-xs">{activeLesson.content}</p>
                  
                  <h4 className="font-bold text-gray-900 text-xs pt-2">Key Takeaways</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1 text-gray-600">
                    <li>Formulate strategic structural goals for cross-functional alignment.</li>
                    <li>Quantify risks before executing high-value operations contracts.</li>
                    <li>Utilize probabilistic modeling to determine structural resilience.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-100 bg-gray-50/40 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 text-[#003d9b] rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Executive Case Study (PDF)</p>
                        <p className="text-[10px] text-gray-400">4.8 MB • Core Material</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 border border-gray-100 bg-gray-50/40 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Risk Assessment Matrix (XLS)</p>
                        <p className="text-[10px] text-gray-400">1.2 MB • Interactive Model</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'quizzes' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-[#003d9b]" />
                    <span className="text-xs font-extrabold text-gray-800">Knowledge Check Quiz</span>
                  </div>

                  {quizSubmitted ? (
                    <div className="p-5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-sm text-emerald-900 mb-1">Excellent comprehension, John!</h4>
                        <p className="text-xs leading-relaxed text-emerald-800/90">
                          You scored 100% on this assessment. The authority-loop architecture is correctly identified as a foundational mechanism. This lesson has been marked as fully completed.
                        </p>
                        <button 
                          onClick={() => { setQuizSubmitted(false); setQuizAnswer(null); }}
                          className="mt-4 text-xs font-bold text-[#003d9b] hover:underline"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gray-800 leading-snug">
                        Which governance action is recommended prior to distributing high-value task sets across remote teams?
                      </p>
                      
                      <div className="flex flex-col gap-2.5">
                        {[
                          'Delegate performance metrics to the team leads autonomously.',
                          'Establish and align the structural authority and accountability parameters.',
                          'Increase daily feedback checks from 15 minutes to 1 hour.'
                        ].map((option, idx) => (
                          <label key={idx} className={`p-4 border rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
                            quizAnswer === idx 
                              ? 'border-[#003d9b] bg-blue-50/30 font-semibold' 
                              : 'border-gray-100 hover:border-blue-100 bg-gray-50/20'
                          }`}>
                            <input
                              className="text-[#003d9b] focus:ring-[#003d9b] w-4 h-4 mt-0.5 cursor-pointer"
                              name="quiz"
                              type="radio"
                              checked={quizAnswer === idx}
                              onChange={() => setQuizAnswer(idx)}
                            />
                            <span className="text-xs text-gray-700 leading-tight">{option}</span>
                          </label>
                        ))}
                      </div>

                      <button
                        onClick={handleSubmitQuiz}
                        disabled={quizAnswer === null}
                        className="px-5 py-2.5 bg-[#003d9b] text-white hover:bg-blue-800 disabled:opacity-50 font-bold rounded-lg text-xs shadow-sm transition-all active:scale-95"
                      >
                        Submit Answer
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  {/* Note Creator */}
                  <div className="flex gap-3">
                    <input
                      className="flex-grow rounded-lg border border-gray-200 px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#003d9b] outline-none text-gray-700"
                      placeholder={`Create note at ${formatTime(currentTime)}...`}
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button
                      onClick={handleSaveNote}
                      className="px-4 bg-[#003d9b] text-white hover:bg-blue-800 rounded-lg flex items-center justify-center gap-1.5 font-bold text-xs transition-all active:scale-95 shadow-sm shrink-0"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save
                    </button>
                  </div>

                  {/* Saved notes listing */}
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {savedNotes.map(note => (
                      <div key={note.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex gap-3 text-left">
                        <span className="text-[10px] font-mono font-bold text-[#003d9b] bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5 self-start shrink-0">
                          {note.timestamp}
                        </span>
                        <p className="text-xs text-gray-700 leading-relaxed">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar learning timeline & syllabus modules + AI Coach Chat */}
        <div className="flex flex-col gap-6">
          {/* Syllabus modules accordion */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Program Syllabus</h2>
            <div className="flex flex-col gap-4">
              {modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{mod.title}</span>
                    {mod.isLocked && <Lock className="w-3.5 h-3.5 text-gray-400" />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {mod.lessons.map(les => {
                      const isActive = activeLesson.id === les.id;
                      return (
                        <div
                          key={les.id}
                          className={`p-3 border rounded-xl flex items-center justify-between transition-all ${
                            isActive
                              ? 'bg-blue-50/50 border-[#003d9b]/40 shadow-sm'
                              : mod.isLocked
                                ? 'opacity-50 bg-gray-50 border-gray-50 cursor-not-allowed'
                                : 'hover:bg-gray-50/40 border-gray-100 cursor-pointer'
                          }`}
                        >
                          <div 
                            onClick={() => handleLessonClick(les, modIdx)}
                            className="flex-grow text-left cursor-pointer"
                          >
                            <p className={`text-xs font-bold leading-tight ${isActive ? 'text-[#003d9b]' : 'text-gray-800'}`}>
                              {les.title}
                            </p>
                            <span className="text-[10px] text-gray-400 mt-1 inline-block capitalize font-semibold">
                              {les.type} • {les.duration}
                            </span>
                          </div>

                          {/* Completion / Interactivity indicator */}
                          <div className="ml-3 shrink-0">
                            {les.isCompleted ? (
                              <CheckCircle2 
                                onClick={() => handleToggleLessonComplete(mod.id, les.id)}
                                className="w-4 h-4 text-teal-600 hover:text-gray-300 transition-colors cursor-pointer" 
                              />
                            ) : mod.isLocked ? (
                              <Lock className="w-3.5 h-3.5 text-gray-400" />
                            ) : (
                              <div 
                                onClick={() => handleToggleLessonComplete(mod.id, les.id)}
                                className="w-4 h-4 rounded-full border-2 border-gray-200 hover:border-[#003d9b] transition-colors cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium AI Master Coach Chat Drawer */}
          <div className="bg-[#051a3e] rounded-2xl p-5 text-white shadow-xl flex flex-col h-[320px]">
            <div className="flex items-center gap-2 mb-4 shrink-0 pb-2 border-b border-white/10">
              <Sparkles className="w-4 h-4 text-[#afecff] animate-pulse" />
              <h3 className="font-bold text-xs uppercase tracking-widest text-[#afecff]">AI Coach Workspace</h3>
            </div>

            {/* Message lists */}
            <div className="flex-grow overflow-y-auto mb-4 space-y-3.5 pr-1 text-left select-text">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[8px] text-white/40 uppercase tracking-widest mb-1">
                    {msg.role === 'user' ? 'John' : 'AI Mentor'}
                  </span>
                  <div className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#003d9b] text-white rounded-tr-none' 
                      : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[8px] text-white/40 uppercase tracking-widest mb-1">AI Mentor</span>
                  <div className="p-3 bg-white/10 text-white/70 rounded-xl rounded-tl-none border border-white/5 text-xs">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendChat} className="flex gap-2 shrink-0">
              <input
                className="flex-grow bg-white/10 border border-white/10 rounded-lg px-3.5 py-2 text-xs focus:ring-1 focus:ring-[#afecff] focus:border-[#afecff] outline-none text-white placeholder-white/40"
                placeholder="Ask Mentor..."
                required
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                type="submit"
                className="p-2 bg-[#003d9b] hover:bg-blue-800 text-white rounded-lg transition-all active:scale-95 shadow-md flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

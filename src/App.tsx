import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code, 
  Briefcase, 
  Layout, 
  Menu, 
  X,
  Globe,
  Smartphone,
  Bookmark,
  Store,
  TrendingUp,
  Utensils,
  Check,
  Copy,
  Users,
  Filter,
  ArrowDown
} from 'lucide-react';

const projects = [
  {
    title: "Kurate",
    tileDescription: "Personalized content curation platform for archiving articles, videos, and podcasts. Built using Claude Code.",
    modalDescription: "A simple and easy-to-use content curation and management website that allows you to archive your favorite content from across the internet. Includes RSS feed based content recommendation system.",
    icon: <Bookmark className="w-6 h-6" />,
    skills: ["Customer Interviews", "Product Marketing", "Customer Analytics"],
    technology: ["React", "Node.js", "Cloudflare D1 (SQLite)", "React Native / Expo (iOS + Android)", "Claude Code + Codex"],
    media: [
      { type: 'image', url: "/images/kurate_landing.png" },
      { type: 'image', url: "/images/kurate_dashboard.png" }
    ],
    link: "https://kurate.net",
    showCodeButton: false
  },
  {
    title: "Squadxoxo",
    tileDescription: "Social app for UMich students to find new friends. Weekly drops. Made using Claude Code.",
    modalDescription: "An easy to use product (website + iOS app) for UMich students to make new friends. Groups are created based on user preferences. Groups refresh every week and drop every Thursday at 10:30 AM. Inbuilt chat feature.",
    icon: <Users className="w-6 h-6" />,
    skills: ["Customer Validation Calls", "Rapid Prototyping", "Viral Marketing"],
    technology: ["React + Vite", "Node.js", "Google OAuth 2.0 API", "Claude Code"],
    media: [
      { type: 'image', url: '/images/Squad1.png' },
      { type: 'image', url: '/images/Squad2.png' }
    ],
    link: "https://squadxoxo.com",
    github: "#",
    showCodeButton: false
  },
  {
    title: "LinkedIn Attribution System",
    tileDescription: "Campaign attribution engine for GTM teams running LinkedIn programs.",
    modalDescription: "Attribution system for LinkedIn marketing to help GTM and Sales teams make the right decisions based on engagements on LinkedIn posts. Made using Codex.",
    icon: <Filter className="w-6 h-6" />,
    skills: ["GTM Engineering", "Product Roadmap Creation"],
    technology: ["React + Vite", "Python", "LinkedIn API, Exa API, OpenAI API", "Codex"],
    media: [
      { type: 'image', url: '/images/LAS_2.png' },
      { type: 'image', url: '/images/LAS_1.png' }
    ],
    link: "#",
    github: "https://github.com/NachikethRamesh/LinkedIn-Engagement-Attribution-System",
    showLiveButton: false
  },
  {
    title: "Flow Finance",
    tileDescription: "Viral growth campaign that increased Flow Finance downloads by 33%.",
    modalDescription: "I ran a viral marketing campaign at Michigan Ross for the Flow Finance iOS app developed by Arjun Mayur. I executed a marketing stunt that created 1.2k impressions and drove a 33% increase in downloads. The app provides finance news with concise, AI-generated summaries.",
    icon: <TrendingUp className="w-6 h-6" />,
    skills: ["Viral Marketing", "Growth Hacking", "Customer Analytics"],
    media: [
      { type: 'image', url: '/images/Flow1.jpeg' },
      { type: 'image', url: '/images/Flow2.jpeg' }
    ],
    link: "https://apps.apple.com/in/app/flow-fast-finance-news/id6751279102",
    showCodeButton: false
  },
  {
    title: "MHustle",
    tileDescription: "Prototype of an iOS app to enable peer-to-peer gig economy for UMich students. Created using Cursor. ",
    modalDescription: "Prototype of an app for UMich students to earn by sharing their skills to help other students in Ann Arbor. Features include inbuilt chat, user ratings, scheduling system, and secure payments.",
    icon: <Store className="w-6 h-6" />,
    skills: ["Prototyping", "Customer Surveys", "Product Development"],
    technology: ["SwiftUI", "Cursor"],
    media: [
      { type: 'image', url: '/images/MHustle_Features.png' },
      { type: 'video', url: '/images/Demo_Seeker.mp4' }
    ],
    github: "https://github.com/NachikethRamesh/MHustle",
    showLiveButton: false
  },
  {
    title: "AirKitchen",
    tileDescription: "Home-cooked meal discovery prototype focused on local authentic food.",
    modalDescription: "Prototype of the idea for an app to find homecooked food near you. Features include ratings and reviews, payments, location based search, and recommendations.",
    icon: <Utensils className="w-6 h-6" />,
    skills: ["Prototyping", "Product Ideation", "Product Roadmap Development"],
    technology: ["JavaScript", "Replit"],
    media: [
      { type: 'image', url: '/images/airkitchen_landing.png' },
      { type: 'image', url: '/images/airkitchen_explore.png' }
    ],
    link: "https://home-chef-connect--doncheetos.replit.app/",
    showCodeButton: false
  }
];

const skills = {
  "Product & Strategy": [
    "Strategy Consulting",
    "Business Transformation",
    "Customer Research",
    "Market Analysis",
    "Data Analysis",
    "Pricing Strategy",
    "Product Roadmapping",
    "Sales Strategy",
    "Viral Marketing",
    "Growth Hacking"
  ],
  Technical: ["JavaScript", "Node.js", "Python", "SQL", "C#"],
  Tools: ["Figma", "Jira", "PowerBI", "Git", "Antigravity", "Cursor", "Claude Code", "Replit"]
};

const getProjectSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video'; url: string; alt: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const openProjectModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setActiveMedia(null);
    window.history.replaceState(null, '', `#portfolio#${getProjectSlug(project.title)}`);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setActiveMedia(null);
    window.history.replaceState(null, '', '#portfolio');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('naramesh@umich.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncModalWithHash = () => {
      const hash = window.location.hash;

      if (hash.startsWith('#portfolio#')) {
        const slug = hash.slice('#portfolio#'.length).toLowerCase();
        const matchedProject = projects.find((project) => getProjectSlug(project.title) === slug);

        if (matchedProject) {
          setSelectedProject(matchedProject);
          setActiveMedia(null);
          return;
        }

        window.history.replaceState(null, '', '#portfolio');
        setSelectedProject(null);
        setActiveMedia(null);
        return;
      }

      if (selectedProject) {
        setSelectedProject(null);
        setActiveMedia(null);
      }
    };

    syncModalWithHash();
    window.addEventListener('hashchange', syncModalWithHash);
    return () => window.removeEventListener('hashchange', syncModalWithHash);
  }, [selectedProject]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter"
          >
            NACHIKETH <span className="text-white">RAMESH</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm uppercase tracking-widest transition-colors hover:text-white ${
                  activeSection === item.id ? 'text-white' : 'text-white/50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-light tracking-tighter"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex flex-col justify-center overflow-hidden px-6">
          {/* Background Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left Column: Name */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-fit"
                >
                  <h1 className="text-[7.5vw] md:text-[6.8vw] lg:text-[5.5vw] font-light tracking-tighter leading-[0.9] mb-4 whitespace-nowrap">
                    NACHIKETH <span className="text-white">RAMESH</span>
                  </h1>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <span className="text-[15px] uppercase tracking-[0.2em] text-white/40 font-medium">Strategy Consultant</span>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                    <span className="text-[15px] uppercase tracking-[0.2em] text-white/40 font-medium">Product Manager</span>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                    <span className="text-[15px] uppercase tracking-[0.2em] text-white/40 font-medium">GTM Engineer</span>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                    <a 
                      href="#about" 
                      className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black text-[11.5px] font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all"
                    >
                      <span>About Me</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="#portfolio" 
                      className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black text-[11.5px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
                    >
                      <span>View My Work</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="mt-5 flex items-center justify-center space-x-4">
                    <a href="https://www.linkedin.com/in/nachikethramesh/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all">
                      <Linkedin className="w-[18px] h-[18px]" />
                    </a>
                    <a href="https://github.com/NachikethRamesh" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all">
                      <Github className="w-[18px] h-[18px]" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Info & CTA */}
              <div className="lg:col-span-5 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  <div className="space-y-5">
                    <p className="text-[1.38rem] md:text-[1.68rem] text-white/80 leading-tight font-light">
                      Bridging the gap between <span className="text-white">complex business strategy</span> and <span className="text-white">human-centric technology</span>. 
                    </p>
                    <p className="text-[18px] text-white/40 leading-relaxed max-w-xl">
                      MBA Candidate at Michigan Ross with 7 years of experience at EY, Deloitte, and BCG.
                      <br />
                      Focused on building products to deliver real impact.
                    </p>
                  </div>

                  {/* Featured On Card - More compact */}
                  <div className="pt-8 border-t border-white/5">
                    <span className="text-[12.5px] uppercase tracking-[0.3em] text-white/20 mb-3.5 block font-mono">Featured On</span>
                    <a 
                      href="https://www.mlive.com/news/ann-arbor/2026/03/fed-up-with-dating-apps-2-university-of-michigan-students-made-a-friendship-platform-instead.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-[18px] border border-white/5 rounded-xl hover:bg-white/[0.02] transition-all bg-white/[0.01]"
                    >
                      <div className="text-left pr-5">
                        <span className="text-[11.5px] font-mono text-white/20 uppercase tracking-widest block mb-1.5">MLive // Ann Arbor</span>
                        <h3 className="text-[14.5px] font-medium leading-snug text-white/40 group-hover:text-white transition-colors">
                          Fed up with dating apps? 2 U-M students made a friendship platform instead.
                        </h3>
                      </div>
                      <ChevronRight className="w-[18px] h-[18px] text-white/20 group-hover:text-[#39FF14] group-hover:drop-shadow-[0_0_8px_#39FF14] transition-all" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 block font-mono">01 // Background</span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tight">About Me</h2>
              </motion.div>
              </div>

              <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  I am a second year MBA student at Michigan Ross. I am passionate about delivering impact by working at the intersection of technology &amp; strategy.
                </p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  I have 7 years of experience in business transformation and strategy consulting at EY, Deloitte, and BCG. I have managed the ideation, design, development, and roll-out of 50+ enterprise-grade products.
                </p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  At Ross, product management classes and technology focused events such as "Tech-Innovation Jam" and "Dare to Dream" have helped me explore the consumer-facing aspects of product development: from running effective consumer interviews &amp; surveys, to consumer analytics for understanding user preferences, to consumer behavior strategies that improve user stickiness.
                </p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  I have augmented these skills through deliberate practice, putting my product development and strategic thinking skills to use by creating productivity tools through vibe coding and by running marketing campaigns.
                </p>
              </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 block font-mono">02 // Selected Works</span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tight">Portfolio</h2>
              </div>
              <div className="md:col-span-8 flex items-end">
                <p className="text-white/40 text-sm max-w-md leading-relaxed font-mono uppercase tracking-wider">
                  Exploring consumer-facing aspects of product development through deliberate practice and user-centric design.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded-2xl overflow-hidden">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    openProjectModal(project);
                  }}
                  className={`group relative p-8 md:p-12 border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col cursor-pointer ${
                    index % 2 === 0 ? 'md:border-r' : ''
                  } ${
                    index < projects.length - 2 ? 'border-b' : (index === projects.length - 2 && projects.length % 2 !== 0 ? '' : (index < projects.length - 1 ? 'border-b md:border-b-0' : ''))
                  } ${
                    // Special case for mobile borders
                    'border-b md:last:border-b-0'
                  }`}
                >
                  <div className="flex items-start justify-between mb-12">
                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] font-mono text-white/20">[{String(index + 1).padStart(2, '0')}]</span>
                      <div className="p-3 rounded-xl bg-white/5 text-white/40 group-hover:text-[#39FF14] group-hover:bg-[#39FF14]/10 group-hover:drop-shadow-[0_0_8px_#39FF14] transition-all">
                        {project.icon}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-medium mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm">
                      {project.tileDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="text-[9px] uppercase tracking-[0.2em] font-mono px-2 py-1 rounded border border-white/5 bg-white/[0.02] text-white/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Project Modal */}
            <AnimatePresence>
              {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeProjectModal}
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A0A]">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/5 text-white/60">
                          {selectedProject.icon}
                        </div>
                        <h3 className="text-xl font-medium tracking-tight">{selectedProject.title}</h3>
                      </div>
                      <button 
                        onClick={closeProjectModal}
                        className="p-2 rounded-full hover:bg-white/5 transition-colors"
                      >
                        <X className="w-5 h-5 text-white/40 hover:text-white" />
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="flex-grow overflow-y-auto p-6 md:p-10 custom-scrollbar">
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 block font-mono">Description</span>
                            <p className="text-white/60 leading-relaxed">
                              {selectedProject.modalDescription}
                            </p>
                          </div>

                          {Array.isArray(selectedProject.skills) && selectedProject.skills.length > 0 && (
                            <div>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 block font-mono">Skills Involved</span>
                              <div className="flex flex-wrap gap-2">
                                {selectedProject.skills.map((skill, i) => (
                                  <span key={i} className="text-[10px] uppercase tracking-[0.1em] font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {Array.isArray(selectedProject.technology) && selectedProject.technology.length > 0 && (
                            <div>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 block font-mono">Technology Stack</span>
                              <div className="flex flex-wrap gap-2">
                                {selectedProject.technology.map((tech, i) => (
                                  <span key={i} className="text-[10px] uppercase tracking-[0.1em] font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-4 pt-4">
                            {selectedProject.showLiveButton !== false && (
                              <a 
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>{selectedProject.title === "Flow Finance" ? "Download App" : "Live Project"}</span>
                              </a>
                            )}
                            {selectedProject.showCodeButton !== false && (
                              <a 
                                href={selectedProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-6 py-3 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                <span>View Code</span>
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 block font-mono">Media Gallery</span>
                          <div className="grid gap-4">
                            {selectedProject.media.map((item, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  setActiveMedia({
                                    type: item.type as 'image' | 'video',
                                    url: item.url,
                                    alt: `${selectedProject.title} media ${i + 1}`,
                                  })
                                }
                                className="rounded-xl overflow-hidden border border-white/5 bg-white/5 aspect-video flex items-center justify-center relative group cursor-zoom-in"
                                aria-label={`Open ${item.type} ${i + 1} for ${selectedProject.title}`}
                              >
                                {item.type === 'image' ? (
                                  <img 
                                    src={item.url} 
                                    alt={`${selectedProject.title} screenshot ${i + 1}`}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <video 
                                    src={item.url} 
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeMedia && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setActiveMedia(null)}
                          className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
                        >
                          <motion.div
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.94, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(event) => event.stopPropagation()}
                            className="relative w-[80%] h-[80%] rounded-xl border border-white/10 bg-[#050505] overflow-hidden flex items-center justify-center"
                          >
                            <button
                              type="button"
                              onClick={() => setActiveMedia(null)}
                              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                              aria-label="Close media preview"
                            >
                              <X className="w-5 h-5 text-white" />
                            </button>

                            {activeMedia.type === 'image' ? (
                              <img
                                src={activeMedia.url}
                                alt={activeMedia.alt}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <video
                                src={activeMedia.url}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                              />
                            )}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 block font-mono">03 // Expertise</span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tight">Skills</h2>
              </div>
              <div className="md:col-span-8 flex items-end">
                <p className="text-white/40 text-sm max-w-md leading-relaxed font-mono uppercase tracking-wider">
                  Technical proficiency and strategic frameworks
                  <br />
                  developed through 7+ years of professional experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden">
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 md:p-12 flex flex-col ${
                    index !== Object.entries(skills).length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''
                  } hover:bg-white/[0.02] transition-colors group`}
                >
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold font-mono">
                      {category}
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#39FF14] group-hover:shadow-[0_0_10px_#39FF14] transition-all"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {items.map((skill, sIndex) => (
                      <div 
                        key={sIndex} 
                        className="text-sm md:text-base font-light text-white/60 hover:text-white transition-colors cursor-default tracking-wide flex items-center space-x-2"
                      >
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 block font-mono">04 // Connection</span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tight">Get in Touch</h2>
              </div>
              <div className="md:col-span-8 flex items-end">
                <p className="text-white/40 text-[10px] md:text-sm leading-relaxed font-mono uppercase tracking-wider whitespace-nowrap">
                  Have a project in mind? Let's work together. Drop me a note!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded-2xl overflow-hidden">
              {/* Email Card */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold font-mono">Direct Channel</span>
                  <Mail className="w-4 h-4 text-white/20 group-hover:text-[#39FF14] group-hover:drop-shadow-[0_0_8px_#39FF14] transition-all" />
                </div>
                <button 
                  onClick={copyEmail}
                  className="flex flex-col items-start space-y-4 w-full text-left"
                >
                  <h3 className="text-2xl md:text-4xl font-light tracking-tight group-hover:text-white transition-colors">
                    naramesh@umich.edu
                  </h3>
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/30">
                    {copied ? (
                      <span className="text-emerald-500 flex items-center space-x-2">
                        <Check className="w-3 h-3" />
                        <span>Copied to clipboard</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <Copy className="w-3 h-3" />
                        <span>Click to copy email</span>
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {/* Socials Card */}
              <div className="p-8 md:p-12 hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold font-mono">Social Networks</span>
                  <Globe className="w-4 h-4 text-white/20 group-hover:text-[#39FF14] group-hover:drop-shadow-[0_0_8px_#39FF14] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://www.linkedin.com/in/nachikethramesh/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-white/5 rounded-xl hover:border-white/20 hover:bg-white/5 transition-all group/link"
                  >
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-5 h-5 text-white/40 group-hover/link:text-[#39FF14] group-hover/link:drop-shadow-[0_0_8px_#39FF14] transition-all" />
                      <span className="text-sm font-medium tracking-wide">LinkedIn</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover/link:text-[#39FF14] group-hover/link:drop-shadow-[0_0_8px_#39FF14] transition-all" />
                  </a>
                  <a 
                    href="https://github.com/NachikethRamesh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-white/5 rounded-xl hover:border-white/20 hover:bg-white/5 transition-all group/link"
                  >
                    <div className="flex items-center space-x-3">
                      <Github className="w-5 h-5 text-white/40 group-hover/link:text-[#39FF14] group-hover/link:drop-shadow-[0_0_8px_#39FF14] transition-all" />
                      <span className="text-sm font-medium tracking-wide">GitHub</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover/link:text-[#39FF14] group-hover/link:drop-shadow-[0_0_8px_#39FF14] transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
          &copy; 2026 Nachiketh Ramesh
        </p>
      </footer>
    </div>
  );
}

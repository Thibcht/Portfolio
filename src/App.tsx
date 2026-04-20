"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Menu, X, Play, ExternalLink, Instagram, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/src/lib/utils";






// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  video?: string;
  color: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "SPACE TRAVELER",
    category: "Animated Video",
    year: "2024",
    image: "/Space Travel img.png",
    video: "/Rendu 04 POD.mp4",
    color: "#ff0055",
  },
  {
    id: 2,
    title: "AKENEO PRODUCT CLOUD",
    category: "Corporate Ad",
    year: "2025",
    image: "/APCimg.png",
    video: "/APC_Ad_1920x1080_2025_06.mp4" ,
    color: "#00ffcc",
  },
  {
    id: 3,
    title: "IKO",
    category: "3D Animation",
    year: "2025",
    image: "/IKOimg.png",
    video: "/IKO_Chara_Design_Presentation.mp4" ,
    color: "#ffcc00",
  },
  {
    id: 4,
    title: "JDC",
    category: "Corporate Ad",
    year: "2020",
    image: "/jdcimg.png",
    video: "/PRESENTATION JDCComm.mp4",
    color: "#9900ff",
  },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center",
        scrolled ? "bg-brand-black/80 backdrop-blur-md py-4 md:py-6" : "bg-transparent"
      )}
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="w-10 h-10 bg-brand-white text-brand-black flex items-center justify-center rounded-sm transition-transform hover:scale-110 p-1">
  <img src="logo.png" className="w-full h-full object-contain" />
</div>
        <span className="text-2xl font-display font-bold tracking-tighter hidden sm:block">
          CHAINTRIER THIBAUT<span className="text-brand-gray">.</span>
        </span>
      </motion.div>

      <div className="hidden md:flex gap-12 items-center">
        {["WORK", "STUDIO", "CONTACT"].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-xs font-medium tracking-widest hover:text-brand-gray transition-colors"
          >
            {item}
          </motion.a>
        ))}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-white text-brand-black px-6 py-2 text-xs font-bold tracking-widest hover:bg-brand-gray hover:text-brand-white transition-all"
        >
          START A PROJECT
        </motion.button>
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-black border-t border-brand-gray p-8 flex flex-col gap-6 md:hidden"
          >
            {["WORK", "STUDIO", "CONTACT"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-2xl font-display font-bold" onClick={() => setIsOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center px-6 md:px-12">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/20 to-brand-black z-10" />
        <video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover opacity-40"
>
  <source src="/V2.mp4" type="video/mp4" />
  Votre navigateur ne supporte pas la vidéo.
</video>
      </motion.div>

      <div className="relative z-20 max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-gray-300 uppercase">Motion Design Studio</span>
          <h1 className="text-6xl md:text-[6vw] font-display font-black leading-[0.9] tracking-tighter">
            VOS IDEES <br />
            <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: "1px white" }}>EN MOUVEMENT.</span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            
            <button 
  onClick={() => setOpen(true)}
  className="group flex items-center gap-4 text-sm font-bold tracking-widest"
>
  VIEW REEL
  <div className="w-12 h-12 rounded-full border border-brand-white flex items-center justify-center group-hover:bg-brand-white group-hover:text-brand-black transition-all">
    <Play size={16} fill="currentColor" />
  </div>
</button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.5em] uppercase text-brand-white">Scroll</span>
        <div className="w-[1px] h-12 bg-brand-gray relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-brand-white"
          />
        </div>
      </motion.div>
      <AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={() => setOpen(false)} // 👉 ferme si tu cliques sur le fond
    >
      
      {/* VIDEO */}
      <motion.video
        src="/reel26.mp4"
        autoPlay
        controls
        className="w-full max-w-5xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()} // 👉 empêche fermeture quand tu cliques sur la vidéo
      />

      {/* BOUTON CLOSE */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-6 right-6 text-white text-4xl"
      >
        ✕
      </button>

    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
  onClick={onClick}
  initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-[4/5] overflow-hidden bg-brand-gray cursor-pointer"
    >
      <motion.img
        src={project.image}
        alt={project.title}
        referrerPolicy="no-referrer"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-brand-gray uppercase mb-2 block">
              {project.category} — {project.year}
            </span>
            <h3 className="text-3xl font-display font-bold tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
              {project.title}
            </h3>
          </div>
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            className="w-10 h-10 rounded-full border border-brand-white flex items-center justify-center"
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </div>

      {/* Hover Overlay Color */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: project.color }}
      />
    </motion.div>
  );
};

const Work = ({ setActiveVideo }: { setActiveVideo: (video: string) => void }) => {
  return (
    <section id="work" className="py-24 md:py-48 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none"
          >
            SELECTED <br />
            <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: "1px white" }}>WORKS.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md text-brand-white text-sm leading-relaxed"
          >
            I’ve worked with a wide range of clients to create visual experiences that resonate.
            From high-end motion identity to immersive brand films, I craft work that connects and leaves a lasting impression.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {PROJECTS.map((project, i) => (
            <ProjectCard 
  key={project.id} 
  project={project} 
  index={i} 
  onClick={() => project.video && setActiveVideo(project.video)}
/>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <button className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase border-b border-brand-gray pb-2 hover:border-brand-white transition-all">
            View All Projects
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Studio = () => {
  return (
    <section id="studio" className="py-24 md:py-48 px-6 md:px-12 bg-red-1000">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square overflow-hidden"
        >
          <img 
            src="/me.png" 
            alt="Studio Team" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-black/20" />
        </motion.div>

        <div className="flex flex-col gap-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.3em] text-brand-gray uppercase"
          >
            The Studio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight"
          >
            CRAFTING MOTION <br />
            SINCE 2014.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-gray leading-relaxed"
          >
            I'm a motion designer based in La Rochelle. With over 10 years of experience,
            I’m a director, designer, and animator driven by a deep passion for visual storytelling.
            Blending strong musical sensibility with precise storytelling, I craft visuals that resonate and move.
            From concept to final frame, I bring your ideas to life with a focus on high-end aesthetics and technical excellence.
          </motion.p>
          
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: "Experience", value: "10years" },
              { label: "Clients", value: "25" },
              { label: "Coffee", value: "∞" },
              { label: "Frames", value: "1M+" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="text-3xl font-display font-bold">{stat.value}</div>
                <div className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-black pt-24 pb-12 px-6 md:px-12 border-t border-brand-gray">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-8">
              LET'S MAKE <br />
              IT <span className="text-brand-gray italic">MOVE.</span>
            </h2>
            <a href="mailto:hello@woodwork.studio" className="text-2xl md:text-3xl font-display font-bold hover:text-brand-gray transition-colors">
              chaintrierthibaut@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Address</span>
            <p className="text-sm leading-relaxed">
            Everywhere on the web…<p></p>
            But somehow still hiding near La Rochelle 👀
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Social</span>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/thib_chtt/?hl=fr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-gray flex items-center justify-center hover:bg-brand-white hover:text-brand-black transition-all ">
                <Instagram size={18} />
              </a>
              
              <a href="https://www.linkedin.com/in/thibaut-chaintrier-b83991139/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-gray flex items-center justify-center hover:bg-brand-white hover:text-brand-black transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-brand-gray/30 gap-6">
          <div className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">
            © CHAINTRIER THIBAUT ALL RIGHTS RESERVED.
          </div>
          
        </div>
      </div>
    </footer>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .cursor-pointer")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-brand-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
    />
  );
};

export default function App() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  return (
    <div className="bg-brand-black min-h-screen selection:bg-brand-white selection:text-brand-black cursor-none">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Work setActiveVideo={setActiveVideo} />
        <Studio />
      </main>
      <Footer />
      <AnimatePresence>
  {activeVideo && (
    <motion.div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveVideo(null)}
    >
      <motion.video
        src={activeVideo}
        autoPlay
        controls
        className="w-full max-w-5xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={() => setActiveVideo(null)}
        className="absolute top-6 right-6 text-white text-4xl"
      >
        ✕
      </button>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

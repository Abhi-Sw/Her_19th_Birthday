import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Gift, Music, ArrowLeft, ArrowRight } from "lucide-react";
import Confetti from "react-confetti";

const gallery = [
  { src: "/mem1.png", caption: "My Favourite Person 🐾" },
  { src: "/mem2.png", caption: "The only one 🏞️" },
  { src: "/mem3.png", caption: "Dream Girl ✨" },
];

export default function BirthdayLandingPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typeText, setTypeText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const fullMessage =
    "You are the spark that makes my world brighter. Today is all about celebrating YOU 💕";

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShowConfetti(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSurprise && typeText.length < fullMessage.length) {
      const timeout = setTimeout(() => {
        setTypeText(fullMessage.slice(0, typeText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [showSurprise, typeText]);

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.play().catch(() => {
        console.log("Autoplay blocked by browser, waiting for interaction.");
      });
    }
  }, []);
  
  useEffect(() => {
    if (!showSurprise) return;
    const id = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(id);
  }, [showSurprise]);

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;
    if (!isPlaying) audio.play();
    else audio.pause();
    setIsPlaying(!isPlaying);
  };

  const prev = () => setCurrentIndex((p) => (p - 1 + gallery.length) % gallery.length);
  const next = () => setCurrentIndex((p) => (p + 1) % gallery.length);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white overflow-hidden">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl p-8 rounded-3xl glass-card neon-border"
      >
        <motion.h1
          className="text-6xl font-extrabold neon-text mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎉 Happy Birthday!
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Wishing you a magical day filled with love, laughter & endless joy 💖
        </motion.p>

        <motion.button
          onClick={() => setShowSurprise(true)}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl text-lg font-bold shadow-lg transition"
        >
          Open Your Surprise 🎁
        </motion.button>
      </motion.div>

      {showSurprise && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-12 p-8 max-w-2xl w-[92%] text-center glass-card neon-border"
        >
          <h2 className="text-4xl neon-text mb-3">💌 A Special Message</h2>
          <p className="text-lg text-gray-200 mb-6 min-h-[3rem]">{typeText}</p>

          <div className="relative bg-black/40 p-4 rounded-xl shadow-lg">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              src={gallery[currentIndex].src}
              alt="memory"
              className="rounded-xl mb-2 mx-auto w-full max-h-[360px] object-cover"
            />
            <p className="text-gray-300 italic">{gallery[currentIndex].caption}</p>

            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      <motion.div className="absolute bottom-10 right-10 text-neonPink" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <Heart size={40} />
      </motion.div>
      <motion.div className="absolute top-20 left-10 text-neonBlue" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
        <Heart size={30} />
      </motion.div>

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg hover:scale-110 transition"
        aria-label="Toggle music"
        title="Toggle music"
      >
        <Music className="w-6 h-6" />
      </button>

      <audio id="bg-music" autoPlay loop>
        <source src="/Are_Are_Are.wav" type="audio/wav" />
      </audio>
    </div>
  );
}

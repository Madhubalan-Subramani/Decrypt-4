import React from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { DecryptGamePage } from "./features/decrypt-game/components/DecryptGamePage";

const GameRoot: React.FC = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Navbar */}
      <Navbar
        title="Decrypt 4"
        subtitle="Game for Increase Memory Power"
        menuTitle="Game Settings"
        menuDescription="Control your visual experience"
      />
      <DecryptGamePage />
      {/* Footer */}
      <motion.div
        className="shrink-0 overflow-hidden"
        initial={{
          opacity: 0,
          y: -8,
          filter: "blur(5px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          delay: 0.9,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GameRoot />
    </ThemeProvider>
  );
};

export default App;

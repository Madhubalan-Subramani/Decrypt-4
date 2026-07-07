// src/components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Settings, Sparkles, Sun, X } from "lucide-react";
import { useAppTheme } from "../context/ThemeContext";
import {
  brandTextVariants,
  dropdownItemVariants,
  dropdownVariants,
  logoVariants,
  menuButtonVariants,
  navbarVariants,
} from "../lib/animations";

interface NavbarConfig {
  title: string;
  subtitle: string;
  menuTitle: string;
  menuDescription: string;
}

const navbarConfig: NavbarConfig = {
  title: "Decrypt 4",
  subtitle: "Game for Increase Memory Power",
  menuTitle: "Appearance",
  menuDescription: "Customize your game theme",
};

const AnimatedLogo: React.FC = () => {
  return (
    <motion.div
      variants={logoVariants}
      whileHover={{
        scale: 1.08,
        rotate: 8,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className="group relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25"
    >
      <motion.div
        animate={{
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="h-5 w-5" />
      </motion.div>

      <span className="absolute inset-0 -z-10 rounded-2xl bg-indigo-500/30 blur-xl transition group-hover:bg-fuchsia-500/40" />
    </motion.div>
  );
};

const BrandText: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div>
      <motion.h1
        variants={brandTextVariants}
        className="bg-gradient-to-r from-slate-950 via-indigo-700 to-fuchsia-600 bg-clip-text text-xl font-black tracking-wide text-transparent dark:from-white dark:via-indigo-200 dark:to-fuchsia-300"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={brandTextVariants}
        className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppTheme();

  const isDark = theme === "dark";

  return (
    <motion.div
      variants={dropdownItemVariants}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            key={theme}
            initial={{
              scale: 0.4,
              rotate: -120,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 16,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm dark:bg-slate-800 dark:text-yellow-300"
          >
            {isDark ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </motion.div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Theme Mode
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isDark ? "Click for Light Mode" : "Click for Dark Mode"}
            </p>
          </div>
        </div>

        <motion.button
          onClick={toggleTheme}
          whileTap={{
            scale: 0.92,
          }}
          className={`relative flex h-9 w-[70px] items-center rounded-full p-1 transition-colors duration-300 hover:cursor-pointer ${
            isDark ? "bg-indigo-600" : "bg-slate-300"
          }`}
          aria-label="Toggle theme mode"
        >
          <motion.span
            layout
            transition={{
              type: "spring",
              stiffness: 550,
              damping: 32,
            }}
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ${
              isDark ? "ml-[33px]" : "ml-0"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="moon"
                  initial={{
                    rotate: -120,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    rotate: 120,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Moon className="h-4 w-4 text-indigo-600" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{
                    rotate: 120,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    rotate: -120,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Sun className="h-4 w-4 text-orange-500" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const MenuButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      variants={menuButtonVariants}
      whileHover={{
        scale: 1.08,
        rotate: isOpen ? 0 : 3,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClick}
      className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:cursor-pointer hover:bg-slate-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      aria-label="Toggle menu"
    >
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-fuchsia-500/0 transition hover:from-indigo-500/10 hover:to-fuchsia-500/10" />

      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close-icon"
            initial={{
              rotate: -90,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              rotate: 90,
              opacity: 0,
              scale: 0.6,
            }}
            transition={{
              duration: 0.18,
            }}
          >
            <X className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="menu-icon"
            initial={{
              rotate: 90,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              rotate: -90,
              opacity: 0,
              scale: 0.6,
            }}
            transition={{
              duration: 0.18,
            }}
          >
            <Menu className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const NavbarDropdown: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 mt-3 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/30"
    >
      <motion.div variants={dropdownItemVariants} className="mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
          >
            <Settings className="h-4 w-4" />
          </motion.div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
      </motion.div>

      <ThemeToggle />
    </motion.div>
  );
};

export const Navbar: React.FC<Partial<NavbarConfig>> = ({
  title = navbarConfig.title,
  subtitle = navbarConfig.subtitle,
  menuTitle = navbarConfig.menuTitle,
  menuDescription = navbarConfig.menuDescription,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/75"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatedLogo />
            <BrandText title={title} subtitle={subtitle} />
          </div>

          <div className="relative" ref={menuRef}>
            <MenuButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />

            <AnimatePresence>
              {isMenuOpen && (
                <NavbarDropdown
                  title={menuTitle}
                  description={menuDescription}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center font-extrabold text-lg text-blue-700 dark:text-blue-300 tracking-tight select-none">
            <svg className="w-6 h-6 mr-1 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
            Skill & Spell Simulator
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="transition-colors px-3 py-1.5 rounded text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium">
            Home
          </Link>
          <Link href="/status" className="transition-colors px-3 py-1.5 rounded text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium">
            คำนวณ Status
          </Link>
          <a href="#glossary" className="transition-colors px-3 py-1.5 rounded text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium">
            Glossary
          </a>
        </div>
      </div>
    </nav>
  );
}

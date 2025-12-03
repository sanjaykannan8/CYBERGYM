"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ApiKeyModal from "./components/ApiKeyModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showApiModal, setShowApiModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleApiModalOpen = () => {
    setIsMenuOpen(false);
    setShowApiModal(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <title>CyberGym</title>
        <meta name="description" content="CyberGym is a platform for learning and practicing cybersecurity skills." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="navbar">
          <Link href="/" className="navbar-logo" onClick={closeMenu}>
            <Image src="/cyber_trainer_no_bg.png" alt="CyberGym Logo" width={40} height={40} />
            <span>CyberGym</span>
          </Link>
          <button
            className={`navbar-toggle${isMenuOpen ? " is-open" : ""}`}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`navbar-content${isMenuOpen ? " is-open" : ""}`}>
            <div className="navbar-center">
              <Link href="/" className="nav-item" onClick={closeMenu}>
                Home
              </Link>
              <Link href="/Newbattle" className="nav-item" onClick={closeMenu}>
                Challenges
              </Link>
              <a
                href="https://github.com/sanjaykannan8/CYBERGYM"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
                onClick={closeMenu}
              >
                Docs
              </a>
            </div>
            <div className="navbar-links">
              <button className="api-key-btn" onClick={handleApiModalOpen}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
              API Key
            </button>
              <a
                href="https://www.linkedin.com/in/kannan-in/"
                target="_blank"
                rel="noopener noreferrer"
                className="creator-link"
                onClick={() => setIsMenuOpen(false)}
              >
              Creator
            </a>
              <a
                href="https://github.com/sanjaykannan8/CYBERGYM"
                target="_blank"
                rel="noopener noreferrer"
                className="contribute-btn"
                onClick={() => setIsMenuOpen(false)}
              >
              <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              Contribute
            </a>
            </div>
          </div>
        </div>
        {children}
        {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}
      </body>
    </html>
  );
}

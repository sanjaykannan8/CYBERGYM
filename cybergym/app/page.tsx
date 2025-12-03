"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      {/* Glowing Background */}
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>

      {/* Floating Icons */}
      <div className={styles.floatingIcons}>
        {/* Lock */}
        <svg className={styles.float1} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        {/* Shield */}
        <svg className={styles.float2} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        {/* Target/Crosshair */}
        <svg className={styles.float3} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
          <line x1="22" y1="12" x2="18" y2="12"/>
          <line x1="6" y1="12" x2="2" y2="12"/>
          <line x1="12" y1="6" x2="12" y2="2"/>
          <line x1="12" y1="22" x2="12" y2="18"/>
          <circle cx="12" cy="12" r="6"/>
        </svg>
        {/* Server/Database */}
        <svg className={styles.float4} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        {/* Globe/Network */}
        <svg className={styles.float5} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        {/* Code Brackets */}
        <svg className={styles.float6} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
        {/* Bug */}
        <svg className={styles.float7} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
          <path d="M8 2h8M9 9h6M8 13h8M10 17h4"/>
          <path d="M16 9v4a4 4 0 01-8 0V9"/>
          <circle cx="12" cy="6" r="2"/>
          <path d="M7 9l-3-3M17 9l3-3M7 13H4M20 13h-3M7 17l-3 3M17 17l3 3"/>
        </svg>
        {/* Terminal */}
        <svg className={styles.float8} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <polyline points="6 9 10 13 6 17"/>
          <line x1="13" y1="17" x2="18" y2="17"/>
        </svg>
        {/* Key */}
        <svg className={styles.float9} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
          <circle cx="7" cy="7" r="4"/>
          <path d="M10.5 10.5l8 8M16.5 13.5l2 2M21 16l-3-3"/>
        </svg>
        {/* Firewall */}
        <svg className={styles.float10} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
        </svg>
        {/* Binary Code */}
        <svg className={styles.float11} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
          <text x="4" y="10" fontSize="10" fontFamily="monospace">01</text>
          <text x="4" y="20" fontSize="10" fontFamily="monospace">10</text>
        </svg>
        {/* Fingerprint */}
        <svg className={styles.float12} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2">
          <path d="M12 11c0-4.4-3.6-8-8-8M12 11v10M12 11c0-4.4 3.6-8 8-8M12 21c-4.4 0-8-3.6-8-8M20 13c0 4.4-3.6 8-8 8"/>
        </svg>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            AI POWERED TRAINING
          </div>
          <h1 className={styles.title}>
            Master<br/>
            <span className={styles.highlight}>Cybersecurity</span><br/>
            Skills
          </h1>
          <p className={styles.desc}>
            Train on real-world challenges. Deploy containers instantly.<br/>
            Learn by doing with AI-generated scenarios.
          </p>
          
          <div className={styles.ctas}>
            <button className={styles.primary} onClick={() => router.push('/Newbattle')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Start Training
            </button>
            <a href="https://github.com/sanjaykannan8/CYBERGYM" className={styles.secondary} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>10X</div>
              <div className={styles.statText}>Faster</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>AI</div>
              <div className={styles.statText}>Powered</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>∞</div>
              <div className={styles.statText}>Challenges</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.fIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h3>Instant Deploy</h3>
          <p>Launch vulnerable containers in seconds with Docker</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.fIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <h3>AI Generated</h3>
          <p>Unique challenges powered by Google Gemini AI</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.fIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3>Safe Learning</h3>
          <p>Isolated Docker environments for secure practice</p>
        </div>
      </section>

      {/* Credits */}
      <section className={styles.credits}>
        <h2 className={styles.creditsTitle}>Built By</h2>
        
        <div className={styles.creatorsGrid}>
          <div className={styles.creator}>
            <svg className={styles.creatorIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <div className={styles.creatorName}>Sanjay Kannan</div>
            <div className={styles.creatorRole}>Creator & Developer</div>
          </div>

          <div className={styles.divider}>×</div>

          <div className={styles.creator}>
            <svg className={styles.creatorIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <polyline points="22,7 13.5,12 2,7"/>
            </svg>
            <div className={styles.creatorName}>Claude Sonnet 4.5</div>
            <div className={styles.creatorRole}>AI Assistant</div>
          </div>
        </div>

        <div className={styles.footer}>
          <p>© 2025 CyberGym • Open Source</p>
          <div className={styles.links}>
            <a href="https://github.com/sanjaykannan8" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span>•</span>
            <a href="https://github.com/sanjaykannan8/CYBERGYM" target="_blank" rel="noopener noreferrer">Star ⭐</a>
          </div>
        </div>
      </section>
    </div>
  );
}

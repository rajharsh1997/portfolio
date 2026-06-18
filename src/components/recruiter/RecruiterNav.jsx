import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ModeToggle from '../shared/ModeToggle';

const NAV_LINKS = [
  { id: 'intro', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

export default function RecruiterNav({ profile }) {
  const [active, setActive] = useState('intro');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'dark');
  const location = useLocation();
  const isDevMode = location.pathname === '/dev';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const scrollTo = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
    }
  };

  return (
    <nav className="rc-nav">
      <div className="rc-nav__logo" style={{ display: 'flex', alignItems: 'center' }}>
        {isDevMode && (
          <svg viewBox="0 0 40 40" width="22" height="22" style={{ marginRight: '10px', color: 'var(--accent-teal)' }}>
            <rect width="40" height="40" rx="4" fill="currentColor" opacity="0.2" />
            <text x="20" y="27" fontFamily="monospace" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">H</text>
          </svg>
        )}
        {profile?.name ?? 'Harsh Raj'}
      </div>
      
      {!isDevMode && (
        <div className="rc-nav__links">
          {NAV_LINKS.map(l => (
            <button
              key={l.id}
              className={`rc-nav__link${active === l.id ? ' active' : ''}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <div className="rc-nav__right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        {!isDevMode && (
          <button className="rc-contact-link" onClick={() => scrollTo('contact')}>contact-me</button>
        )}
        <button 
          className="theme-toggle" 
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <ModeToggle />
      </div>
    </nav>
  );
}

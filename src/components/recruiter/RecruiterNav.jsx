import { useState, useRef } from 'react';
import ModeToggle from '../shared/ModeToggle';

const NAV_LINKS = [
  { id: 'intro', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

export default function RecruiterNav({ profile }) {
  const [active, setActive] = useState('intro');

  const scrollTo = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
    }
  };

  return (
    <nav className="rc-nav">
      <div className="rc-nav__logo">{profile?.name ?? 'Harsh Raj'}</div>
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
      <div className="rc-nav__right">
        <button className="rc-contact-link" onClick={() => scrollTo('contact')}>contact-me</button>
        <ModeToggle />
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';

export default function TypingText({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!text) return;
    setDisplayed('');
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span className="sw-cursor">|</span>
    </span>
  );
}

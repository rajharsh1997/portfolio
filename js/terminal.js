/**
 * terminal.js — Typing animation for the hero section description
 */
(function () {
  'use strict';

  const text = "Fullstack engineer specializing in backend systems. 6+ years of experience in Java, Spring Boot, AWS, and CI/CD.";
  const el = document.getElementById('typingText');
  if (!el) return;

  let index = 0;
  let isDeleting = false;
  let pauseAtEnd = false;

  function type() {
    if (!isDeleting && index <= text.length) {
      el.textContent = text.substring(0, index);
      index++;
      if (index > text.length) {
        pauseAtEnd = true;
        setTimeout(() => {
          pauseAtEnd = false;
          isDeleting = true;
          type();
        }, 3000);
        return;
      }
      setTimeout(type, 35);
    } else if (isDeleting && index >= 0) {
      el.textContent = text.substring(0, index);
      index--;
      if (index < 0) {
        isDeleting = false;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 15);
    }
  }

  // Start typing after a short delay
  setTimeout(type, 500);
})();
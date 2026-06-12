/**
 * main.js — Entry point. Loads portfolio data and renders the UI.
 */
(function () {
  'use strict';

  let data = null;

  // ===================== UTILITY =====================
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function syntaxHighlight(json) {
    return json
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/: (null)/g, ': <span class="json-null">$1</span>');
  }

  function formatJson(obj) {
    return syntaxHighlight(JSON.stringify(obj, null, 2));
  }

  function createElement(tag, className, innerHTML) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  }

  // ===================== RENDERERS =====================

  function renderAbout(data) {
    const p = data.profile;
    const statsHtml = Object.entries(p.stats).map(([key, val]) =>
      `<div class="sw-stat-card">
        <span class="sw-stat-value">${escapeHtml(val)}</span>
        <span class="sw-stat-label">${escapeHtml(key.charAt(0).toUpperCase() + key.slice(1))}</span>
      </div>`
    ).join('');

    return `
      <div class="sw-about-layout">
        <div>
          <div class="sw-section-title">Response body</div>
          <div class="sw-response-body">
            <div class="sw-response-body__header">
              <span class="sw-response-body__label">Response</span>
              <span class="sw-content-type">application/json</span>
            </div>
            <div class="sw-json-block">
              <pre>${formatJson({
                name: p.name,
                role: p.role,
                location: p.location,
                focus: p.focus,
                open_to: p.open_to,
                tagline: p.tagline
              })}</pre>
            </div>
          </div>
        </div>
        <div class="sw-stats-grid">${statsHtml}</div>
      </div>
    `;
  }

  function renderSkills(data) {
    const skills = data.skills;
    const categories = Object.entries(skills).map(([key, cat]) => {
      const tags = cat.items.map(item =>
        `<span class="sw-skill-tag sw-skill-tag--${cat.color}">${escapeHtml(item)}</span>`
      ).join('');
      return `
        <div class="sw-skill-category">
          <div class="sw-skill-category__header">
            <span class="sw-skill-key">"${escapeHtml(key)}"</span>
            <span class="sw-skill-bracket">:</span>
            <span class="sw-skill-bracket">[</span>
          </div>
          <div class="sw-skill-tags">${tags}</div>
          <div class="sw-skill-bracket" style="padding-left: var(--space-4);">]</div>
        </div>
      `;
    }).join('');

    return `
      <div class="sw-section-title">Response body</div>
      <div class="sw-response-body">
        <div class="sw-response-body__header">
          <span class="sw-response-body__label">Response</span>
          <span class="sw-content-type">application/json</span>
        </div>
        <div class="sw-skills-grid">${categories}</div>
      </div>
    `;
  }

  function renderExperience(data) {
    const exp = data.experience;
    const formattedExp = exp.map(job => ({
      company: job.company,
      role: job.role,
      description: job.highlights.join(" "),
      tech_stack: job.tech_stack
    }));

    return `
      <div class="sw-section-title">Response body</div>
      <div class="sw-response-body">
        <div class="sw-response-body__header">
          <span class="sw-response-body__label">Response</span>
          <span class="sw-content-type">application/json</span>
        </div>
        <div class="sw-json-block">
          <pre>${formatJson(formattedExp)}</pre>
        </div>
      </div>
    `;
  }

  function renderProjects(data) {
    const projects = data.projects;
    const cards = projects.map(p => {
      const statusClass = p.status === 'production' ? 'sw-project-status--production'
        : p.status === 'in-progress' ? 'sw-project-status--progress'
        : 'sw-project-status--archived';
      const tags = p.tech_stack.map(t =>
        `<span class="sw-project-tag">${escapeHtml(t)}</span>`
      ).join('');

      return `
        <div class="sw-project-card">
          <div class="sw-project-card__header">
            <span class="sw-project-name">${escapeHtml(p.name)}</span>
            <span class="sw-project-status ${statusClass}">${escapeHtml(p.status)}</span>
          </div>
          <p class="sw-project-desc">${escapeHtml(p.description)}</p>
          <div class="sw-project-tags">${tags}</div>
          <div class="sw-project-links">
            <a class="sw-project-link" href="${escapeHtml(p.github)}" target="_blank" rel="noopener">🐙 GitHub</a>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="sw-section-title">Response body</div>
      <div class="sw-response-body">
        <div class="sw-response-body__header">
          <span class="sw-response-body__label">Response</span>
          <span class="sw-content-type">application/json</span>
        </div>
        <div class="sw-projects-grid">${cards}</div>
      </div>
    `;
  }

  function renderResume() {
    return `
      <div class="sw-section-title">Response body</div>
      <div class="sw-response-body" style="padding: var(--space-6); text-align: center; background: var(--bg-code);">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--accent-blue)" style="margin-bottom: var(--space-3); opacity: 0.8;">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        <div style="font-family: var(--font-mono); font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-2);">resume@Harsh.docx</div>
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: var(--space-5);">Document Size: 1.5 MB</div>
        <a href="resume@Harsh.docx" download="resume@Harsh.docx" class="sw-trybtn" style="text-decoration: none; margin-bottom: 0; padding: 8px 24px; font-size: 14px; display: inline-flex;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right: 8px;"><path d="M19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
          Download Document
        </a>
      </div>
    `;
  }

  function renderContact() {
    return `
      <div class="sw-contact-layout">
        <div>
          <div class="sw-section-title">Request body</div>
          <div class="sw-response-body" style="margin-bottom: var(--space-4);">
            <div class="sw-response-body__header">
              <span class="sw-response-body__label">Request</span>
              <span class="sw-content-type">application/json</span>
            </div>
            <div class="sw-json-block">
              <pre>${formatJson({
                name: "string (required)",
                email: "string (required, email)",
                subject: "string (required)",
                message: "string (required)"
              })}</pre>
            </div>
          </div>
          <button class="sw-trybtn" id="tryBtn">Try it out</button>
          <form class="sw-form" id="contactForm">
            <div class="sw-form-group">
              <label class="sw-form-label" for="formName">name <span>*</span></label>
              <input class="sw-form-input" id="formName" type="text" placeholder="Your name" required>
            </div>
            <div class="sw-form-group">
              <label class="sw-form-label" for="formEmail">email <span>*</span></label>
              <input class="sw-form-input" id="formEmail" type="email" placeholder="your@email.com" required>
            </div>
            <div class="sw-form-group">
              <label class="sw-form-label" for="formSubject">subject <span>*</span></label>
              <input class="sw-form-input" id="formSubject" type="text" placeholder="Subject" required>
            </div>
            <div class="sw-form-group">
              <label class="sw-form-label" for="formMessage">message <span>*</span></label>
              <textarea class="sw-form-textarea" id="formMessage" placeholder="Your message..." required></textarea>
            </div>
            <button class="sw-execute-btn" id="executeBtn" type="button">
              <span class="sw-spinner" id="spinner"></span>
              Execute
            </button>
          </form>
        </div>
        <div class="sw-response-panel" id="responsePanel">
          <div class="sw-section-title">Curl</div>
          <div class="sw-curl-block" id="curlBlock">curl -X POST https://harsh.dev/api/contact</div>
          <div class="sw-section-title">Response</div>
          <div class="sw-response-body">
            <div class="sw-response-body__header">
              <span class="sw-response-body__label">Response</span>
              <span class="sw-content-type">application/json</span>
            </div>
            <div class="sw-json-block">
              <pre id="responseBody">${formatJson({ status: 200, message: "Waiting for execution..." })}</pre>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ===================== TAG GROUP BUILDER =====================

  const tagGroups = [
    { name: 'about', description: 'Retrieve personal overview and professional summary.', method: 'GET', path: '/me', renderer: renderAbout },
    { name: 'skills', description: 'List technical skills, tools, and certifications.', method: 'GET', path: '/skills', renderer: renderSkills },
    { name: 'experience', description: 'Fetch professional work history and key achievements.', method: 'GET', path: '/experience', renderer: renderExperience },
    { name: 'projects', description: 'Get details of featured backend projects and contributions.', method: 'GET', path: '/projects', renderer: renderProjects },
    { name: 'resume', description: 'Download a copy of my professional resume.', method: 'GET', path: '/resume/download', renderer: renderResume },
    { name: 'contact', description: 'Send a message or inquiry directly to Harsh.', method: 'POST', path: '/contact', renderer: renderContact }
  ];

  function buildTagGroups(data) {
    const container = document.getElementById('mainContent');
    container.innerHTML = '';

    tagGroups.forEach((group, idx) => {
      const methodClass = group.method === 'GET' ? 'method-get' : 'method-post';
      const methodBadgeClass = group.method === 'GET' ? 'sw-method--get' : 'sw-method--post';
      
      const ep = createElement('div', `sw-endpoint ${methodClass}`);
      if (group.name === 'experience') {
        ep.classList.add('is-open');
      }
      ep.style.animationDelay = `${0.05 + idx * 0.05}s`;

      ep.innerHTML = `
        <div class="sw-endpoint__header">
          <span class="sw-method ${methodBadgeClass}">${group.method}</span>
          <span class="sw-path">${group.path}</span>
          <span class="sw-endpoint__summary">${group.description}</span>
          <svg class="sw-endpoint-chevron" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
        <div class="sw-endpoint__body">
          <div class="sw-endpoint__content">
            <div class="sw-response-section" style="${group.name === 'contact' ? 'display:none;' : ''}">
              <div class="sw-response-code">
                <span class="sw-status-badge sw-status--200">200</span>
                <span class="sw-status-desc">OK</span>
              </div>
            </div>
            ${group.renderer(data)}
          </div>
        </div>
      `;
      container.appendChild(ep);
    });
  }

  // ===================== THEME TOGGLE =====================
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.getElementById('themeToggle');
    btn.textContent = saved === 'dark' ? '🌙' : '☀️';
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '🌙' : '☀️';
    });
  }

  // ===================== MODAL =====================
  function initModal() {
    const modal = document.getElementById('authModal');
    const openBtn = document.getElementById('authorizeBtn');
    const closeBtn = document.getElementById('authModalClose');

    openBtn.addEventListener('click', () => modal.classList.add('is-open'));
    closeBtn.addEventListener('click', () => modal.classList.remove('is-open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });
  }

  // ===================== SCROLL EFFECT =====================
  function initScrollEffect() {
    const topbar = document.getElementById('topbar');
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > 50) {
        topbar.style.backdropFilter = 'blur(12px)';
        topbar.style.background = 'var(--topbar-bg)';
        topbar.style.borderBottomColor = 'var(--topbar-border)';
      } else {
        topbar.style.backdropFilter = 'none';
        topbar.style.background = '';
        topbar.style.borderBottomColor = '';
      }
    }, { passive: true });
  }

  // ===================== INIT =====================
  async function init() {
    try {
      const resp = await fetch('data/portfolio.json');
      data = await resp.json();

      // Set header info
      document.getElementById('apiTitle').textContent = data.info.title;
      document.getElementById('versionBadge').textContent = data.info.version;
      document.getElementById('baseUrl').textContent = data.info.baseUrl;

      // Render tag groups
      buildTagGroups(data);

      // Initialize components
      initTheme();
      initModal();
      initScrollEffect();
      Endpoints.init();
      Contact.init();

    } catch (err) {
      console.error('Failed to load portfolio data:', err);
      document.getElementById('mainContent').innerHTML =
        `<div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
          <p style="font-size:18px;margin-bottom:8px;">⚠️ Failed to load portfolio data</p>
          <p>Please ensure <code style="font-family:var(--font-mono);background:var(--bg-elevated);padding:2px 6px;border-radius:4px;">data/portfolio.json</code> is accessible.</p>
        </div>`;
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
import { useState, useEffect } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import EndpointCard from '../components/swagger/EndpointCard';
import JsonBlock, { formatJson } from '../components/swagger/JsonBlock';
import SwaggerContact from '../components/swagger/SwaggerContact';
import TypingText from '../components/swagger/TypingText';
import RecruiterNav from '../components/recruiter/RecruiterNav';
import resumePdf from '../assets/resume@Harsh.pdf';

/* ── Auth Modal ── */
function AuthModal({ open, onClose, profile }) {
  if (!open) return null;
  return (
    <div className={`sw-modal-overlay${open ? ' is-open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sw-modal">
        <div className="sw-modal__header">
          <h2 className="sw-modal__title">🔑 Connect with Me</h2>
          <button className="sw-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="sw-modal-links">
          {[
            { icon: '🐙', label: 'GitHub', value: 'github.com/rajharsh1997', href: profile?.github },
            { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/rajharsh1997', href: profile?.linkedin },
            { icon: '✉', label: 'Email', value: profile?.email, href: `mailto:${profile?.email}` },
            { icon: '📞', label: 'Phone', value: profile?.phone, href: `tel:${profile?.phone?.replace(/\s/g,'')}` },
          ].map(item => (
            <a key={item.label} className="sw-modal-link" href={item.href} target={item.label !== 'Email' && item.label !== 'Phone' ? '_blank' : undefined} rel="noopener">
              <span className="sw-modal-link__icon">{item.icon}</span>
              <span className="sw-modal-link__text">
                <span className="sw-modal-link__label">{item.label}</span>
                <span className="sw-modal-link__value">{item.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── About Panel ── */
function AboutPanel({ data }) {
  const p = data.profile;
  return (
    <div className="sw-about-layout">
      <div>
        <div className="sw-section-title">Response body</div>
        <div className="sw-response-body">
          <div className="sw-response-body__header">
            <span className="sw-response-body__label">Response</span>
            <span className="sw-content-type">application/json</span>
          </div>
          <JsonBlock data={{ name: p.name, role: p.role, location: p.location, focus: p.focus, open_to: p.open_to, tagline: p.tagline }} />
        </div>
      </div>
      <div className="sw-stats-grid">
        {Object.entries(p.stats).map(([k, v]) => (
          <div key={k} className="sw-stat-card">
            <span className="sw-stat-value">{v}</span>
            <span className="sw-stat-label">{k.charAt(0).toUpperCase() + k.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Skills Panel ── */
function SkillsPanel({ skills }) {
  return (
    <div>
      <div className="sw-section-title">Response body</div>
      <div className="sw-response-body">
        <div className="sw-response-body__header">
          <span className="sw-response-body__label">Response</span>
          <span className="sw-content-type">application/json</span>
        </div>
        <div className="sw-skills-grid">
          {Object.entries(skills).map(([key, cat]) => {
            const tags = cat.items.map(item =>
              <span key={item} className={`sw-skill-tag sw-skill-tag--${cat.color}`}>{item}</span>
            );
            return (
              <div key={key} className="sw-skill-category">
                <div className="sw-skill-category__header">
                  <span className="sw-skill-key">"{key}"</span>
                  <span className="sw-skill-bracket">:</span>
                  <span className="sw-skill-bracket">[</span>
                </div>
                <div className="sw-skill-tags">{tags}</div>
                <div className="sw-skill-bracket" style={{ paddingLeft: '16px' }}>]</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Projects Panel ── */
function ProjectsPanel({ projects }) {
  return (
    <div>
      <div className="sw-section-title">Response body</div>
      <div className="sw-response-body">
        <div className="sw-response-body__header">
          <span className="sw-response-body__label">Response</span>
          <span className="sw-content-type">application/json</span>
        </div>
        <div className="sw-projects-grid">
          {projects.map(p => {
            const statusClass = p.status === 'production' ? 'sw-project-status--production' : 'sw-project-status--progress';
            return (
              <div key={p.id} className="sw-project-card">
                <div className="sw-project-card__header">
                  <span className="sw-project-name">{p.name}</span>
                  <span className={`sw-project-status ${statusClass}`}>{p.status}</span>
                </div>
                <p className="sw-project-desc">{p.description}</p>
                <div className="sw-project-tags">
                  {p.tech_stack.map(t => <span key={t} className="sw-project-tag">{t}</span>)}
                </div>
                <a className="sw-project-link" href={p.github} target="_blank" rel="noopener">🐙 GitHub</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Resume Panel ── */
function ResumePanel() {
  return (
    <div className="sw-resume-panel">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--accent-blue)" style={{ margin: '0 auto', opacity: 0.8 }}>
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
      <div className="sw-resume-filename">resume@harsh.pdf</div>
      <div className="sw-resume-size">Document Size: ~63 KB</div>
      <a href={resumePdf} download="resume@harsh.pdf" className="sw-trybtn">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7z" />
        </svg>
        Download Document
      </a>
    </div>
  );
}

/* ── Main Dev Page ── */
export default function DevPage() {
  const { data, loading } = usePortfolioData();
  const [modalOpen, setModalOpen] = useState(false);

  if (loading || !data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        Loading...
      </div>
    );
  }

  const { info, profile, skills, experience, projects } = data;
  const formattedExp = experience.map(job => ({
    company: job.company, role: job.role,
    description: job.highlights.join(' '), tech_stack: job.tech_stack,
  }));

  return (
    <div className="dev-page">
      <RecruiterNav profile={profile} />

      {/* Info Block */}
      <section className="sw-info-block">
        <div className="sw-info-block__inner">
          <div className="sw-info-block__title-row">
            <h1 className="sw-api-title">{info.title}</h1>
            <span className="sw-version-badge">{info.version}</span>
          </div>
          <div className="sw-api-description">
            <TypingText text={info.description} />
          </div>
          <button className="sw-authorize-btn" onClick={() => setModalOpen(true)}>
            🔑 Connect
          </button>
        </div>
      </section>

      {/* Servers Bar */}
      <div className="sw-servers-bar">
        <div className="sw-servers-bar__inner">
          <span className="sw-servers-label">Servers</span>
          <div className="sw-servers-select">
            <span className="sw-server-url">{info.baseUrl}</span>
            <span className="sw-server-tag">{info.version}</span>
          </div>
        </div>
      </div>

      {/* Endpoint Cards */}
      <main className="sw-main">
        <EndpointCard method="GET" path="/me" summary="Retrieve personal overview and professional summary.">
          <AboutPanel data={data} />
        </EndpointCard>

        <EndpointCard method="GET" path="/skills" summary="List technical skills, tools, and certifications.">
          <SkillsPanel skills={skills} />
        </EndpointCard>

        <EndpointCard method="GET" path="/experience" summary="Fetch professional work history and key achievements.">
          <div className="sw-section-title">Response body</div>
          <div className="sw-response-body">
            <div className="sw-response-body__header">
              <span className="sw-response-body__label">Response</span>
              <span className="sw-content-type">application/json</span>
            </div>
            <JsonBlock data={formattedExp} />
          </div>
        </EndpointCard>

        <EndpointCard method="GET" path="/projects" summary="Get details of featured backend projects and contributions.">
          <ProjectsPanel projects={projects} />
        </EndpointCard>

        <EndpointCard method="GET" path="/resume/download" summary="Download a copy of my professional resume.">
          <ResumePanel />
        </EndpointCard>

        <EndpointCard method="POST" path="/contact" summary="Send a message or inquiry directly to Harsh." hideStatus>
          <SwaggerContact />
        </EndpointCard>
      </main>

      <footer className="sw-footer">
        <p>Built with ❤️ using the <a href="https://swagger.io" target="_blank" rel="noopener">Swagger UI</a> API design</p>
        <p style={{ marginTop: '4px' }}>© 2026 Harsh Raj — <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
      </footer>

      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} profile={profile} />
    </div>
  );
}

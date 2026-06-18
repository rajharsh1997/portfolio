import { useState } from 'react';

export default function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('https://formsubmit.co/ajax/rajharsh1997@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _captcha: 'false' }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else throw new Error();
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rc-section" id="section-contact">
      <div className="rc-section-label">contact</div>
      <div className="rc-contact-grid">
        <div className="rc-contact-info">
          <div className="rc-contact-info__lead">
            Let's build something<br />great together.
          </div>
          <p className="rc-contact-info__sub">
            Open to exciting backend, fullstack, and DevOps opportunities.
            Drop me a message and I'll get back to you within 24 hours.
          </p>
          <div className="rc-contact-links">
            <a href={`mailto:${profile?.email}`} className="rc-contact-link-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              {profile?.email}
            </a>
            <a href={profile?.linkedin} target="_blank" rel="noopener" className="rc-contact-link-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              linkedin.com/in/rajharsh1997
            </a>
            <a href={profile?.github} target="_blank" rel="noopener" className="rc-contact-link-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              github.com/rajharsh1997
            </a>
          </div>
        </div>

        <form className="rc-form" onSubmit={submit}>
          <div className="rc-form__group">
            <label className="rc-form__label" htmlFor="rc-name">name *</label>
            <input id="rc-name" name="name" className="rc-form__input" placeholder="Your name" required
              value={form.name} onChange={handle} />
          </div>
          <div className="rc-form__group">
            <label className="rc-form__label" htmlFor="rc-email">email *</label>
            <input id="rc-email" name="email" type="email" className="rc-form__input" placeholder="your@email.com" required
              value={form.email} onChange={handle} />
          </div>
          <div className="rc-form__group">
            <label className="rc-form__label" htmlFor="rc-subject">subject *</label>
            <input id="rc-subject" name="subject" className="rc-form__input" placeholder="Subject" required
              value={form.subject} onChange={handle} />
          </div>
          <div className="rc-form__group">
            <label className="rc-form__label" htmlFor="rc-message">message *</label>
            <textarea id="rc-message" name="message" className="rc-form__textarea" placeholder="Your message..." required
              value={form.message} onChange={handle} />
          </div>
          {status === 'success' && (
            <div className="rc-form__status rc-form__status--success">
              ✓ Message sent! I'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="rc-form__status rc-form__status--error">
              ✗ Something went wrong. Please try again.
            </div>
          )}
          <button type="submit" className="rc-form__submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
}

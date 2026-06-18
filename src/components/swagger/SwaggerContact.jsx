import { useState } from 'react';
import { formatJson, syntaxHighlight } from './JsonBlock';

export default function SwaggerContact() {
  const [active, setActive] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [curlText, setCurlText] = useState('curl -X POST https://harshcodes.vercel.app/contact');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const execute = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert('All fields are required.');
      return;
    }
    setLoading(true);
    setCurlText(
      `curl -X POST https://harshcodes.vercel.app/contact \\\n` +
      `  -H "Content-Type: application/json" \\\n` +
      `  -d '{"name":"${form.name}","email":"${form.email}","subject":"${form.subject}","message":"${form.message}"}'`
    );
    try {
      const res = await fetch('https://formsubmit.co/ajax/rajharsh1997@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _captcha: 'false' }),
      });
      if (res.ok) {
        setResponse({ status: 200, message: 'Message sent successfully!', data: { name: form.name, email: form.email, subject: form.subject } });
      } else throw new Error();
    } catch {
      setResponse({ status: 500, error: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sw-contact-layout">
      <div>
        <div className="sw-section-title">Request body</div>
        <div className="sw-response-body" style={{ marginBottom: '16px' }}>
          <div className="sw-response-body__header">
            <span className="sw-response-body__label">Request</span>
            <span className="sw-content-type">application/json</span>
          </div>
          <div className="sw-json-block">
            <pre dangerouslySetInnerHTML={{ __html: formatJson({ name: 'string (required)', email: 'string (required, email)', subject: 'string (required)', message: 'string (required)' }) }} />
          </div>
        </div>

        <button
          className="sw-trybtn"
          style={{ marginBottom: '16px' }}
          onClick={() => setActive(a => !a)}
        >
          {active ? 'Cancel' : 'Try it out'}
        </button>

        <form className={`sw-form${active ? ' is-active' : ''}`} onSubmit={e => { e.preventDefault(); execute(); }}>
          {['name', 'email', 'subject', 'message'].map(field => (
            <div key={field} className="sw-form-group">
              <label className="sw-form-label" htmlFor={`sw-${field}`}>{field} <span>*</span></label>
              {field === 'message'
                ? <textarea id={`sw-${field}`} name={field} className="sw-form-textarea" placeholder="Your message..." value={form[field]} onChange={handle} required />
                : <input id={`sw-${field}`} name={field} type={field === 'email' ? 'email' : 'text'} className="sw-form-input" placeholder={field === 'email' ? 'your@email.com' : field.charAt(0).toUpperCase() + field.slice(1)} value={form[field]} onChange={handle} required />
              }
            </div>
          ))}
          <button type="submit" className="sw-execute-btn" disabled={loading}>
            <span className={`sw-spinner${loading ? ' is-spinning' : ''}`} />
            Execute
          </button>
        </form>
      </div>

      <div className="sw-response-panel is-visible">
        <div className="sw-section-title">Curl</div>
        <div className="sw-curl-block">{curlText}</div>
        <div className="sw-section-title">Response</div>
        <div className="sw-response-body">
          <div className="sw-response-body__header">
            <span className="sw-response-body__label">Response</span>
            <span className="sw-content-type">application/json</span>
          </div>
          <div className="sw-json-block">
            <pre dangerouslySetInnerHTML={{ __html: formatJson(response ?? { status: 200, message: 'Waiting for execution...' }) }} />
          </div>
        </div>
      </div>
    </div>
  );
}

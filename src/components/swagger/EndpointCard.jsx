import { useState, useRef } from 'react';

export default function EndpointCard({ method, path, summary, children, defaultOpen = false, hideStatus = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const methodClass = method === 'GET' ? 'method-get' : 'method-post';
  const methodBadge = method === 'GET' ? 'sw-method--get' : 'sw-method--post';

  return (
    <div className={`sw-endpoint ${methodClass}${open ? ' is-open' : ''}`}>
      <div className="sw-endpoint__header" onClick={() => setOpen(o => !o)}>
        <span className={`sw-method ${methodBadge}`}>{method}</span>
        <span className="sw-path">{path}</span>
        <span className="sw-endpoint__summary">{summary}</span>
        <svg className="sw-endpoint-chevron" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div className="sw-endpoint__body">
        <div className="sw-endpoint__content">
          {!hideStatus && (
            <div className="sw-response-section" style={{ marginBottom: '12px' }}>
              <div className="sw-response-code">
                <span className="sw-status-badge sw-status--200">200</span>
                <span className="sw-status-desc">OK</span>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

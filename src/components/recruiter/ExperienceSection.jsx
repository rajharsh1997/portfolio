export default function ExperienceSection({ experience }) {
  return (
    <section className="rc-section" id="section-experience">
      <div className="rc-section-label">experience</div>
      <h2 className="rc-section-title">Where I've worked</h2>
      <div className="rc-timeline">
        {experience?.map((job, i) => (
          <div key={i} className="rc-timeline-item">
            <div className="rc-timeline-item__meta">
              <span className="rc-timeline-item__company">{job.company}</span>
              <span className="rc-timeline-item__role">{job.role}</span>
              {job.client && (
                <span className="rc-timeline-item__role" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  · {job.client}
                </span>
              )}
              <span className="rc-timeline-item__duration">{job.duration}</span>
            </div>
            <div className="rc-timeline-item__highlights">
              {job.highlights?.slice(0, 3).map((h, j) => (
                <div key={j} className="rc-timeline-item__highlight">{h}</div>
              ))}
            </div>
            <div className="rc-timeline-item__stack">
              {job.tech_stack?.map(t => (
                <span key={t} className="rc-timeline-item__tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

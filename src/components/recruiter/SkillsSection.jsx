export default function SkillsSection({ skills }) {
  return (
    <section className="rc-section" id="section-skills">
      <div className="rc-section-label">skills</div>
      <h2 className="rc-section-title">Tech stack</h2>
      <div className="rc-skills-grid">
        {skills && Object.entries(skills).map(([key, cat]) => (
          <div key={key} className="rc-skill-category">
            <div className="rc-skill-category__label">{cat.label}</div>
            <div className="rc-skill-tags">
              {cat.items.map(item => (
                <span key={item} className="rc-skill-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

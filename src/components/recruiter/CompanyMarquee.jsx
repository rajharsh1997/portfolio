/* Company logos marquee — inspired by the reference image */
export default function CompanyMarquee({ companies }) {
  const items = companies ?? [];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="rc-marquee-wrapper">
      <div className="rc-marquee rc-marquee--pause">
        {doubled.map((c, i) => (
          <span key={i} className="rc-marquee__item">
            {c}
            <span className="rc-marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

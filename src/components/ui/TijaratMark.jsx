// Original geometric "T" monogram - a bold crossbar over a forward-leaning
// stem, evoking motion/trade. Not derived from any stock asset; designed to
// drop into the existing colored badge (bg-primary-600 etc.) in place of a
// plain "T" character.
export default function TijaratMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 4H21V8H3Z" />
      <path d="M9 8H15L13 20H7Z" />
    </svg>
  );
}

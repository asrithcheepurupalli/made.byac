// Studio nav glyphs — extracted from App.tsx (no behavior change)
export const WorkIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300 transform group-hover:scale-110" fill="currentColor">
    <rect x="25" y="24" width="8" height="52" rx="1" />
    <rect x="33" y="24" width="8" height="8" rx="1" />
    <rect x="33" y="68" width="8" height="8" rx="1" />
    <rect x="67" y="24" width="8" height="52" rx="1" />
    <rect x="59" y="24" width="8" height="8" rx="1" />
    <rect x="59" y="68" width="8" height="8" rx="1" />
    <rect x="46" y="36" width="8" height="28" rx="1" />
  </svg>
);

export const StudioIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 transition-all duration-700 transform group-hover:rotate-180" fill="currentColor">
    <g transform="translate(50,50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <path 
          key={idx}
          d="M 0 0 C 4 -12, 14 -22, 24 -16 C 18 -10, 8 -4, 0 0" 
          transform={`rotate(${angle})`} 
        />
      ))}
      <circle cx="0" cy="0" r="3.5" className="fill-neutral-50 dark:fill-neutral-950" />
    </g>
  </svg>
);

export const ApproachIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300 transform group-hover:scale-110" fill="currentColor">
    <rect x="46" y="55" width="8" height="25" rx="1" />
    <rect x="30" y="20" width="8" height="30" rx="1" />
    <rect x="38" y="45" width="8" height="8" rx="1" />
    <rect x="62" y="20" width="8" height="30" rx="1" />
    <rect x="54" y="45" width="8" height="8" rx="1" />
    <rect x="30" y="15" width="8" height="3" rx="1" />
    <rect x="62" y="15" width="8" height="3" rx="1" />
    <circle cx="50" cy="65" r="2.5" className="fill-neutral-50 dark:fill-neutral-900" />
  </svg>
);

export const ContactIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300 transform group-hover:scale-110" fill="currentColor">
    <rect x="34" y="22" width="32" height="8" rx="1" />
    <rect x="34" y="70" width="32" height="8" rx="1" />
    <rect x="22" y="34" width="8" height="32" rx="1" />
    <rect x="70" y="34" width="8" height="32" rx="1" />
    <rect x="28" y="28" width="6" height="6" rx="1" />
    <rect x="66" y="28" width="6" height="6" rx="1" />
    <rect x="28" y="66" width="6" height="6" rx="1" />
    <rect x="66" y="66" width="6" height="6" rx="1" />
    <circle cx="50" cy="50" r="5" />
  </svg>
);

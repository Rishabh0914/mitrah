import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="Mitraah home"
    >
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blush shadow-soft transition group-hover:-translate-y-0.5">
        <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
          <path
            d="M32 48c-9-5.5-16-11-16-19a8.5 8.5 0 0 1 16-3.2A8.5 8.5 0 0 1 48 29c0 8-7 13.5-16 19Z"
            fill="#E8B4B8"
          />
          <path
            d="M21 30c3.2 0 4.2-3.2 6.4-3.2S30.6 30 33.8 30s4.2-3.2 6.4-3.2"
            fill="none"
            stroke="#A7C7AE"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-600 text-cocoa">Mitraah</span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-rose/80">
          therapy &amp; wellbeing
        </span>
      </span>
    </Link>
  );
}

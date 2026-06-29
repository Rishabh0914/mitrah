import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/what-to-expect", label: "What to Expect" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative font-semibold transition hover:text-rose ${
      isActive ? "text-rose" : "text-cocoa"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-rose/10 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/enquiry" className="btn-primary px-6 py-2.5 text-sm">
            Book an Enquiry
          </NavLink>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl bg-blush/60 text-cocoa md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-rose/10 bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/enquiry"
              className="btn-primary"
              onClick={() => setOpen(false)}
            >
              Book an Enquiry
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

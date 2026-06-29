import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-rose/10 bg-blush/20">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-cocoa/80">
              A calm, judgment-free space to feel heard, understood, and gently
              supported on your journey to wellbeing.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-rose">
                Explore
              </h4>
              <ul className="space-y-2 text-sm text-cocoa/80">
                <li><Link className="hover:text-rose" to="/">Home</Link></li>
                <li><Link className="hover:text-rose" to="/about">About</Link></li>
                <li><Link className="hover:text-rose" to="/what-to-expect">What to Expect</Link></li>
                <li><Link className="hover:text-rose" to="/enquiry">Enquiry</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-rose">
                Reach Out
              </h4>
              <ul className="space-y-2 text-sm text-cocoa/80">
                <li>anoushka@mitrahofficial.com</li>
                <li>+91 98765 43210</li>
                <li>Mon–Sat · 9am–7pm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-rose/10 pt-6 text-center text-xs text-cocoa/60">
          © {new Date().getFullYear()} Mitrah Therapy. Made with care. · If you
          are in crisis, please contact your local emergency services.
        </div>
      </div>
    </footer>
  );
}

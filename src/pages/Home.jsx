import { Link } from "react-router-dom";

const offerings = [
  {
    icon: "🌿",
    title: "Individual Therapy",
    text: "One-on-one sessions tailored to anxiety, stress, low mood, and life transitions.",
    bg: "bg-sage/40",
  },
  {
    icon: "💬",
    title: "Couples & Relationships",
    text: "A safe space to communicate, reconnect, and rebuild trust together.",
    bg: "bg-lavender/50",
  },
  {
    icon: "🌙",
    title: "Stress & Burnout",
    text: "Practical tools to slow down, set boundaries, and restore your energy.",
    bg: "bg-sky/50",
  },
  {
    icon: "🌸",
    title: "Self-Esteem & Growth",
    text: "Gentle, strengths-based work to help you feel more like yourself again.",
    bg: "bg-blush/50",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blush/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-sage/40 blur-3xl" />
        <div className="section grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-rose shadow-soft">
              ✦ A safe space to be heard
            </span>
            <h1 className="mt-6 text-4xl font-600 leading-tight md:text-6xl">
              Gentle support for a
              <span className="text-rose"> calmer mind.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa/80">
              Therapy that meets you where you are. Together we’ll create a warm,
              judgment-free space to understand your feelings and move toward the
              life you want.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/enquiry" className="btn-primary">
                Book an Enquiry
              </Link>
              <Link to="/what-to-expect" className="btn-ghost">
                What to Expect
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-cocoa/70">
              <span>🤍 Confidential</span>
              <span>🌷 Compassionate</span>
              <span>🪷 Non-judgmental</span>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="animate-float card relative mx-auto max-w-sm">
              <div className="grid h-64 place-items-center rounded-4xl bg-gradient-to-br from-blush/60 via-lavender/40 to-sage/50 text-7xl">
                🧘‍♀️
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-rose/30" />
                <div className="h-3 w-full rounded-full bg-sage/40" />
                <div className="h-3 w-2/3 rounded-full bg-lavender/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="section pt-0">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-600 md:text-4xl">How I can help</h2>
          <p className="mt-4 text-cocoa/75">
            Every person and every story is different. Here are some of the areas
            we can explore together.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="card transition hover:-translate-y-1.5 hover:shadow-glow"
            >
              <div
                className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl ${o.bg}`}
              >
                {o.icon}
              </div>
              <h3 className="mt-5 text-xl">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/75">
                {o.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote band */}
      <section className="bg-gradient-to-r from-lavender/40 via-blush/30 to-sage/40">
        <div className="section text-center">
          <p className="mx-auto max-w-3xl font-serif text-2xl leading-relaxed text-cocoa md:text-3xl">
            “You don’t have to have it all figured out to take the first step.
            Healing begins the moment you decide you’re worth it.”
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="card flex flex-col items-center gap-6 bg-white/80 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-600">Ready to begin?</h2>
            <p className="mt-3 max-w-lg text-cocoa/75">
              Reach out with a few details and I’ll get back to you within 1–2
              working days to find a time that suits you.
            </p>
          </div>
          <Link to="/enquiry" className="btn-primary whitespace-nowrap">
            Start your enquiry
          </Link>
        </div>
      </section>
    </>
  );
}

const values = [
  {
    icon: "🤍",
    title: "Empathy first",
    text: "You’ll always be met with warmth, patience, and zero judgment.",
  },
  {
    icon: "🔒",
    title: "Confidential",
    text: "What you share stays between us — your privacy is sacred here.",
  },
  {
    icon: "🌱",
    title: "Evidence-based",
    text: "Approaches grounded in CBT, mindfulness, and person-centred care.",
  },
];

const creds = [
  "M.Sc. in Clinical Psychology",
  "Certified CBT Practitioner",
  "8+ years supporting clients",
  "Member, Counselling Association",
];

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-b from-blush/30 to-cream">
        <div className="section text-center">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-rose shadow-soft">
            About Mitrah
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-600 leading-tight md:text-5xl">
            Hi, I’m Dr. Aanya — and I’m so glad you’re here.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cocoa/80">
            “Mitrah” means friend. That’s exactly the kind of relationship I
            hope to offer — steady, honest, and on your side.
          </p>
        </div>
      </section>

      <section className="section grid items-center gap-12 md:grid-cols-2">
        <div className="card animate-fade-up">
          <div className="grid h-80 place-items-center rounded-4xl bg-gradient-to-br from-sage/50 via-cream to-lavender/50 text-8xl">
            👩‍⚕️
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-600">My approach</h2>
          <p className="mt-5 leading-relaxed text-cocoa/80">
            I believe therapy works best when it feels human. There’s no script
            and no “right” way to feel. We move at your pace, gently unpacking
            what’s weighing on you and discovering tools that genuinely fit your
            life.
          </p>
          <p className="mt-4 leading-relaxed text-cocoa/80">
            Whether you’re navigating anxiety, burnout, grief, or simply feeling
            stuck, my goal is to help you feel a little lighter, a little
            clearer, and a lot more supported.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {creds.map((c) => (
              <div
                key={c}
                className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-cocoa shadow-soft"
              >
                ✓ {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="card text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blush/50 text-3xl">
                {v.icon}
              </div>
              <h3 className="mt-5 text-xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/75">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

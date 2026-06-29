import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    title: "Reach out",
    text: "Fill in the enquiry form with a little about what’s bringing you here. No detail is too small.",
    bg: "bg-blush/40",
  },
  {
    num: "02",
    title: "Free intro call",
    text: "We’ll have a relaxed 15-minute chat to see if we’re a good fit — no pressure, no commitment.",
    bg: "bg-sage/40",
  },
  {
    num: "03",
    title: "First session",
    text: "We gently explore your story, your goals, and what support looks like for you.",
    bg: "bg-lavender/50",
  },
  {
    num: "04",
    title: "Ongoing care",
    text: "Regular sessions at a rhythm that suits you, with tools you can carry into daily life.",
    bg: "bg-sky/50",
  },
];

const faqs = [
  {
    q: "How long is each session?",
    a: "Sessions are 50 minutes and held weekly or fortnightly, depending on what works for you.",
  },
  {
    q: "Are sessions online or in person?",
    a: "Both! You can choose secure video sessions from home or visit the studio in person.",
  },
  {
    q: "Is everything confidential?",
    a: "Yes. Everything you share is private and held with care, within professional ethical guidelines.",
  },
  {
    q: "What if I’ve never done therapy before?",
    a: "That’s completely okay. There’s nothing to prepare — just come as you are.",
  },
];

export default function Expect() {
  return (
    <>
      <section className="bg-gradient-to-b from-sage/30 to-cream">
        <div className="section text-center">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-rose shadow-soft">
            What to Expect
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-600 leading-tight md:text-5xl">
            Your journey, one gentle step at a time
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cocoa/80">
            Starting therapy can feel like a big step. Here’s exactly how it
            works, so there are no surprises — only support.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <div
              key={s.num}
              className="card flex gap-5 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div
                className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-serif text-2xl font-600 text-cocoa ${s.bg}`}
              >
                {s.num}
              </div>
              <div>
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/75">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="section pt-0">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-600 md:text-4xl">Common questions</h2>
          <p className="mt-4 text-cocoa/75">
            A few things people often wonder before getting started.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group card cursor-pointer bg-white/70 py-5"
            >
              <summary className="flex list-none items-center justify-between font-semibold text-cocoa">
                {f.q}
                <span className="text-rose transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/75">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="card flex flex-col items-center gap-6 bg-gradient-to-r from-blush/40 to-lavender/40 text-center">
          <h2 className="text-3xl font-600">Have a question first?</h2>
          <p className="max-w-lg text-cocoa/75">
            That’s what the free intro call is for. Send an enquiry and let’s
            find the right next step together.
          </p>
          <Link to="/enquiry" className="btn-primary">
            Book an Enquiry
          </Link>
        </div>
      </section>
    </>
  );
}

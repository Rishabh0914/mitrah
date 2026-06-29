import { useState } from "react";

const concerns = [
  "Anxiety / Stress",
  "Low mood / Depression",
  "Relationships",
  "Burnout",
  "Grief & Loss",
  "Self-esteem",
  "Not sure yet",
];

const initial = {
  name: "",
  email: "",
  phone: "",
  concern: "",
  format: "Online",
  message: "",
};

// Get a free access key in ~30s at https://web3forms.com (no signup needed).
// Put it in a .env file as VITE_WEB3FORMS_KEY=your-key-here
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

export default function Enquiry() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please tell me your name.";
    if (!form.email.trim()) e.email = "An email helps me reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "That email doesn’t look quite right.";
    if (!form.concern) e.concern = "Pick whatever feels closest.";
    if (!form.message.trim()) e.message = "A sentence or two is perfect.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError("");
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    // No key configured yet — show success without sending (dev fallback).
    if (!ACCESS_KEY) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry from ${form.name} — Mitrah`,
          from_name: "Mitrah Website",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          concern: form.concern,
          format: form.format,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSendError(
          data.message || "Something went wrong. Please try again or email me directly."
        );
      }
    } catch {
      setSendError(
        "Couldn’t send right now. Please check your connection and try again."
      );
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="section">
        <div className="card mx-auto max-w-xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sage/50 text-4xl">
            🌷
          </div>
          <h1 className="mt-6 text-3xl font-600">Thank you, {form.name.split(" ")[0]}!</h1>
          <p className="mt-4 leading-relaxed text-cocoa/80">
            Your enquiry has been received. I’ll get back to you within 1–2
            working days to find a time that works. Take care of yourself until
            then. 🤍
          </p>
          <button
            className="btn-ghost mt-8"
            onClick={() => {
              setForm(initial);
              setSubmitted(false);
            }}
          >
            Send another enquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-lavender/30 to-cream">
        <div className="section pb-10 text-center">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-rose shadow-soft">
            Enquiry Form
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-600 leading-tight md:text-5xl">
            Let’s take the first step together
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cocoa/80">
            Share a few details below. Everything is confidential, and there’s no
            obligation — just an open door whenever you’re ready.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="card mx-auto max-w-2xl bg-white/80"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Your name"
              name="name"
              value={form.name}
              onChange={update}
              error={errors.name}
              placeholder="Jane Doe"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              error={errors.email}
              placeholder="jane@email.com"
            />
            <Field
              label="Phone (optional)"
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="+91 90000 00000"
            />
            <div>
              <Label>What’s on your mind?</Label>
              <select
                name="concern"
                value={form.concern}
                onChange={update}
                className={inputClass(errors.concern)}
              >
                <option value="">Select an option…</option>
                {concerns.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.concern && <ErrorText>{errors.concern}</ErrorText>}
            </div>
          </div>

          <div className="mt-6">
            <Label>Preferred session format</Label>
            <div className="mt-2 flex flex-wrap gap-3">
              {["Online", "In person", "Either"].map((f) => (
                <label
                  key={f}
                  className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition ${
                    form.format === f
                      ? "border-rose bg-rose text-white"
                      : "border-rose/30 text-cocoa hover:bg-blush/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={f}
                    checked={form.format === f}
                    onChange={update}
                    className="sr-only"
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Label>How can I support you?</Label>
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              rows={4}
              placeholder="Share as much or as little as you’d like…"
              className={inputClass(errors.message)}
            />
            {errors.message && <ErrorText>{errors.message}</ErrorText>}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? "Sending…" : "Send my enquiry"}
          </button>
          {sendError && (
            <p className="mt-3 text-center text-sm text-rose">{sendError}</p>
          )}
          <p className="mt-4 text-center text-xs text-cocoa/60">
            🔒 Your information is kept private and never shared.
          </p>
        </form>
      </section>
    </>
  );
}

function inputClass(error) {
  return `mt-2 w-full rounded-2xl border bg-cream/60 px-4 py-3 text-cocoa outline-none transition placeholder:text-cocoa/40 focus:ring-2 focus:ring-rose/40 ${
    error ? "border-rose/70" : "border-rose/20"
  }`;
}

function Label({ children }) {
  return (
    <label className="text-sm font-semibold text-cocoa">{children}</label>
  );
}

function ErrorText({ children }) {
  return <p className="mt-1.5 text-xs text-rose">{children}</p>;
}

function Field({ label, name, value, onChange, error, type = "text", placeholder }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass(error)}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

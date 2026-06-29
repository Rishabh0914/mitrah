import { useState } from "react";

// Get a free access key in ~30s at https://web3forms.com (no signup needed).
// Put it in a .env file as VITE_WEB3FORMS_KEY=your-key-here
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

const WHATSAPP = "+91 98930 49810";
const LINKTREE = "https://linktr.ee/anoushkaacharya";

const genderOptions = [
  "Woman",
  "Man",
  "Non-Binary / Gender Non-Conforming",
  "Prefer not to say",
  "Other",
];
const yesNo = ["Yes", "No"];
const healthOptions = ["Yes", "No", "Other"];
const safetyOptions = [
  "No",
  "Yes — in the past, but not currently",
  "Yes — I am currently experiencing these thoughts",
];
const sessionPreferenceOptions = [
  "Online via Google Meet — available to all clients",
  "In person in Indore, Madhya Pradesh — India-based clients only",
];
const feeOptions = [
  "₹2,000 per session (Online)",
  "₹2,100 per session (Online)",
  "₹2,200 per session (Online)",
  "₹2,300 per session (In-Person, Indore only)",
  "₹2,400 per session (In-Person, Indore only)",
  "₹2,500 per session (In-Person, Indore only)",
];
const dayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday (first half of the day only)",
];
const timeOptions = [
  "Morning · 10 AM–12 PM IST",
  "Afternoon · 2 PM–4 PM IST",
  "Evening · 4 PM–6 PM IST",
];

const initial = {
  // Section 1 — About You
  email: "",
  fullName: "",
  age: "",
  gender: "",
  genderOther: "",
  phone: "",
  country: "",
  city: "",
  occupation: "",
  // Section 2 — How did you hear about me
  hearAbout: "",
  // Section 3 — What brings you here
  brings: "",
  // Section 4 — A little more context
  therapyBefore: "",
  diagnosis: "",
  diagnosisDetail: "",
  medication: "",
  healthConditions: "",
  healthOther: "",
  healthDetail: "",
  // Section 5 — Safety
  safety: "",
  safetyContext: "",
  // Section 6 — Availability
  sessionPreference: "",
  sessionFee: "",
  days: [],
  timeBlocks: [],
  // Section 7 — Emergency contact
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelationship: "",
};

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

  const toggleArray = (name, value) => {
    setForm((f) => {
      const set = new Set(f[name]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...f, [name]: [...set] };
    });
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    const req = (k, msg) => {
      if (!String(form[k]).trim()) e[k] = msg;
    };

    req("email", "Please share your email.");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "That email doesn’t look quite right.";
    req("fullName", "Please share your full name.");
    req("age", "Please enter your age.");
    req("gender", "Please choose an option.");
    if (form.gender === "Other" && !form.genderOther.trim())
      e.genderOther = "Please specify.";
    req("phone", "A WhatsApp number helps me reach you.");
    req("country", "Please share your country.");
    req("city", "Please share your city / state.");
    req("occupation", "Please share your occupation.");
    req("hearAbout", "Please let me know how you found me.");
    req("brings", "A sentence or two is perfect.");
    req("therapyBefore", "Please choose an option.");
    req("diagnosis", "Please choose an option.");
    req("medication", "Please choose an option.");
    req("healthConditions", "Please choose an option.");
    if (form.healthConditions === "Other" && !form.healthOther.trim())
      e.healthOther = "Please specify.";
    req("safety", "Please choose an option.");
    req("sessionPreference", "Please choose a session preference.");
    if (!form.days.length) e.days = "Please pick at least one day.";
    if (!form.timeBlocks.length) e.timeBlocks = "Please pick at least one time.";
    req("emergencyName", "Please share a name.");
    req("emergencyPhone", "Please share a phone number.");
    req("emergencyRelationship", "Please share the relationship.");
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError("");
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      const firstKey = Object.keys(found)[0];
      document
        .querySelector(`[name="${firstKey}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New waitlist enquiry — ${form.fullName}`,
      from_name: "Mitrah Website",
      "Email": form.email,
      "Full name": form.fullName,
      "Age": form.age,
      "Gender": form.gender === "Other" ? `Other: ${form.genderOther}` : form.gender,
      "Phone (WhatsApp)": form.phone,
      "Country": form.country,
      "City / State": form.city,
      "Occupation": form.occupation,
      "How did you hear about me": form.hearAbout,
      "What brings you to therapy": form.brings,
      "Been in therapy before": form.therapyBefore,
      "Prior/current diagnosis": form.diagnosis,
      "Diagnosis details": form.diagnosisDetail || "—",
      "Taking psychiatric medication": form.medication,
      "Significant health conditions":
        form.healthConditions === "Other"
          ? `Other: ${form.healthOther}`
          : form.healthConditions,
      "Health details": form.healthDetail || "—",
      "Safety — self-harm thoughts": form.safety,
      "Safety — additional context": form.safetyContext || "—",
      "Session preference": form.sessionPreference,
      "Preferred session fee": form.sessionFee || "Not specified",
      "Available days": form.days.join(", "),
      "Preferred time blocks": form.timeBlocks.join(", "),
      "Emergency contact — name": form.emergencyName,
      "Emergency contact — phone": form.emergencyPhone,
      "Emergency contact — relationship": form.emergencyRelationship,
    };

    if (!ACCESS_KEY) {
      // No key configured yet — show success without sending (dev fallback).
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
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSendError(
          data.message ||
            "Something went wrong. Please try again or message me on WhatsApp."
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
          <h1 className="mt-6 text-3xl font-600">
            Thank you, {form.fullName.split(" ")[0]}!
          </h1>
          <p className="mt-4 leading-relaxed text-cocoa/80">
            Your details have been received and added to the waitlist. I’ll
            review your submission and reach out personally once a suitable slot
            becomes available. Take good care of yourself until then. 🤍
          </p>
          <p className="mt-4 text-sm text-cocoa/70">
            If anything feels urgent in the meantime, you can message me on
            WhatsApp at {WHATSAPP}.
          </p>
          <button
            className="btn-ghost mt-8"
            onClick={() => {
              setForm(initial);
              setSubmitted(false);
              window.scrollTo(0, 0);
            }}
          >
            Submit another response
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Intro */}
      <section className="bg-gradient-to-b from-lavender/30 to-cream">
        <div className="section pb-10 text-center">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-rose shadow-soft">
            Therapy Waitlist Form
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-600 leading-tight md:text-5xl">
            Let’s take the first step together
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cocoa/80">
            Taking the step to reach out for support takes real courage — and
            I’m so glad you’re here.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto max-w-2xl">
          {/* Intro notes */}
          <div className="card mb-8 space-y-4 bg-white/70 text-sm leading-relaxed text-cocoa/80">
            <p>
              This form takes about <strong>5–8 minutes</strong> to fill out. It
              gives me a sense of who you are and what you’re looking for, so
              that when a slot becomes available, I can reach out and we can take
              the next steps together.
            </p>
            <p>
              My sessions operate on a <strong>sliding scale</strong>, with
              separate fee ranges for online and in-person sessions. You’ll be
              asked to indicate your preferred fee range below.
            </p>
            <p className="rounded-2xl bg-blush/30 p-4">
              ⚠️ Completing this form does not confirm a therapy session or
              establish a therapist–client relationship. It’s part of the
              initial consultation process. I’ll contact you personally once
              I’ve reviewed your submission.
            </p>
            <p>
              You can learn more about me and my work here:{" "}
              <a
                href={LINKTREE}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-rose underline"
              >
                {LINKTREE.replace("https://", "")}
              </a>
            </p>
            <p>
              If you have any questions before or while filling this form, please
              reach out on WhatsApp: <strong>{WHATSAPP}</strong>.
            </p>
            <p className="rounded-2xl bg-sand/50 p-4">
              ⚠️ If you are <strong>under 18 years of age</strong> (or the
              applicable age of consent in your country), this form must be
              completed by your parent or legal guardian.
            </p>
            <p className="text-xs text-cocoa/60">
              <span className="text-rose">*</span> Indicates a required question
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Section 1 */}
            <FormSection title="About You">
              <Field label="Email address" name="email" type="email" required
                value={form.email} onChange={update} error={errors.email}
                placeholder="you@email.com" />
              <Field label="Full name" name="fullName" required
                value={form.fullName} onChange={update} error={errors.fullName}
                placeholder="Your full name" />
              <Field label="Age in years" name="age" type="number" required
                value={form.age} onChange={update} error={errors.age}
                placeholder="e.g. 28" />
              <RadioGroup label="Gender" name="gender" required
                options={genderOptions} value={form.gender}
                onChange={update} error={errors.gender} />
              {form.gender === "Other" && (
                <Field label="Please specify" name="genderOther"
                  value={form.genderOther} onChange={update}
                  error={errors.genderOther} placeholder="Self-describe" />
              )}
              <Field label="Phone number — WhatsApp" name="phone" required
                value={form.phone} onChange={update} error={errors.phone}
                placeholder="+91 90000 00000" />
              <Field label="Country of residence" name="country" required
                value={form.country} onChange={update} error={errors.country}
                placeholder="e.g. India" />
              <Field label="Current city / state" name="city" required
                value={form.city} onChange={update} error={errors.city}
                placeholder="e.g. Indore, Madhya Pradesh" />
              <Field label="Current occupation" name="occupation" required
                value={form.occupation} onChange={update}
                error={errors.occupation} placeholder="e.g. Student, Designer" />
            </FormSection>

            {/* Section 2 */}
            <FormSection
              title="How Did You Hear About Me?"
              description="If a person referred you, please share their name — this is for record-keeping only and remains confidential. If via social media, please mention the platform (e.g., Instagram, LinkedIn)."
            >
              <Field label="How did you hear about me?" name="hearAbout" required
                value={form.hearAbout} onChange={update}
                error={errors.hearAbout} placeholder="Referral name or platform" />
            </FormSection>

            {/* Section 3 */}
            <FormSection
              title="What Brings You Here?"
              description="Please share a brief summary (2–3 sentences) of what you’d like to focus on in therapy. This helps me understand your needs and confirm I’m the right fit to support you."
            >
              <TextArea label="What brings you to therapy at this time?"
                name="brings" required value={form.brings} onChange={update}
                error={errors.brings}
                placeholder="e.g. “Difficulty managing anxiety and panic attacks”, “Navigating a difficult life transition”, “Feeling low, unmotivated, and disconnected from myself”…" />
            </FormSection>

            {/* Section 4 */}
            <FormSection
              title="A Little More Context"
              description="These questions help me understand your situation more fully. Please answer as honestly as you feel comfortable. All information is strictly confidential."
            >
              <RadioGroup label="Have you been in therapy before?"
                name="therapyBefore" required options={yesNo}
                value={form.therapyBefore} onChange={update}
                error={errors.therapyBefore} inline />
              <RadioGroup label="Do you have any prior or current mental health diagnosis?"
                name="diagnosis" required options={yesNo}
                value={form.diagnosis} onChange={update}
                error={errors.diagnosis} inline />
              {form.diagnosis === "Yes" && (
                <Field label="If yes, could you share a little about it?"
                  name="diagnosisDetail" value={form.diagnosisDetail}
                  onChange={update} placeholder="Optional" />
              )}
              <RadioGroup label="Are you currently taking any psychiatric medication?"
                name="medication" required options={yesNo}
                value={form.medication} onChange={update}
                error={errors.medication} inline />
              <RadioGroup label="Do you have any significant health conditions I should be aware of?"
                name="healthConditions" required options={healthOptions}
                value={form.healthConditions} onChange={update}
                error={errors.healthConditions} inline />
              {form.healthConditions === "Other" && (
                <Field label="Please specify" name="healthOther"
                  value={form.healthOther} onChange={update}
                  error={errors.healthOther} placeholder="Self-describe" />
              )}
              {(form.healthConditions === "Yes" ||
                form.healthConditions === "Other") && (
                <TextArea label="If yes, could you share a little about those health conditions?"
                  name="healthDetail" value={form.healthDetail}
                  onChange={update} placeholder="Optional" />
              )}
            </FormSection>

            {/* Crisis note */}
            <div className="card space-y-3 border border-sageDeep/40 bg-sage/20 text-sm leading-relaxed text-cocoa/85">
              <p className="font-semibold text-cocoa">
                ⚠️ A note before you continue
              </p>
              <p>
                The next question is a standard part of any clinical intake and
                is asked out of care, not judgment. If you are in crisis right
                now, please don’t wait for a response from this form — support is
                available immediately.
              </p>
              <p className="font-semibold text-cocoa">🟢 Crisis Support (India)</p>
              <ul className="space-y-1">
                <li>Tele Manas (Ministry of Health): 14416</li>
                <li>iCall: 022-25521111</li>
                <li>Vandrevala Foundation: +91 7304599836</li>
                <li>
                  Emergency Services: 112 ·{" "}
                  <a className="underline" target="_blank" rel="noreferrer"
                    href="https://www.iasp.info/resources/Crisis_Centres/">
                    International crisis centres
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <FormSection title="Safety">
              <RadioGroup label="Have you ever had thoughts of ending your life or harming yourself?"
                name="safety" required options={safetyOptions}
                value={form.safety} onChange={update} error={errors.safety} />
              {form.safety.startsWith("Yes") && (
                <TextArea label="If yes, please share any additional context you feel comfortable providing."
                  name="safetyContext" value={form.safetyContext}
                  onChange={update}
                  placeholder="For example — approximate timeframe, whether you have acted on these thoughts. There’s no pressure to share more than you’re comfortable with." />
              )}
            </FormSection>

            {/* Section 6 */}
            <FormSection title="Your Availability">
              <RadioGroup label="Session preference" name="sessionPreference"
                required options={sessionPreferenceOptions}
                value={form.sessionPreference} onChange={update}
                error={errors.sessionPreference} />
              <RadioGroup
                label="Session fee"
                description="Your chosen fee will not affect the quality of care you receive. Choosing a higher amount within the range helps keep lower-fee slots available for those with greater financial constraints. If the range is beyond your current means, please reach out before submitting."
                name="sessionFee" options={feeOptions}
                value={form.sessionFee} onChange={update} />
              <CheckboxGroup label="Days of the week" name="days" required
                options={dayOptions} values={form.days}
                onToggle={toggleArray} error={errors.days} />
              <CheckboxGroup label="Preferred time blocks" name="timeBlocks"
                required options={timeOptions} values={form.timeBlocks}
                onToggle={toggleArray} error={errors.timeBlocks} />
            </FormSection>

            {/* Section 7 */}
            <FormSection
              title="Emergency Contact"
              description="Please share the details of one person I can contact in the event of a safety concern during our sessions. Your emergency contact will only be reached if your safety is at immediate risk during a session and I’m unable to reach you directly."
            >
              <Field label="Name of emergency contact" name="emergencyName"
                required value={form.emergencyName} onChange={update}
                error={errors.emergencyName} placeholder="Full name" />
              <Field label="Phone number" name="emergencyPhone" required
                value={form.emergencyPhone} onChange={update}
                error={errors.emergencyPhone} placeholder="+91 90000 00000" />
              <Field label="Relationship to you" name="emergencyRelationship"
                required value={form.emergencyRelationship} onChange={update}
                error={errors.emergencyRelationship}
                placeholder="e.g. Parent, Partner, Friend" />
            </FormSection>

            <div className="card bg-white/80">
              <button type="submit" disabled={sending}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
                {sending ? "Sending…" : "Submit my response"}
              </button>
              {sendError && (
                <p className="mt-3 text-center text-sm text-rose">{sendError}</p>
              )}
              <p className="mt-4 text-center text-xs text-cocoa/60">
                🔒 Your information is kept strictly private and confidential.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

/* ---------- Reusable UI ---------- */

function inputClass(error) {
  return `mt-2 w-full rounded-2xl border bg-cream/60 px-4 py-3 text-cocoa outline-none transition placeholder:text-cocoa/40 focus:ring-2 focus:ring-rose/40 ${
    error ? "border-rose/70" : "border-rose/20"
  }`;
}

function Label({ children, required }) {
  return (
    <label className="text-sm font-semibold text-cocoa">
      {children}
      {required && <span className="text-rose"> *</span>}
    </label>
  );
}

function ErrorText({ children }) {
  return <p className="mt-1.5 text-xs text-rose">{children}</p>;
}

function FormSection({ title, description, children }) {
  return (
    <div className="card bg-white/80">
      <h2 className="text-2xl font-600">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-cocoa/70">
          {description}
        </p>
      )}
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = "text", placeholder, required }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
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

function TextArea({ label, name, value, onChange, error, placeholder, required }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className={inputClass(error)}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function RadioGroup({ label, description, name, options, value, onChange, error, required, inline }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      {description && (
        <p className="mt-1 text-xs leading-relaxed text-cocoa/65">
          {description}
        </p>
      )}
      <div className={`mt-3 ${inline ? "flex flex-wrap gap-3" : "space-y-2"}`}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition ${
                active
                  ? "border-rose bg-blush/30 font-semibold text-cocoa"
                  : "border-rose/20 text-cocoa/80 hover:bg-blush/20"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={active}
                onChange={onChange}
                className="h-4 w-4 accent-rose"
              />
              {opt}
            </label>
          );
        })}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function CheckboxGroup({ label, name, options, values, onToggle, error, required }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="mt-3 space-y-2">
        {options.map((opt) => {
          const active = values.includes(opt);
          return (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition ${
                active
                  ? "border-rose bg-blush/30 font-semibold text-cocoa"
                  : "border-rose/20 text-cocoa/80 hover:bg-blush/20"
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={opt}
                checked={active}
                onChange={() => onToggle(name, opt)}
                className="h-4 w-4 accent-rose"
              />
              {opt}
            </label>
          );
        })}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

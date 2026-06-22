"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

/* ─────────────────────────── ANIMATED COUNTER ─────────────────────────── */
function useCounter(end: number, duration = 2000, suffix = "") {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, display: `${value}${suffix}` };
}

/* ─────────────────────────── REVEAL ON SCROLL ─────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-hidden");
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-void overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop"
        alt="Crossfit gym interior with equipment and weights"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/90 via-[#000000]/75 to-[#000000]/85" />

      {/* Faint diagonal lines background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Text side */}
          <div className="flex flex-col justify-center pt-20 md:pt-0">
            <h1 className="font-display text-hero text-stark leading-[0.85] tracking-tight">
              GRIT
            </h1>
            <div className="bar-accent-thick my-4 animate-bar-grow" />
            <p className="font-display text-hero-sub text-signal tracking-[0.2em] uppercase">
              Athletics
            </p>
            <p className="font-body text-muted text-lg md:text-xl mt-6 max-w-md leading-relaxed">
              Tucson&apos;s hardest-working gym.
            </p>
            <a
              href="#free-trial"
              className="inline-block mt-10 bg-signal text-void font-display text-2xl tracking-wider px-10 py-4 hover:bg-stark transition-colors duration-200 w-fit"
            >
              START YOUR FREE WEEK
            </a>
          </div>

          {/* Image placeholder side */}
          <div className="hidden md:block">
            <div className="img-placeholder w-full aspect-[3/4] relative">
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-void to-transparent z-10" />
              <div className="absolute top-6 right-6 font-display text-6xl text-signal/10 z-10">
                EST. 2019
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS BAR
   ═══════════════════════════════════════════════════════════════════════════ */
function StatsBar() {
  const members = useCounter(500, 2000, "+");
  const classes = useCounter(12, 1500, "");

  return (
    <section className="bg-void border-y-2 border-border">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3">
        {/* Members */}
        <div
          ref={members.ref}
          className="flex flex-col items-center justify-center py-16 md:py-20 border-b md:border-b-0 md:border-r border-border"
        >
          <span className="font-display text-massive text-signal counter-glow">
            {members.display}
          </span>
          <span className="font-display text-xl tracking-[0.3em] text-muted uppercase mt-2">
            Members
          </span>
        </div>

        {/* Daily Classes */}
        <div
          ref={classes.ref}
          className="flex flex-col items-center justify-center py-16 md:py-20 border-b md:border-b-0 md:border-r border-border"
        >
          <span className="font-display text-massive text-signal counter-glow">
            {classes.display}
          </span>
          <span className="font-display text-xl tracking-[0.3em] text-muted uppercase mt-2">
            Daily Classes
          </span>
        </div>

        {/* First Class */}
        <div className="flex flex-col items-center justify-center py-16 md:py-20">
          <span className="font-display text-massive text-signal counter-glow">
            6AM
          </span>
          <span className="font-display text-xl tracking-[0.3em] text-muted uppercase mt-2">
            First Class
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRAMS BENTO
   ═══════════════════════════════════════════════════════════════════════════ */
const programs = [
  {
    name: "CrossFit",
    desc: "Constantly varied, high intensity.",
    featured: false,
  },
  {
    name: "Strength & Conditioning",
    desc: "Build raw power and resilience.",
    featured: false,
  },
  {
    name: "HIIT / Cardio",
    desc: "Burn everything. Leave nothing.",
    featured: false,
  },
  {
    name: "Open Gym",
    desc: "Your program. Our equipment.",
    featured: false,
  },
  {
    name: "Personal Training",
    desc: "One-on-one. Zero excuses.",
    featured: false,
  },
  {
    name: "Foundations",
    desc: "Your 4-week launchpad into Grit.",
    featured: true,
  },
];

function Programs() {
  const reveal = useReveal();

  return (
    <section className="bg-void py-24 md:py-32" id="programs">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={reveal}>
          <p className="font-display text-sm tracking-[0.4em] text-signal uppercase mb-2">
            What We Do
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-stark mb-12">
            PROGRAMS
          </h2>

          <div className="bento-grid">
            {programs.map((p, i) => (
              <div
                key={p.name}
                className={`group relative img-placeholder flex flex-col justify-end p-6 md:p-8 min-h-[240px] ${
                  i === 0 ? "min-h-[400px] md:min-h-[500px]" : ""
                } ${
                  p.featured ? "!border-2 !border-signal" : ""
                } hover:bg-concrete/80 transition-colors duration-300`}
              >
                {p.featured && (
                  <span className="absolute top-4 right-4 bg-signal text-void font-display text-xs tracking-[0.2em] px-3 py-1">
                    START HERE
                  </span>
                )}
                <div className="relative z-10">
                  <h3 className="font-display text-3xl md:text-4xl text-stark group-hover:text-signal transition-colors duration-200">
                    {p.name.toUpperCase()}
                  </h3>
                  <p className="font-body text-muted text-sm mt-2">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCHEDULE STRIP
   ═══════════════════════════════════════════════════════════════════════════ */
const schedule = [
  { time: "6:00 AM", name: "CrossFit" },
  { time: "7:00 AM", name: "HIIT" },
  { time: "9:00 AM", name: "Open Gym" },
  { time: "12:00 PM", name: "Strength" },
  { time: "4:30 PM", name: "CrossFit" },
  { time: "5:30 PM", name: "HIIT" },
  { time: "7:00 PM", name: "Open Gym" },
];

function Schedule() {
  return (
    <section className="bg-concrete border-y-2 border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6">
        <p className="font-display text-xs tracking-[0.4em] text-muted uppercase mb-4">
          Today&apos;s Schedule
        </p>
      </div>
      <div className="schedule-strip pb-6 px-6 md:px-12">
        {schedule.map((s, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-4 border border-border px-6 py-4 mr-[2px] hover:border-signal hover:bg-void/50 transition-all duration-200 group cursor-default"
          >
            <span className="font-display text-2xl md:text-3xl text-signal group-hover:text-stark transition-colors">
              {s.time}
            </span>
            <span className="font-display text-lg md:text-xl tracking-wider text-stark uppercase">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COACHES
   ═══════════════════════════════════════════════════════════════════════════ */
const coaches = [
  {
    name: "Jake Moreno",
    certs: "CF-L3, USAW-L1, CSCS",
    specialty: "Olympic Lifting & Competition Prep",
  },
  {
    name: "Ava Reyes",
    certs: "CF-L2, NASM-CPT, FRC",
    specialty: "Mobility & Functional Movement",
  },
  {
    name: "Marcus Cole",
    certs: "CF-L2, ISSA, Precision Nutrition",
    specialty: "Strength Programming & Nutrition",
  },
];

function Coaches() {
  const reveal = useReveal();

  return (
    <section className="bg-void py-24 md:py-32" id="coaches">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12" ref={reveal}>
        <p className="font-display text-sm tracking-[0.4em] text-signal uppercase mb-2">
          Your Coaches
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-stark mb-12">
          THE TEAM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {coaches.map((c) => (
            <div
              key={c.name}
              className="group bg-concrete hover:bg-border transition-colors duration-300"
            >
              <div className="img-placeholder w-full aspect-[3/4]" />
              <div className="p-6 md:p-8">
                <h3 className="font-display text-3xl text-stark group-hover:text-signal transition-colors">
                  {c.name.toUpperCase()}
                </h3>
                <p className="font-body text-xs tracking-[0.2em] text-signal mt-1 uppercase">
                  {c.certs}
                </p>
                <div className="bar-accent mt-4 mb-3" style={{ maxWidth: 60 }} />
                <p className="font-body text-muted text-sm">{c.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIAL
   ═══════════════════════════════════════════════════════════════════════════ */
function Testimonial() {
  const reveal = useReveal();

  return (
    <section className="bg-void border-y-2 border-border py-24 md:py-32">
      <div
        className="max-w-[1000px] mx-auto px-6 md:px-12 text-center"
        ref={reveal}
      >
        {/* Giant quote marks */}
        <span
          className="font-display text-[8rem] md:text-[12rem] text-signal leading-none block select-none"
          aria-hidden="true"
          style={{ lineHeight: 0.6, marginBottom: "-1rem" }}
        >
          &ldquo;
        </span>
        <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl text-stark leading-tight tracking-tight">
          GRIT CHANGED MY LIFE. DOWN 40LBS, PR&apos;D MY DEADLIFT, AND FOUND A
          COMMUNITY THAT ACTUALLY GIVES A DAMN.
        </blockquote>
        <div className="bar-accent mx-auto mt-8 mb-4" />
        <cite className="font-body text-muted text-lg not-italic tracking-wide">
          &mdash; Sarah M., Member since 2021
        </cite>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════════════════════════════════ */
const tiers = [
  {
    name: "Drop-In",
    price: "$25",
    unit: "/class",
    featured: false,
    features: [
      "Single class access",
      "All class types",
      "No commitment",
      "Locker & towel included",
    ],
  },
  {
    name: "Unlimited",
    price: "$150",
    unit: "/mo",
    featured: true,
    features: [
      "Unlimited classes",
      "Open gym access",
      "Member programming app",
      "Priority booking",
      "Community events",
    ],
  },
  {
    name: "Foundations",
    price: "$200",
    unit: " (4 weeks)",
    featured: false,
    features: [
      "4-week intro program",
      "8 coached sessions",
      "Movement assessment",
      "Nutrition kickstart guide",
      "Seamless transition to Unlimited",
    ],
  },
];

function Pricing() {
  const reveal = useReveal();

  return (
    <section className="bg-void py-24 md:py-32" id="pricing">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12" ref={reveal}>
        <p className="font-display text-sm tracking-[0.4em] text-signal uppercase mb-2">
          Membership
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-stark mb-12">
          PRICING
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col bg-concrete p-8 md:p-10 ${
                t.featured
                  ? "border-2 border-signal relative"
                  : "border border-border"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-px left-0 right-0 h-[4px] bg-signal" />
              )}
              {t.featured && (
                <span className="inline-block bg-signal text-void font-display text-xs tracking-[0.2em] px-3 py-1 mb-4 w-fit">
                  MOST POPULAR
                </span>
              )}
              <h3 className="font-display text-3xl tracking-wider text-stark uppercase">
                {t.name}
              </h3>
              <div className="mt-4 mb-6">
                <span className="font-display text-6xl md:text-7xl text-signal">
                  {t.price}
                </span>
                <span className="font-body text-muted text-lg ml-1">
                  {t.unit}
                </span>
              </div>
              <ul className="flex-1 space-y-3 mb-8">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="font-body text-sm text-muted flex items-start gap-3"
                  >
                    <span className="text-signal mt-0.5 text-xs">&#9646;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#free-trial"
                className={`block text-center font-display text-xl tracking-wider py-4 transition-colors duration-200 ${
                  t.featured
                    ? "bg-signal text-void hover:bg-stark"
                    : "border border-border text-stark hover:border-signal hover:text-signal"
                }`}
              >
                GET STARTED
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FREE TRIAL FORM
   ═══════════════════════════════════════════════════════════════════════════ */
function FreeTrialForm() {
  const reveal = useReveal();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-concrete border-t-2 border-border py-24 md:py-32" id="free-trial">
      <div className="max-w-[800px] mx-auto px-6 md:px-12" ref={reveal}>
        <p className="font-display text-sm tracking-[0.4em] text-signal uppercase mb-2">
          No Excuses
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-stark mb-4">
          FREE WEEK
        </h2>
        <p className="font-body text-muted text-lg mb-10 max-w-lg">
          Fill out the form below and we&apos;ll get you on the floor. No
          strings. No gimmicks. Just work.
        </p>

        {submitted ? (
          <div className="border-2 border-signal p-12 text-center">
            <span className="font-display text-6xl text-signal block mb-4">
              LOCKED IN.
            </span>
            <p className="font-body text-muted text-lg">
              We&apos;ll reach out within 24 hours to get your free week
              started.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                required
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                className="form-input"
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="form-input"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="program" className="form-select" defaultValue="">
                <option value="" disabled>
                  Which program interests you?
                </option>
                <option value="crossfit">CrossFit</option>
                <option value="strength">Strength &amp; Conditioning</option>
                <option value="hiit">HIIT / Cardio</option>
                <option value="open-gym">Open Gym</option>
                <option value="personal-training">Personal Training</option>
                <option value="foundations">Foundations (Beginner)</option>
              </select>
              <select name="experience" className="form-select" defaultValue="">
                <option value="" disabled>
                  Fitness Experience
                </option>
                <option value="beginner">Beginner</option>
                <option value="some">Some Experience</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <textarea
              name="message"
              placeholder="Anything else we should know?"
              rows={4}
              className="form-input resize-none"
            />
            <button
              type="submit"
              className="w-full bg-signal text-void font-display text-2xl tracking-wider py-5 hover:bg-stark transition-colors duration-200"
            >
              CLAIM YOUR FREE WEEK
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-void border-t-2 border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-5xl text-stark">GRIT</span>
            <span className="block font-display text-lg tracking-[0.3em] text-signal">
              ATHLETICS
            </span>
            <div className="bar-accent mt-4 mb-4" style={{ maxWidth: 40 }} />
            <p className="font-display text-sm tracking-[0.2em] text-muted">
              NO EXCUSES.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-display text-lg tracking-[0.2em] text-stark mb-4">
              LOCATION
            </h4>
            <address className="font-body text-sm text-muted not-italic leading-relaxed">
              4201 E Speedway Blvd
              <br />
              Tucson, AZ 85712
              <br />
              <br />
              <a
                href="tel:+15205550147"
                className="text-stark hover:text-signal transition-colors"
              >
                (520) 555-0147
              </a>
              <br />
              <a
                href="mailto:info@gritathletics.com"
                className="text-stark hover:text-signal transition-colors"
              >
                info@gritathletics.com
              </a>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg tracking-[0.2em] text-stark mb-4">
              HOURS
            </h4>
            <ul className="font-body text-sm text-muted space-y-2">
              <li className="flex justify-between">
                <span>Mon &ndash; Fri</span>
                <span className="text-stark">5:30AM &ndash; 8:00PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-stark">7:00AM &ndash; 2:00PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-stark">8:00AM &ndash; 12:00PM</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg tracking-[0.2em] text-stark mb-4">
              FOLLOW
            </h4>
            <div className="flex flex-col gap-3">
              {["Instagram", "Facebook", "YouTube", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-display text-sm tracking-[0.2em] text-muted hover:text-signal transition-colors uppercase"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted">
            &copy; {new Date().getFullYear()} Grit Athletics. All rights
            reserved.
          </p>
          <p className="font-body text-xs text-steel">
            Tucson, Arizona &mdash; Built Different.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-void/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a href="#" className="font-display text-2xl text-stark tracking-tight">
          GRIT<span className="text-signal">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Programs", href: "#programs" },
            { label: "Coaches", href: "#coaches" },
            { label: "Pricing", href: "#pricing" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-sm tracking-[0.2em] text-muted hover:text-signal transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#free-trial"
            className="font-display text-sm tracking-[0.2em] bg-signal text-void px-5 py-2 hover:bg-stark transition-colors"
          >
            FREE WEEK
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-stark transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-stark transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-stark transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-void/95 backdrop-blur-sm border-b border-border ${
          menuOpen ? "max-h-80" : "max-h-0 border-b-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {[
            { label: "Programs", href: "#programs" },
            { label: "Coaches", href: "#coaches" },
            { label: "Pricing", href: "#pricing" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-xl tracking-[0.2em] text-stark hover:text-signal transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#free-trial"
            onClick={() => setMenuOpen(false)}
            className="font-display text-xl tracking-[0.2em] bg-signal text-void px-5 py-3 text-center hover:bg-stark transition-colors"
          >
            FREE WEEK
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Programs />
        <Schedule />
        <Coaches />
        <Testimonial />
        <Pricing />
        <FreeTrialForm />
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { FlaskConical, BookOpen, MessageSquare, FileCode2, ArrowRight, Zap, Shield, Target } from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Structured Learning Path",
    desc: "62 lessons across 26 modules — from workspace basics to advanced TQL, DEX, and CI/CD integration.",
    href: "/learn",
    color: "var(--accent)",
  },
  {
    icon: MessageSquare,
    title: "Interview Companion",
    desc: "88 scenario-based questions across AS1, AS2, AE1, TDS, API, and DevOps. Topic filters, flashcard mode, and AI mock interview.",
    href: "/interview",
    color: "var(--accent2)",
  },
  {
    icon: FlaskConical,
    title: "Interactive Mock Lab",
    desc: "A live sandbox with dynamic tables, shadow DOM, nested iFrames, file upload, AJAX delays — purpose-built for XScan practice.",
    href: "/lab",
    color: "#34d399",
  },
  {
    icon: FileCode2,
    title: "TQL Cheatsheet",
    desc: "Searchable reference for TOSCA Query Language: SUBPARTS, SUPERPARTS, filters, attribute selectors, and execution commands.",
    href: "/cheatsheet",
    color: "#fbbf24",
  },
];

const STATS = [
  { label: "Lessons", value: "62" },
  { label: "Interview Questions", value: "88" },
  { label: "Glossary Terms", value: "142" },
  { label: "Cheatsheet Entries", value: "15+" },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 chip chip-blue mb-2">
          <Zap size={12} />
          Open Source · Tricentis Tosca
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
          Master{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tosca Automation
          </span>
          <br />from Zero to Certified
        </h1>
        <p className="max-w-xl mx-auto text-[var(--muted)] text-lg leading-relaxed">
          An interactive learning platform for Quality Engineers preparing for Tricentis Tosca
          certifications (AS1, AS2, AE1, AE2, TDS, TQL) and senior QA interviews.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "var(--accent)", color: "#0d0f14" }}
          >
            Start Learning <ArrowRight size={16} />
          </Link>
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[var(--border-bright)] hover:border-[var(--accent)] transition-colors"
          >
            Open Mock Lab <FlaskConical size={16} />
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="glass rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center glow-accent">
        {STATS.map(({ label, value }) => (
          <div key={label}>
            <p className="text-3xl font-extrabold" style={{ color: "var(--accent)" }}>
              {value}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">{label}</p>
          </div>
        ))}
      </section>

      {/* Feature cards */}
      <section className="grid sm:grid-cols-2 gap-5">
        {FEATURES.map(({ icon: Icon, title, desc, href, color }) => (
          <Link
            key={href}
            href={href}
            className="glass rounded-2xl p-6 hover:border-[var(--border-bright)] transition-all group space-y-3"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${color}22` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <h2 className="font-bold text-lg group-hover:text-[var(--accent)] transition-colors">
              {title}
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color }}>
              Explore <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </section>

      {/* Certification track */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Certification Tracks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {["AS1", "AS2", "AE1", "AE2", "TDS1/2", "TQL"].map((cert) => (
            <div
              key={cert}
              className="glass rounded-xl p-4 text-center border border-[var(--border)] hover:border-[var(--accent)] transition-colors cursor-default"
            >
              <div className="text-xl font-extrabold" style={{ color: "var(--accent2)" }}>
                {cert}
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">Track</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass rounded-2xl p-10 text-center space-y-4 glow-accent">
        <Shield size={32} className="mx-auto" style={{ color: "var(--accent)" }} />
        <h2 className="text-2xl font-bold">Ready for your Tosca interview?</h2>
        <p className="text-[var(--muted)]">
          Practice 88 real scenario-based questions with step-by-step expert answers.
        </p>
        <Link
          href="/interview"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
          style={{ background: "var(--accent2)", color: "#0d0f14" }}
        >
          <Target size={16} /> Start Interview Prep
        </Link>
      </section>
    </div>
  );
}

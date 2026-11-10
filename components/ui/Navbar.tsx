"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, BookOpen, MessageSquare, FileCode2, GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/learn",       label: "Learn",      icon: BookOpen },
  { href: "/interview",   label: "Interview",  icon: MessageSquare },
  { href: "/lab",         label: "Mock Lab",   icon: FlaskConical },
  { href: "/cheatsheet",  label: "Cheatsheet", icon: FileCode2 },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-[var(--accent)] text-lg shrink-0">
          <GraduationCap size={22} />
          <span className="hidden sm:inline">TestStep Academy</span>
          <span className="sm:hidden">TSA</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                path.startsWith(href)
                  ? "bg-[var(--accent-glow)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] px-4 pb-3 flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                path.startsWith(href)
                  ? "bg-[var(--accent-glow)] text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

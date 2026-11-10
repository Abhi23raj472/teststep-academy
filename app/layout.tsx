import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "TestStep Academy — Tricentis Tosca Learning Platform",
  description:
    "Master Tricentis Tosca automation: interactive mock labs, interview prep, structured learning paths, TQL cheatsheets, and AI-powered mock interviews.",
  keywords: ["Tricentis Tosca", "test automation", "TOSCA interview", "AS1", "AS2", "AE1", "XScan", "TQL"],
  openGraph: {
    title: "TestStep Academy",
    description: "The open-source Tosca learning platform for QA engineers.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
          <p>TestStep Academy · Open Source · MIT License</p>
          <p className="mt-1">
            Built for QA engineers preparing for Tricentis Tosca certifications.{" "}
            <a
              href="https://github.com/Abhi23raj472/teststep-academy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              GitHub ↗
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

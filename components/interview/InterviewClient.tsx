"use client";
import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Filter, BookOpen, Zap } from "lucide-react";
import type { Question } from "@/app/interview/page";

const TOPICS = [
  "All Topics",
  "Module scanning (XScan)",
  "Steering dynamic controls",
  "TestCase design",
  "Buffers and parameterisation",
  "Test data (TDM/TDS)",
  "API testing",
  "Execution lists and DEX",
  "CI/CD integration",
  "TBox",
  "Recovery and cleanup scenarios",
  "Reporting",
  "SAP testing",
  "Multi-user workspaces",
];

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

const DIFF_COLOR: Record<string, string> = {
  Beginner: "chip-green",
  Intermediate: "chip-yellow",
  Advanced: "chip-red",
};

export default function InterviewClient({ questions }: { questions: Question[] }) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All Topics");
  const [difficulty, setDifficulty] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mode, setMode] = useState<"list" | "flash">("list");
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchSearch =
        !search ||
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase());
      const matchTopic = topic === "All Topics" || q.topic === topic;
      const matchDiff = difficulty === "All" || q.difficulty === difficulty;
      return matchSearch && matchTopic && matchDiff;
    });
  }, [questions, search, topic, difficulty]);

  const flashQ = filtered[flashIdx % Math.max(filtered.length, 1)];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold">Interview Companion</h1>
        <p className="text-[var(--muted)]">
          {questions.length} scenario-based questions · AS1 / AS2 / AE1 / TDS / API / CI&amp;CD
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("list")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            mode === "list"
              ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-glow)]"
              : "border-[var(--border)] text-[var(--muted)]"
          }`}
        >
          <BookOpen size={15} /> Q&amp;A List
        </button>
        <button
          onClick={() => { setMode("flash"); setFlashIdx(0); setFlashFlipped(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            mode === "flash"
              ? "border-[var(--accent2)] text-[var(--accent2)] bg-[rgba(167,139,250,0.1)]"
              : "border-[var(--border)] text-[var(--muted)]"
          }`}
        >
          <Zap size={15} /> Flashcards
        </button>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search questions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Filter size={14} className="text-[var(--muted)]" />
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-white/5 border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="flex gap-1">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  difficulty === d
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-glow)]"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs text-[var(--muted)]">{filtered.length} questions</span>
        </div>
      </div>

      {/* Flashcard mode */}
      {mode === "flash" && filtered.length > 0 && (
        <div className="space-y-4">
          <div
            className="glass rounded-2xl p-8 min-h-56 cursor-pointer select-none glow-accent flex flex-col justify-between"
            onClick={() => setFlashFlipped(!flashFlipped)}
          >
            <span className={`chip ${DIFF_COLOR[flashQ.difficulty]} mb-4 self-start`}>{flashQ.difficulty}</span>
            <div className="flex-1">
              {!flashFlipped ? (
                <p className="text-xl font-semibold leading-snug">{flashQ.question}</p>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wide">Answer</p>
                  <p className="text-[var(--text)] leading-relaxed">{flashQ.answer}</p>
                  {flashQ.syntax && typeof flashQ.syntax === "string" && (
                    <pre className="bg-black/40 rounded-lg p-3 text-xs text-[var(--accent2)] overflow-x-auto whitespace-pre-wrap mt-3">{flashQ.syntax}</pre>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-[var(--muted)] mt-4">{flashFlipped ? "Click to see question" : "Click to reveal answer"}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setFlashIdx(Math.max(0, flashIdx - 1)); setFlashFlipped(false); }}
              disabled={flashIdx === 0}
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm disabled:opacity-30"
            >← Prev</button>
            <span className="text-sm text-[var(--muted)]">{flashIdx + 1} / {filtered.length}</span>
            <button
              onClick={() => { setFlashIdx(Math.min(filtered.length - 1, flashIdx + 1)); setFlashFlipped(false); }}
              disabled={flashIdx >= filtered.length - 1}
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm disabled:opacity-30"
            >Next →</button>
          </div>
        </div>
      )}

      {/* Q&A list mode */}
      {mode === "list" && (
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--muted)]">No questions match your filters.</div>
          )}
          {filtered.map((q) => (
            <div key={q.id} className="glass rounded-xl overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-start gap-3"
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              >
                <span className="text-xs font-mono text-[var(--muted)] mt-0.5 shrink-0 w-7">
                  #{q.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-snug">{q.question}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className={`chip ${DIFF_COLOR[q.difficulty]}`}>{q.difficulty}</span>
                    <span className="chip chip-blue">{q.topic}</span>
                  </div>
                </div>
                {expanded === q.id ? <ChevronUp size={16} className="shrink-0 mt-0.5 text-[var(--muted)]" /> : <ChevronDown size={16} className="shrink-0 mt-0.5 text-[var(--muted)]" />}
              </button>

              {expanded === q.id && (
                <div className="border-t border-[var(--border)] px-5 py-4 space-y-4 bg-black/20">
                  {/* Approach */}
                  {q.approach?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-2">Approach</p>
                      <ol className="space-y-1">
                        {q.approach.map((step, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[var(--text)]">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] text-xs flex items-center justify-center font-bold">{i + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Syntax */}
                  {q.syntax && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent2)] mb-2">Syntax / Example</p>
                      {typeof q.syntax === "string" ? (
                        <pre className="bg-black/40 rounded-lg p-3 text-xs text-[var(--accent2)] overflow-x-auto whitespace-pre-wrap">{q.syntax}</pre>
                      ) : (
                        <div className="space-y-1.5">
                          {(q.syntax as {label:string;code:string}[]).map((s, i) => (
                            <div key={i} className="bg-black/40 rounded-lg px-3 py-2 text-xs">
                              <span className="text-[var(--muted)]">{s.label}: </span>
                              <code className="text-[var(--accent2)]">{s.code}</code>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Answer */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--green)] mb-2">Short Answer</p>
                    <p className="text-sm text-[var(--text)] leading-relaxed">{q.answer}</p>
                  </div>

                  {/* Docs link */}
                  {q.docs && (
                    <a href={q.docs} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline">
                      📄 Tricentis Docs ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

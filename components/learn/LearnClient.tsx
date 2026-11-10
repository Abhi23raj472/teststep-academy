"use client";
import { useState } from "react";
import { BookOpen, ChevronRight, ChevronDown, CheckCircle } from "lucide-react";
import type { StudyData, Lesson } from "@/app/learn/page";

export default function LearnClient({ study }: { study: StudyData }) {
  const [openUnit, setOpenUnit] = useState<number | null>(null);
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  const toggleDone = (id: string) => {
    setDone((d) => { const n = new Set(d); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const getLessons = (unitId: number): Lesson[] =>
    study.lessons.filter((l) => l.unit === unitId);

  const totalLessons = study.lessons.length;
  const pct = Math.round((done.size / totalLessons) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold">Structured Learning Path</h1>
        <p className="text-[var(--muted)]">
          {totalLessons} lessons · {study.units.length} modules · {study.phases.length} phases
        </p>
      </div>

      {/* Progress */}
      <div className="glass rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Your Progress</span>
          <span className="text-[var(--accent)] font-bold">{done.size} / {totalLessons} ({pct}%)</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: "var(--accent)" }} />
        </div>
      </div>

      {/* Phases */}
      {study.phases.map((phase, pi) => {
        const phaseUnits = study.units.slice(phase.from - 1, phase.to);
        return (
          <div key={pi} className="space-y-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--accent2)]">Phase {pi + 1}: {phase.title}</h2>
              {phase.text && <p className="text-sm text-[var(--muted)] mt-0.5">{phase.text}</p>}
            </div>

            {phaseUnits.map((unit) => {
              const lessons = getLessons(unit.id);
              const doneCount = lessons.filter((l) => done.has(l.id)).length;
              const isOpen = openUnit === unit.id;

              return (
                <div key={unit.id} className="glass rounded-xl overflow-hidden">
                  <button
                    className="w-full text-left px-5 py-4 flex items-center gap-3"
                    onClick={() => setOpenUnit(isOpen ? null : unit.id)}
                  >
                    <BookOpen size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
                    <span className="flex-1 font-semibold text-sm">{unit.title}</span>
                    <span className="text-xs text-[var(--muted)] mr-2">{doneCount}/{lessons.length}</span>
                    {isOpen ? <ChevronDown size={15} className="text-[var(--muted)]" /> : <ChevronRight size={15} className="text-[var(--muted)]" />}
                  </button>

                  {isOpen && (
                    <div className="border-t border-[var(--border)]">
                      {lessons.map((lesson) => {
                        const lOpen = openLesson === lesson.id;
                        return (
                          <div key={lesson.id} className="border-b border-[var(--border)] last:border-0">
                            <div className="flex items-center gap-2 px-5 py-3">
                              <button
                                onClick={() => toggleDone(lesson.id)}
                                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  done.has(lesson.id) ? "border-[var(--green)] bg-[var(--green)]" : "border-[var(--border)] hover:border-[var(--green)]"
                                }`}
                              >
                                {done.has(lesson.id) && <CheckCircle size={12} style={{ color: "#0d0f14" }} />}
                              </button>
                              <button
                                className="flex-1 text-left text-sm font-medium hover:text-[var(--accent)] transition-colors"
                                onClick={() => setOpenLesson(lOpen ? null : lesson.id)}
                              >
                                {lesson.title}
                              </button>
                              {lOpen ? <ChevronDown size={14} className="text-[var(--muted)] shrink-0" /> : <ChevronRight size={14} className="text-[var(--muted)] shrink-0" />}
                            </div>

                            {lOpen && (
                              <div className="px-12 pb-5 space-y-4 bg-black/20">
                                {lesson.simple && (
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-1">In Simple Terms</p>
                                    <p className="text-sm text-[var(--muted)]">{lesson.simple}</p>
                                  </div>
                                )}
                                {lesson.body && (
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent2)] mb-1">Explanation</p>
                                    <p className="text-sm text-[var(--text)] leading-relaxed">{lesson.body}</p>
                                  </div>
                                )}
                                {lesson.definitions && lesson.definitions.length > 0 && (
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--yellow)] mb-2">Key Terms</p>
                                    <div className="space-y-1.5">
                                      {lesson.definitions.map((d, i) => (
                                        <div key={i} className="flex gap-2 text-sm">
                                          <span className="font-semibold text-[var(--accent2)] shrink-0">{d.term}:</span>
                                          <span className="text-[var(--muted)]">{d.text}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {lesson.points && lesson.points.length > 0 && (
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--green)] mb-2">Key Points</p>
                                    <ul className="space-y-1">
                                      {lesson.points.map((kp, i) => (
                                        <li key={i} className="flex gap-2 text-sm text-[var(--text)]">
                                          <span className="text-[var(--green)] shrink-0">▸</span>{kp}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {lesson.example && (
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-1">Example</p>
                                    <pre className="bg-black/40 rounded-lg p-3 text-xs text-[var(--accent2)] overflow-x-auto whitespace-pre-wrap">{lesson.example}</pre>
                                  </div>
                                )}
                                {lesson.mistake && (
                                  <div className="bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)] rounded-lg p-3">
                                    <p className="text-xs font-bold text-[var(--red)] mb-1">Common Mistake</p>
                                    <p className="text-sm text-[var(--muted)]">{lesson.mistake}</p>
                                  </div>
                                )}
                                {lesson.docs && (
                                  <a href={lesson.docs} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline">
                                    📄 Docs ↗
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

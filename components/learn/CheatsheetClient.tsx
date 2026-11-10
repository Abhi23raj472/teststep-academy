"use client";
import { useState } from "react";
import { Search, Copy, CheckCheck, FileCode2 } from "lucide-react";

interface CheatEntry { label: string; value: string; group: string }
interface GlossaryEntry { term: string; definition: string }

// Extra TQL entries not in study.json
const TQL_EXTRAS: CheatEntry[] = [
  { group: "TQL Navigation",   label: "All direct sub-nodes",   value: "=>SUBPARTS" },
  { group: "TQL Navigation",   label: "All ancestor nodes",     value: "=>SUPERPARTS" },
  { group: "TQL Navigation",   label: "Direct parent",          value: "=>PARENT" },
  { group: "TQL Navigation",   label: "Siblings with same type",value: "=>SIBLINGS[Type='TestCase']" },
  { group: "TQL Filter",       label: "By attribute value",     value: "=>SUBPARTS[Name='Login']" },
  { group: "TQL Filter",       label: "Contains text",          value: "=>SUBPARTS[Name LIKE '%Login%']" },
  { group: "TQL Filter",       label: "By custom property",     value: "=>SUBPARTS[PropertyName='Sprint_42']" },
  { group: "TQL Filter",       label: "Multiple conditions",    value: "=>SUBPARTS[Type='TestCase' AND Status='Passed']" },
  { group: "TQL Execution",    label: "Run ExecutionList by name", value: "=>EXECUTIONLISTS[Name='Smoke Suite']" },
  { group: "TQL Execution",    label: "Get last run result",    value: "=>SUBPARTS[LastTestRunResult='Failed']" },
  { group: "Steering Params",  label: "Target by explicit name",value: "ExplicitName = 'Submit Button'" },
  { group: "Steering Params",  label: "Anchor on a sibling",    value: "Constraint = 'Row where Col1=Login'" },
  { group: "Steering Params",  label: "Wait for element",       value: "Synchronization = WaitForElement, Timeout=15" },
  { group: "Steering Params",  label: "Scope scan to frame",    value: "SearchContext = iFrameId" },
  { group: "TBox Modules",     label: "Wait for condition",     value: "TBox Wait → WaitForElement / WaitForProperty" },
  { group: "TBox Modules",     label: "DB query assertion",     value: "TBox DB Expert → ExecuteQuery + VerifyValue" },
  { group: "TBox Modules",     label: "Window operation",       value: "TBox Window Operation → Maximize / Close / Switch" },
  { group: "TBox Modules",     label: "File upload",            value: "TBox Automation Tools → FileUpload(FilePath)" },
  { group: "DEX / CI",         label: "Run via CLI (AOS)",      value: "ToscaCI.exe run -executionList \"Smoke\" -ags http://host" },
  { group: "DEX / CI",         label: "Jenkins plugin param",   value: "-tosca-server-url http://host -executionList \"Smoke\"" },
];

export default function CheatsheetClient({ study }: { study: { cheatsheet: CheatEntry[]; glossary: GlossaryEntry[] } }) {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [tab, setTab] = useState<"cheatsheet" | "glossary">("cheatsheet");

  const allEntries = [...(study.cheatsheet ?? []), ...TQL_EXTRAS];
  const groups = [...new Set(allEntries.map((e) => e.group))].filter(Boolean);

  const filtered = allEntries.filter(
    (e) =>
      !search ||
      e.label.toLowerCase().includes(search.toLowerCase()) ||
      e.value.toLowerCase().includes(search.toLowerCase()) ||
      (e.group ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredGlossary = (study.glossary ?? []).filter(
    (g) =>
      !search ||
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.definition.toLowerCase().includes(search.toLowerCase())
  );

  const copy = (val: string) => {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(val);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileCode2 size={24} style={{ color: "var(--yellow)" }} />
          <h1 className="text-3xl font-extrabold">TQL &amp; Steering Cheatsheet</h1>
        </div>
        <p className="text-[var(--muted)]">
          Searchable reference for TOSCA Query Language, steering parameters, TBox modules, and CI/CD commands.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2">
        {(["cheatsheet", "glossary"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium capitalize transition-colors ${
              tab === t ? "text-[var(--accent)] border-b-2 border-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {t === "cheatsheet" ? `Cheatsheet (${allEntries.length})` : `Glossary (${study.glossary?.length ?? 0})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Cheatsheet */}
      {tab === "cheatsheet" && (
        <div className="space-y-6">
          {groups.map((group) => {
            const entries = filtered.filter((e) => e.group === group);
            if (!entries.length) return null;
            return (
              <div key={group} className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{group}</h2>
                <div className="glass rounded-xl overflow-hidden">
                  {entries.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-white/5 group">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[var(--muted)] mb-0.5">{e.label}</p>
                        <code className="text-sm text-[var(--accent2)] break-all">{e.value}</code>
                      </div>
                      <button
                        onClick={() => copy(e.value)}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-white/10"
                        title="Copy"
                      >
                        {copied === e.value ? <CheckCheck size={14} style={{ color: "var(--green)" }} /> : <Copy size={14} className="text-[var(--muted)]" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center py-10 text-[var(--muted)]">No entries match your search.</p>
          )}
        </div>
      )}

      {/* Glossary */}
      {tab === "glossary" && (
        <div className="glass rounded-xl overflow-hidden">
          {filteredGlossary.length === 0 && (
            <p className="text-center py-10 text-[var(--muted)]">No terms match.</p>
          )}
          {filteredGlossary.map((g, i) => (
            <div key={i} className="flex gap-4 px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-white/5">
              <span className="font-semibold text-sm text-[var(--accent)] shrink-0 w-40 truncate" title={g.term}>{g.term}</span>
              <span className="text-sm text-[var(--muted)]">{g.definition}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

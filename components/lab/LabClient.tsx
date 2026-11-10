"use client";
import { useState, useEffect, useRef } from "react";
import {
  FlaskConical, ChevronRight, RefreshCw, AlertTriangle,
  CheckCircle, Upload, Table2, Layers, Zap, Globe, Database
} from "lucide-react";

/* ── helpers ───────────────────────────────────────────────── */
function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(108,142,247,0.08)] border border-[var(--border-bright)] rounded-lg p-3 text-xs text-[var(--muted)] leading-relaxed">
      <span className="font-bold text-[var(--accent)]">🔍 XScan Tip: </span>
      {children}
    </div>
  );
}

function SectionCard({
  id, icon: Icon, title, color, children,
}: {
  id: string; icon: React.ElementType; title: string; color: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="glass rounded-2xl p-6 space-y-4 scroll-mt-20">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ── Dynamic Table ──────────────────────────────────────────── */
function DynamicTable() {
  const [rows, setRows] = useState([
    { id: "ORD-4711", product: "Tosca Studio Pro", qty: 2, status: "Shipped" },
    { id: "ORD-4712", product: "Tricentis License", qty: 1, status: "Pending" },
    { id: "ORD-4713", product: "DEX Node Pack",    qty: 5, status: "Processing" },
  ]);
  const [filter, setFilter] = useState("");

  const shuffle = () => {
    setRows((r) => [...r].sort(() => Math.random() - 0.5));
  };

  const filtered = rows.filter(
    (r) => !filter || r.product.toLowerCase().includes(filter.toLowerCase()) || r.id.includes(filter)
  );

  return (
    <div className="space-y-3">
      <Tip>
        In XScan, scan this table as a single <code className="text-[var(--accent2)]">Table</code> control.
        In your TestStep, set <code>ActionMode = Constraint</code> on the <strong>Order ID</strong> cell to anchor the row,
        then verify the <strong>Status</strong> cell on the same row — works even when row order shuffles.
      </Tip>
      <div className="flex gap-2">
        <input
          type="text" placeholder="Filter by product or ID…"
          value={filter} onChange={(e) => setFilter(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
          id="dynamic-table-filter"
        />
        <button onClick={shuffle} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] text-sm hover:border-[var(--accent)] transition-colors">
          <RefreshCw size={14} /> Shuffle
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full text-sm" id="orders-table">
          <thead>
            <tr className="border-b border-[var(--border)] bg-white/5">
              {["Order ID", "Product", "Qty", "Status"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-[var(--muted)] text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-[var(--border)] last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-[var(--accent)]">{r.id}</td>
                <td className="px-4 py-3">{r.product}</td>
                <td className="px-4 py-3">{r.qty}</td>
                <td className="px-4 py-3">
                  <span className={`chip ${r.status === "Shipped" ? "chip-green" : r.status === "Pending" ? "chip-yellow" : "chip-blue"}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Dynamic Dropdown & IDs ─────────────────────────────────── */
function DynamicIds() {
  const [dynId] = useState(() => `ctrl_${Math.random().toString(36).slice(2, 8)}`);
  const [val, setVal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-3">
      <Tip>
        This control&apos;s HTML <code className="text-[var(--accent2)]">id</code> is randomised on page load ({dynId}).
        In XScan, do NOT use the auto-detected ID. Set the steering parameter
        <code className="text-[var(--accent2)]"> ExplicitName = &quot;Environment Selector&quot;</code> (matches the label text)
        or use a <code className="text-[var(--accent2)]">Constraint</code> on a stable sibling attribute.
      </Tip>
      <div className="flex flex-col gap-2 max-w-xs">
        <label htmlFor={dynId} className="text-sm font-medium">Environment Selector</label>
        <select
          id={dynId}
          value={val}
          onChange={(e) => { setVal(e.target.value); setSubmitted(false); }}
          className="px-3 py-2 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
        >
          <option value="">-- Select environment --</option>
          <option value="DEV">DEV</option>
          <option value="QA">QA</option>
          <option value="UAT">UAT</option>
          <option value="PROD">PROD (locked)</option>
        </select>
        <button
          disabled={!val || val === "PROD (locked)"}
          onClick={() => setSubmitted(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors"
          style={{ background: "var(--accent)", color: "#0d0f14" }}
        >
          Confirm
        </button>
        {submitted && (
          <div className="flex items-center gap-2 text-sm text-[var(--green)]">
            <CheckCircle size={15} /> Environment set to <strong>{val}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── AJAX Delay ─────────────────────────────────────────────── */
function AjaxDelay() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState("");

  const trigger = () => {
    setStatus("loading");
    setResult("");
    setTimeout(() => {
      setStatus("done");
      setResult(`✔ Record #${Math.floor(Math.random() * 9000 + 1000)} fetched at ${new Date().toLocaleTimeString()}`);
    }, 2800);
  };

  return (
    <div className="space-y-3">
      <Tip>
        This button triggers a 2.8-second AJAX call before the result appears.
        In Tosca, use <code className="text-[var(--accent2)]">TBox Wait</code> with
        <code className="text-[var(--accent2)]"> WaitForElement</code> pointing at the result container,
        or set a <code className="text-[var(--accent2)]">Synchronization</code> steering on the next TestStep.
      </Tip>
      <div className="flex flex-col gap-3 max-w-xs">
        <button
          onClick={trigger}
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 transition-all"
          style={{ background: "var(--accent)", color: "#0d0f14" }}
          id="ajax-trigger"
        >
          {status === "loading" ? (
            <><span className="animate-spin">⏳</span> Loading…</>
          ) : (
            <><Zap size={15} /> Fetch Record</>
          )}
        </button>
        {status === "done" && (
          <div id="ajax-result" className="glass rounded-lg px-4 py-3 text-sm text-[var(--green)]">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Modal / Popup ──────────────────────────────────────────── */
function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="space-y-3">
      <Tip>
        When scanning popup controls, XScan must be triggered <em>while</em> the modal is open.
        Use <code className="text-[var(--accent2)]">TBox Automation Tools → Open Dialog</code> in a preceding step,
        then scan. Set <code className="text-[var(--accent2)]">SearchContext</code> to scope the scan inside the modal container.
      </Tip>
      <button
        onClick={() => { setOpen(true); setConfirmed(false); }}
        className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-glow)] transition-colors"
        id="open-modal"
      >
        Open Modal Dialog
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div id="modal-dialog" className="glass rounded-2xl p-8 w-full max-w-sm space-y-4 glow-accent" role="dialog" aria-modal="true">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-[var(--yellow)]" />
              <h3 className="font-bold text-lg">Confirm Deployment</h3>
            </div>
            <p className="text-sm text-[var(--muted)]">
              You are about to deploy build <strong>#4711</strong> to <strong>UAT</strong>. This action will restart all test nodes.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setConfirmed(true); setOpen(false); }}
                className="flex-1 py-2 rounded-lg text-sm font-semibold"
                style={{ background: "var(--accent)", color: "#0d0f14" }}
                id="modal-confirm"
              >
                Confirm
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                id="modal-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmed && (
        <div className="flex items-center gap-2 text-sm text-[var(--green)]">
          <CheckCircle size={15} /> Deployment confirmed by dialog action.
        </div>
      )}
    </div>
  );
}

/* ── File Upload ─────────────────────────────────────────────── */
function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      <Tip>
        For file upload in Tosca, use the <code className="text-[var(--accent2)]">TBox Automation Tools → FileUpload</code> module
        (not the standard scan). Set <code className="text-[var(--accent2)]">FilePath</code> as a TDM/TDS attribute so the
        path is parametrised across test environments.
      </Tip>
      <div
        className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--accent)] transition-colors"
        onClick={() => ref.current?.click()}
      >
        <Upload size={24} className="mx-auto mb-2 text-[var(--muted)]" />
        <p className="text-sm text-[var(--muted)]">Click or drag to upload a test results file</p>
        <p className="text-xs text-[var(--muted)] mt-1">.xml, .json, .csv accepted</p>
        <input
          ref={ref}
          type="file"
          accept=".xml,.json,.csv"
          className="hidden"
          id="file-upload"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>
      {file && (
        <div className="flex items-center gap-2 text-sm text-[var(--green)]">
          <CheckCircle size={15} /> {file.name} ({Math.round(file.size / 1024)} KB)
        </div>
      )}
    </div>
  );
}

/* ── Nested iFrame sim ───────────────────────────────────────── */
function IframeSim() {
  return (
    <div className="space-y-3">
      <Tip>
        When scanning controls inside an iFrame, XScan often treats the frame as a separate browser context.
        Set the <code className="text-[var(--accent2)]">BrowserWindow</code> steering parameter on the Module to target the frame.
        For nested iFrames, chain two Module-level <code className="text-[var(--accent2)]">SearchContext</code> anchors.
      </Tip>
      <div className="border border-[var(--border)] rounded-xl overflow-hidden" style={{ height: 220 }}>
        <div className="bg-white/5 px-3 py-1.5 text-xs text-[var(--muted)] border-b border-[var(--border)] font-mono">
          [iframe] /frame-sim
        </div>
        <div className="p-4 space-y-2 bg-[#0a0c10]">
          <p className="text-xs text-[var(--muted)]">[inner frame context]</p>
          <div className="flex gap-2">
            <input
              id="frame-input"
              type="text"
              placeholder="Username inside frame"
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
            />
            <button
              id="frame-submit"
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "var(--accent2)", color: "#0d0f14" }}
            >
              Login
            </button>
          </div>
          <div className="border border-[var(--border)] rounded-lg p-3 bg-black/30" style={{ marginTop: 8 }}>
            <p className="text-xs text-[var(--muted)]">[nested frame] Shadow-like panel:</p>
            <input
              id="shadow-input"
              type="text"
              placeholder="2FA token"
              className="mt-1.5 w-full px-3 py-2 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── TDS Simulator ───────────────────────────────────────────── */
function TDSSimulator() {
  const records = [
    { id: 1, username: "qa_user_01", env: "QA",  status: "Free" },
    { id: 2, username: "qa_user_02", env: "QA",  status: "Free" },
    { id: 3, username: "uat_user_01", env: "UAT", status: "Free" },
    { id: 4, username: "uat_user_02", env: "UAT", status: "Free" },
  ];
  const [states, setStates] = useState<Record<number, "Free" | "Reserved" | "In Use" | "Complete">>(
    Object.fromEntries(records.map((r) => [r.id, "Free"]))
  );

  const lock = (id: number) => {
    setStates((s) => ({ ...s, [id]: "Reserved" }));
    setTimeout(() => setStates((s) => ({ ...s, [id]: "In Use" })), 800);
    setTimeout(() => setStates((s) => ({ ...s, [id]: "Complete" })), 3000);
    setTimeout(() => setStates((s) => ({ ...s, [id]: "Free" })), 4500);
  };

  const STATUS_COLOR: Record<string, string> = {
    Free: "chip-green", Reserved: "chip-yellow", "In Use": "chip-red", Complete: "chip-blue",
  };

  return (
    <div className="space-y-3">
      <Tip>
        TDS locks a record for the duration of one ExecutionList run, preventing other parallel DEX agents from using the same user.
        Click &quot;Lock&quot; to simulate the full lifecycle: Free → Reserved → In Use → Complete → Free.
      </Tip>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-white/5">
              {["ID", "Username", "Env", "Status", "Action"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wide text-[var(--muted)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-3 font-mono text-[var(--accent)]">{r.id}</td>
                <td className="px-4 py-3">{r.username}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{r.env}</td>
                <td className="px-4 py-3">
                  <span className={`chip ${STATUS_COLOR[states[r.id]]}`}>{states[r.id]}</span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => lock(r.id)}
                    disabled={states[r.id] !== "Free"}
                    className="px-3 py-1 rounded-lg text-xs font-medium border border-[var(--border)] disabled:opacity-30 hover:border-[var(--accent)] transition-colors"
                  >
                    Lock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "dynamic-table", label: "Dynamic Table" },
  { id: "dynamic-ids",   label: "Dynamic IDs" },
  { id: "ajax-delay",    label: "AJAX Delay" },
  { id: "modal",         label: "Modal / Popup" },
  { id: "file-upload",   label: "File Upload" },
  { id: "iframe",        label: "iFrames" },
  { id: "tds",           label: "TDS Simulator" },
];

export default function LabClient() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FlaskConical size={24} style={{ color: "var(--green)" }} />
          <h1 className="text-3xl font-extrabold">Interactive Mock Lab</h1>
        </div>
        <p className="text-[var(--muted)]">
          A purpose-built sandbox for Tricentis Tosca XScan practice. Each scenario includes a tip
          explaining the correct Tosca scanning or execution approach.
        </p>
      </div>

      {/* Jump links */}
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className="chip chip-blue">{label}</a>
        ))}
      </div>

      <SectionCard id="dynamic-table" icon={Table2} title="Dynamic Table with Row Shuffling" color="var(--accent)">
        <DynamicTable />
      </SectionCard>

      <SectionCard id="dynamic-ids" icon={Zap} title="Dynamic HTML IDs (Randomised on Load)" color="var(--accent2)">
        <DynamicIds />
      </SectionCard>

      <SectionCard id="ajax-delay" icon={Globe} title="AJAX Delayed Element" color="var(--green)">
        <AjaxDelay />
      </SectionCard>

      <SectionCard id="modal" icon={Layers} title="Dynamic Modal / Popup Dialog" color="var(--yellow)">
        <ModalDemo />
      </SectionCard>

      <SectionCard id="file-upload" icon={Upload} title="File Upload Control" color="#f87171">
        <FileUpload />
      </SectionCard>

      <SectionCard id="iframe" icon={Layers} title="Nested iFrame Simulation" color="var(--accent2)">
        <IframeSim />
      </SectionCard>

      <SectionCard id="tds" icon={Database} title="TDS Record Lock Lifecycle" color="var(--accent)">
        <TDSSimulator />
      </SectionCard>
    </div>
  );
}

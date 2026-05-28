"use client";

import { useState, useRef } from "react";
import type { CSSProperties } from "react";

// ─────────────────────────────────────────────
// PALETTE
// ─────────────────────────────────────────────
const C = {
  bg: "#FAF8F5",
  surface: "#FFFFFF",
  border: "rgba(180,160,140,0.18)",
  borderMed: "rgba(180,160,140,0.32)",
  ink: "#2C2520",
  inkSoft: "#7A6A5A",
  inkMute: "#B0A090",
  inkWhisper: "#D8CEBE",
  blush: "#C4907A",
  blushLight: "#F2E4DC",
  blushMid: "#E8C4B4",
  sage: "#8A9E80",
  sageLight: "#E2ECD8",
  latte: "#C4A882",
  clay: "#B8947A",
  ivory: "#F7F3EC",
  stone: "#E8E0D4",
} as const;

const serif = "'Georgia','Times New Roman',serif";
const sans = "'Inter',-apple-system,sans-serif";

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────
function Card({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.surface,
        borderRadius: 16,
        border: `1px solid ${C.border}`,
        padding: 22,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Chip({
  children,
  color = C.blush,
  bg = C.blushLight,
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 20,
        background: bg,
        color,
        fontSize: 11,
        fontFamily: sans,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function Btn({
  children,
  onClick,
  filled = false,
  color = C.blush,
  bg = C.blushLight,
  style,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  filled?: boolean;
  color?: string;
  bg?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: 10,
        background: filled ? color : bg,
        color: filled ? "#fff" : color,
        border: "none",
        fontSize: 13,
        fontFamily: sans,
        fontWeight: 500,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: sans,
        fontSize: 10,
        color: C.inkMute,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        margin: "0 0 4px",
      }}
    >
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────
// SIDE NAV
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  { k: "home", label: "Today", icon: "🏡" },
  { k: "planner", label: "Planner", icon: "📅" },
  { k: "journal", label: "Journal", icon: "📖" },
  { k: "habits", label: "Habits", icon: "✨" },
  { k: "ambient", label: "Ambient", icon: "🎵" },
  { k: "memories", label: "Memories", icon: "📷" },
];

function SideNav({
  page,
  setPage,
}: {
  page: string;
  setPage: (p: string) => void;
}) {
  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 76,
        height: "100vh",
        background: C.ivory,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 24,
        gap: 2,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: C.blushLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
          fontSize: 18,
        }}
      >
        🌸
      </div>
      {NAV_ITEMS.map(({ k, label, icon }) => (
        <button
          key={k}
          onClick={() => setPage(k)}
          style={{
            width: 60,
            minHeight: 52,
            borderRadius: 12,
            background: page === k ? C.blushLight : "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: "8px 4px",
          }}
        >
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span
            style={{
              fontSize: 10,
              fontFamily: sans,
              color: page === k ? C.blush : C.inkMute,
              fontWeight: page === k ? 600 : 400,
            }}
          >
            {label}
          </span>
          {page === k && (
            <div
              style={{
                width: 16,
                height: 2,
                borderRadius: 2,
                background: C.blush,
              }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────
function HomePage() {
  const h = new Date().getHours();
  const tod =
    h < 12 ? "morning" : h < 17 ? "afternoon" : h < 20 ? "evening" : "night";

  const thGreet: Record<string, string> = {
    morning: "สวัสดีตอนเช้า",
    afternoon: "สวัสดีตอนบ่าย",
    evening: "สวัสดีตอนเย็น",
    night: "ราตรีสวัสดิ์",
  };
  const enGreet: Record<string, string> = {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    night: "Good night",
  };

  const [mood, setMood] = useState<string | null>(null);
  const moods = [
    { k: "✨", l: "glowing" },
    { k: "🌿", l: "calm" },
    { k: "🌸", l: "soft" },
    { k: "☁️", l: "tired" },
    { k: "🌧️", l: "heavy" },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, text: "morning stretch", done: true },
    { id: 2, text: "buy oat milk", done: false },
    { id: 3, text: "call mom", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]);
    setNewTask("");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
      {/* Greeting */}
      <Card
        style={{
          gridColumn: "1/4",
          padding: "30px 34px",
          background: C.ivory,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.inkMute, margin: "0 0 6px" }}>
            {thGreet[tod]}
          </p>
          <h1
            style={{
              fontFamily: serif,
              fontSize: 46,
              color: C.ink,
              margin: "0 0 8px",
              fontWeight: 400,
            }}
          >
            {enGreet[tod]},{" "}
            <em style={{ color: C.blush }}>you</em>
          </h1>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft, margin: 0 }}>
            you&apos;re doing beautifully. no rush today.
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: sans, fontSize: 11, color: C.inkMute, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </p>
          <p style={{ fontFamily: serif, fontSize: 26, color: C.ink, margin: "4px 0 0", fontWeight: 400 }}>
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}
          </p>
        </div>
      </Card>

      {/* Mood */}
      <Card>
        <Label>How you feel</Label>
        <p style={{ fontFamily: serif, fontSize: 18, color: C.ink, margin: "2px 0 14px", fontWeight: 400 }}>
          Today&apos;s mood
        </p>
        <div style={{ display: "flex", gap: 6 }}>
          {moods.map((m) => (
            <button
              key={m.k}
              onClick={() => setMood(m.k)}
              style={{
                flex: 1,
                padding: "10px 4px",
                borderRadius: 10,
                background: mood === m.k ? C.blushLight : C.ivory,
                border: `1.5px solid ${mood === m.k ? C.blush : "transparent"}`,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 18 }}>{m.k}</span>
              <span style={{ fontFamily: sans, fontSize: 9, color: mood === m.k ? C.blush : C.inkMute }}>
                {m.l}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Tasks */}
      <Card style={{ gridColumn: "2/4" }}>
        <Label>Gentle list</Label>
        <p style={{ fontFamily: serif, fontSize: 18, color: C.ink, margin: "2px 0 14px", fontWeight: 400 }}>
          Today&apos;s tasks
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map((t) => (
            <div
              key={t.id}
              onClick={() =>
                setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                background: C.ivory,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `1.5px solid ${t.done ? C.sage : C.inkWhisper}`,
                  background: t.done ? C.sage : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {t.done && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}
              </div>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  color: t.done ? C.inkMute : C.ink,
                  textDecoration: t.done ? "line-through" : "none",
                }}
              >
                {t.text}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="add something..."
              style={{
                flex: 1,
                background: C.ivory,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "7px 12px",
                color: C.ink,
                fontSize: 13,
                fontFamily: sans,
                outline: "none",
              }}
            />
            <Btn onClick={addTask}>+ Add</Btn>
          </div>
        </div>
      </Card>

      {/* Quote */}
      <Card style={{ gridColumn: "1/4", background: C.blushLight, borderColor: C.blushMid, padding: "20px 28px" }}>
        <p style={{ fontFamily: serif, fontSize: 19, color: C.ink, margin: 0, fontStyle: "italic", fontWeight: 400 }}>
          &quot;You don&apos;t have to do it all today. Slow is also a pace.&quot;
        </p>
        <p style={{ fontFamily: sans, fontSize: 12, color: C.blush, margin: "8px 0 0" }}>
          — a gentle reminder
        </p>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLANNER
// ─────────────────────────────────────────────
interface PlanEvent {
  id: number;
  day: string;
  hour: number;
  dur: number;
  text: string;
  color: string;
}

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_HOURS = Array.from({ length: 15 }, (_, i) => i + 7);
const EVT_COLORS = [C.blush, C.sage, C.latte, "#A08CC0", C.clay];

function fmtDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function PlannerPage() {
  const now = new Date();
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [base, setBase] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  const [events, setEvents] = useState<PlanEvent[]>([
    { id: 1, day: "2025-05-26", hour: 9, dur: 1, text: "Morning yoga", color: C.sage },
    { id: 2, day: "2025-05-27", hour: 14, dur: 2, text: "Coffee catch-up", color: C.blush },
    { id: 3, day: "2025-05-28", hour: 10, dur: 1.5, text: "Deep work", color: C.latte },
  ]);
  const [adding, setAdding] = useState<{ day: string; hour?: number } | null>(null);
  const [newText, setNewText] = useState("");
  const [newColor, setNewColor] = useState(0);
  const [newDur, setNewDur] = useState(1);
  const [newHour, setNewHour] = useState(9);

  // week helpers
  const weekStart = (() => {
    const c = new Date(base);
    c.setDate(c.getDate() - c.getDay());
    return c;
  })();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  // month helpers
  const firstDow = new Date(base.getFullYear(), base.getMonth(), 1).getDay();
  const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  const monthCells = Array.from({ length: firstDow + daysInMonth }, (_, i) =>
    i < firstDow ? null : i - firstDow + 1
  );

  const dayKey = fmtDate(base);

  const navLabel = () => {
    if (view === "day")
      return base.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    if (view === "week")
      return `${weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    return `${MONTH_NAMES[base.getMonth()]} ${base.getFullYear()}`;
  };

  const navigate = (delta: number) => {
    const d = new Date(base);
    if (view === "day") d.setDate(d.getDate() + delta);
    if (view === "week") d.setDate(d.getDate() + delta * 7);
    if (view === "month") d.setMonth(d.getMonth() + delta);
    setBase(d);
  };

  const saveEvent = () => {
    if (!newText.trim() || !adding) return;
    setEvents([...events, {
      id: Date.now(),
      day: adding.day,
      hour: newHour,
      dur: newDur,
      text: newText.trim(),
      color: EVT_COLORS[newColor],
    }]);
    setAdding(null); setNewText(""); setNewColor(0); setNewDur(1); setNewHour(9);
  };

  const cellH = 52;

  return (
    <div>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <Label>Your time</Label>
          <h2 style={{ fontFamily: serif, fontSize: 30, color: C.ink, margin: 0, fontWeight: 400 }}>Planner</h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["day", "week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "6px 14px", borderRadius: 8,
                background: view === v ? C.blushLight : C.ivory,
                border: `1px solid ${view === v ? C.blush : C.border}`,
                color: view === v ? C.blush : C.inkSoft,
                fontSize: 12, fontFamily: sans, fontWeight: 500, cursor: "pointer",
              }}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* nav bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <button onClick={() => navigate(-1)} style={{ width: 32, height: 32, borderRadius: 8, background: C.ivory, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 16, color: C.inkSoft }}>‹</button>
        <span style={{ fontFamily: serif, fontSize: 17, color: C.ink, flex: 1 }}>{navLabel()}</span>
        <button onClick={() => navigate(1)} style={{ width: 32, height: 32, borderRadius: 8, background: C.ivory, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 16, color: C.inkSoft }}>›</button>
        <Btn onClick={() => setAdding({ day: dayKey })}>+ Event</Btn>
      </div>

      {/* ── DAY ── */}
      {view === "day" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", background: C.ivory, borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: serif, fontSize: 20, color: C.ink, margin: 0, fontWeight: 400 }}>
              {base.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <div style={{ maxHeight: 480, overflowY: "auto" }}>
            {DAY_HOURS.map((h) => {
              const ev = events.find((e) => e.day === dayKey && e.hour === h);
              return (
                <div key={h} style={{ display: "flex", borderBottom: `1px solid ${C.border}`, minHeight: cellH }}>
                  <div style={{ width: 60, padding: "8px 12px", flexShrink: 0, borderRight: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: sans, fontSize: 11, color: C.inkMute }}>
                      {h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`}
                    </span>
                  </div>
                  <div
                    onClick={() => !ev && setAdding({ day: dayKey, hour: h })}
                    style={{ flex: 1, padding: "6px 10px", cursor: ev ? "default" : "pointer" }}
                  >
                    {ev && (
                      <div style={{ background: ev.color + "22", border: `1.5px solid ${ev.color}55`, borderRadius: 8, padding: "5px 10px" }}>
                        <span style={{ fontFamily: sans, fontSize: 12, color: C.ink, fontWeight: 500 }}>{ev.text}</span>
                        <span style={{ fontFamily: sans, fontSize: 10, color: C.inkMute, marginLeft: 6 }}>{ev.dur}h</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── WEEK ── */}
      {view === "week" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "52px repeat(7,1fr)", background: C.ivory, borderBottom: `1px solid ${C.border}` }}>
            <div />
            {weekDays.map((d, i) => {
              const isToday = fmtDate(d) === fmtDate(now);
              return (
                <div key={i} style={{ padding: "10px 6px", textAlign: "center" }}>
                  <p style={{ fontFamily: sans, fontSize: 10, color: C.inkMute, margin: 0, letterSpacing: "0.08em" }}>
                    {DAYS_SHORT[d.getDay()]}
                  </p>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: isToday ? C.blush : "transparent", display: "flex", alignItems: "center", justifyContent: "center", margin: "4px auto 0" }}>
                    <p style={{ fontFamily: sans, fontSize: 13, color: isToday ? "#fff" : C.ink, margin: 0, fontWeight: isToday ? 600 : 400 }}>
                      {d.getDate()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "52px repeat(7,1fr)", maxHeight: 440, overflowY: "auto" }}>
            {DAY_HOURS.map((h) => (
              <div key={h}>

                <div style={{ height: cellH, padding: "6px 8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: sans, fontSize: 10, color: C.inkMute }}>
                    {h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`}
                  </span>
                </div>
                {weekDays.map((d, di) => {
                  const k = fmtDate(d);
                  const ev = events.find((e) => e.day === k && e.hour === h);
                  return (
                    <div
                      key={`${h}-${di}`}
                      onClick={() => !ev && setAdding({ day: k, hour: h })}
                      style={{ height: cellH, borderLeft: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, cursor: "pointer", padding: 3 }}
                    >
                      {ev && (
                        <div style={{ height: "100%", background: ev.color + "22", border: `1.5px solid ${ev.color}55`, borderRadius: 6, padding: "3px 6px", overflow: "hidden" }}>
                          <span style={{ fontFamily: sans, fontSize: 10, color: C.ink, fontWeight: 500 }}>{ev.text}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── MONTH ── */}
      {view === "month" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", background: C.ivory, borderBottom: `1px solid ${C.border}` }}>
            {DAYS_SHORT.map((d) => (
              <div key={d} style={{ padding: "10px 0", textAlign: "center", fontFamily: sans, fontSize: 11, color: C.inkMute, letterSpacing: "0.06em" }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
            {monthCells.map((day, i) => {
              if (!day) return <div key={`e${i}`} style={{ minHeight: 80, borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.ivory }} />;
              const d = new Date(base.getFullYear(), base.getMonth(), day);
              const k = fmtDate(d);
              const isToday = k === fmtDate(now);
              const dayEvs = events.filter((e) => e.day === k);
              return (
                <div
                  key={k}
                  onClick={() => { setBase(d); setAdding({ day: k }); }}
                  style={{ minHeight: 80, borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "8px 8px 6px", cursor: "pointer", background: isToday ? C.blushLight : "transparent" }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: isToday ? C.blush : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                    <span style={{ fontFamily: sans, fontSize: 12, color: isToday ? "#fff" : C.ink, fontWeight: isToday ? 600 : 400 }}>{day}</span>
                  </div>
                  {dayEvs.slice(0, 2).map((ev) => (
                    <div key={ev.id} style={{ background: ev.color + "33", borderLeft: `2px solid ${ev.color}`, borderRadius: 4, padding: "2px 5px", marginBottom: 2, overflow: "hidden" }}>
                      <span style={{ fontFamily: sans, fontSize: 10, color: C.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{ev.text}</span>
                    </div>
                  ))}
                  {dayEvs.length > 2 && <span style={{ fontFamily: sans, fontSize: 9, color: C.inkMute }}>+{dayEvs.length - 2} more</span>}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ADD EVENT MODAL */}
      {adding && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(44,37,32,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 340, padding: 28 }}>
            <h3 style={{ fontFamily: serif, fontSize: 20, color: C.ink, margin: "0 0 18px", fontWeight: 400 }}>New Event</h3>
            <input
              autoFocus
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="What&apos;s happening?"
              style={{ width: "100%", background: C.ivory, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 14px", color: C.ink, fontSize: 14, fontFamily: sans, outline: "none", boxSizing: "border-box", marginBottom: 12 }}
            />
            {view !== "month" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
                <span style={{ fontFamily: sans, fontSize: 12, color: C.inkSoft, flexShrink: 0 }}>Time:</span>
                <select
                  value={newHour}
                  onChange={(e) => setNewHour(+e.target.value)}
                  style={{ flex: 1, background: C.ivory, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", color: C.ink, fontSize: 13, fontFamily: sans, outline: "none" }}
                >
                  {DAY_HOURS.map((h) => (
                    <option key={h} value={h}>{h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`}</option>
                  ))}
                </select>
              </div>
            )}
            <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontFamily: sans, fontSize: 12, color: C.inkSoft }}>Duration:</span>
              {[0.5, 1, 1.5, 2, 3].map((d) => (
                <button
                  key={d}
                  onClick={() => setNewDur(d)}
                  style={{ padding: "4px 10px", borderRadius: 6, background: newDur === d ? C.blushLight : C.ivory, border: `1px solid ${newDur === d ? C.blush : C.border}`, color: newDur === d ? C.blush : C.inkSoft, fontSize: 12, fontFamily: sans, cursor: "pointer" }}
                >
                  {d}h
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
              <span style={{ fontFamily: sans, fontSize: 12, color: C.inkSoft }}>Color:</span>
              {EVT_COLORS.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setNewColor(i)}
                  style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: newColor === i ? `3px solid ${C.ink}` : "3px solid transparent", cursor: "pointer" }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn filled onClick={saveEvent} style={{ flex: 1 }}>Save</Btn>
              <Btn onClick={() => setAdding(null)} color={C.inkSoft} bg={C.ivory} style={{ flex: 1 }}>Cancel</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// JOURNAL
// ─────────────────────────────────────────────
interface JEntry {
  id: number;
  date: string;
  mood: string;
  tag: string;
  title: string;
  text: string;
}

const PROMPTS = [
  "What are you grateful for today?",
  "How are you really feeling?",
  "What do you want to let go of?",
  "What&apos;s been quietly on your mind?",
  "Describe your ideal tomorrow.",
];
const J_TAGS = ["gratitude", "reflection", "dream", "vent", "plan", "memory"];
const J_MOODS = ["✨", "🌿", "🌸", "☁️", "🌧️", "🔥", "💭"];

function JournalPage() {
  const [entries, setEntries] = useState<JEntry[]>([
    { id: 1, date: "May 25", mood: "🌿", tag: "gratitude", title: "Sunday stillness", text: "Grateful for slow mornings and good coffee. Small joys are still joys." },
  ]);
  const [mode, setMode] = useState<"list" | "write" | "read">("list");
  const [current, setCurrent] = useState<JEntry | null>(null);
  const [draft, setDraft] = useState({ title: "", text: "", mood: "🌸", tag: "reflection" });
  const [pi, setPi] = useState(0);

  const saveDraft = () => {
    if (!draft.text.trim()) return;
    setEntries([{
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ...draft,
    }, ...entries]);
    setDraft({ title: "", text: "", mood: "🌸", tag: "reflection" });
    setMode("list");
  };

  if (mode === "write") return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: serif, fontSize: 30, color: C.ink, margin: 0, fontWeight: 400 }}>New Entry</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn onClick={() => setMode("list")} color={C.inkSoft} bg={C.ivory}>← Back</Btn>
          <Btn filled onClick={saveDraft}>Save</Btn>
        </div>
      </div>
      <Card>
        <div style={{ background: C.blushLight, borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: serif, fontSize: 14, color: C.blush, margin: 0, fontStyle: "italic" }}>
            &quot;{PROMPTS[pi]}&quot;
          </p>
          <button onClick={() => setPi((pi + 1) % PROMPTS.length)} style={{ background: "transparent", border: "none", color: C.blush, cursor: "pointer", fontSize: 12, fontFamily: sans, marginLeft: 12 }}>
            next ›
          </button>
        </div>
        <input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Title (optional)"
          style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.border}`, color: C.ink, fontSize: 22, fontFamily: serif, padding: "8px 0", marginBottom: 16, outline: "none", boxSizing: "border-box" }}
        />
        <textarea
          value={draft.text}
          onChange={(e) => setDraft({ ...draft, text: e.target.value })}
          placeholder="Write anything. This space is just for you."
          rows={10}
          style={{ width: "100%", background: "transparent", border: "none", color: C.ink, fontSize: 15, fontFamily: sans, lineHeight: 1.85, resize: "none", outline: "none", boxSizing: "border-box" }}
        />
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontFamily: sans, fontSize: 12, color: C.inkMute }}>Mood:</span>
            {J_MOODS.map((m) => (
              <button key={m} onClick={() => setDraft({ ...draft, mood: m })} style={{ fontSize: 18, background: draft.mood === m ? C.blushLight : "transparent", border: draft.mood === m ? `2px solid ${C.blush}` : "2px solid transparent", borderRadius: 6, padding: "3px 5px", cursor: "pointer" }}>{m}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: sans, fontSize: 12, color: C.inkMute }}>Tag:</span>
            {J_TAGS.map((t) => (
              <button key={t} onClick={() => setDraft({ ...draft, tag: t })} style={{ padding: "4px 10px", borderRadius: 20, background: draft.tag === t ? C.blushLight : C.ivory, border: `1px solid ${draft.tag === t ? C.blush : C.border}`, color: draft.tag === t ? C.blush : C.inkSoft, fontSize: 11, fontFamily: sans, cursor: "pointer" }}>{t}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  if (mode === "read" && current) return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Btn onClick={() => setMode("list")} color={C.inkSoft} bg={C.ivory}>← Back</Btn>
        <Btn onClick={() => { setEntries(entries.filter((e) => e.id !== current.id)); setMode("list"); }} color="#B05050" bg="#F5E4E4">Delete</Btn>
      </div>
      <Card>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 32 }}>{current.mood}</span>
          <div>
            <p style={{ margin: 0, fontFamily: sans, fontSize: 11, color: C.inkMute }}>{current.date} · #{current.tag}</p>
            <h2 style={{ margin: 0, fontFamily: serif, fontSize: 26, color: C.ink, fontWeight: 400 }}>{current.title || "Entry"}</h2>
          </div>
        </div>
        <p style={{ fontFamily: sans, fontSize: 15, color: C.inkSoft, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{current.text}</p>
      </Card>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <Label>Your stories</Label>
          <h2 style={{ fontFamily: serif, fontSize: 30, color: C.ink, margin: 0, fontWeight: 400 }}>Journal</h2>
        </div>
        <Btn filled onClick={() => setMode("write")}>✏️ New Entry</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {entries.map((e) => (
          <Card key={e.id} onClick={() => { setCurrent(e); setMode("read"); }} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>{e.mood}</span>
                <span style={{ fontFamily: sans, fontSize: 11, color: C.inkMute }}>{e.date}</span>
              </div>
              <Chip>#{e.tag}</Chip>
            </div>
            <h4 style={{ fontFamily: serif, fontSize: 17, color: C.ink, margin: "0 0 6px", fontWeight: 400 }}>{e.title || "Entry"}</h4>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.inkSoft, lineHeight: 1.65, margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" } as CSSProperties}>{e.text}</p>
          </Card>
        ))}
        {entries.length === 0 && (
          <Card style={{ gridColumn: "1/3", textAlign: "center", padding: 48 }}>
            <p style={{ fontFamily: serif, fontSize: 20, color: C.inkSoft, fontStyle: "italic" }}>Your journal is waiting.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HABITS
// ─────────────────────────────────────────────
interface Habit {
  id: number;
  name: string;
  icon: string;
  color: string;
  streak: number;
  log: number[];
}

const H_ICONS = ["🧘", "💧", "📚", "🏃", "🥗", "🛏️", "✍️", "🌿", "💊", "🎨"];
const H_COLORS = [C.blush, C.sage, C.latte, "#A08CC0", C.clay, "#6BAED6"];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Morning meditation", icon: "🧘", color: C.blush, streak: 12, log: [1, 1, 1, 1, 1, 0, 1] },
    { id: 2, name: "Drink 2L water", icon: "💧", color: C.sage, streak: 5, log: [0, 1, 1, 1, 1, 1, 1] },
    { id: 3, name: "Read 20 mins", icon: "📚", color: C.latte, streak: 23, log: [1, 1, 1, 1, 1, 0, 1] },
    { id: 4, name: "Evening walk", icon: "🏃", color: "#A08CC0", streak: 3, log: [0, 0, 0, 0, 1, 1, 1] },
  ]);
  const [adding, setAdding] = useState(false);
  const [newH, setNewH] = useState({ name: "", icon: "🌿", color: C.blush });

  const toggle = (id: number, di: number) =>
    setHabits(habits.map((h) =>
      h.id === id ? { ...h, log: h.log.map((v, i) => i === di ? (v ? 0 : 1) : v) } : h
    ));

  const createHabit = () => {
    if (!newH.name.trim()) return;
    setHabits([...habits, { id: Date.now(), ...newH, streak: 0, log: [0, 0, 0, 0, 0, 0, 0] }]);
    setAdding(false);
    setNewH({ name: "", icon: "🌿", color: C.blush });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <Label>Quietly growing</Label>
          <h2 style={{ fontFamily: serif, fontSize: 30, color: C.ink, margin: 0, fontWeight: 400 }}>Habits</h2>
        </div>
        <Btn filled onClick={() => setAdding(true)}>+ New</Btn>
      </div>

      {/* weekly grid */}
      <Card style={{ marginBottom: 16, padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "180px repeat(7,1fr)", gap: 4, alignItems: "center" }}>
          <div />
          {DAY_LABELS.map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontFamily: sans, fontSize: 11, color: C.inkMute, fontWeight: 500 }}>{d}</div>
          ))}
          {habits.map((h) => (
            <React.Fragment key={h.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{h.icon}</span>
                <div>
                  <p style={{ margin: 0, fontFamily: sans, fontSize: 12, color: C.ink, fontWeight: 500 }}>{h.name}</p>
                  <p style={{ margin: 0, fontFamily: sans, fontSize: 10, color: C.inkMute }}>{h.streak}d 🔥</p>
                </div>
              </div>
              {h.log.map((v, di) => (
                <div key={di} onClick={() => toggle(h.id, di)} style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: v ? h.color + "cc" : C.ivory, border: `1px solid ${v ? h.color : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                    {v ? "✓" : ""}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {habits.map((h) => {
          const done = h.log.filter(Boolean).length;
          const pct = Math.round((done / 7) * 100);
          return (
            <Card key={h.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: h.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{h.icon}</div>
                  <div>
                    <p style={{ margin: 0, fontFamily: sans, fontSize: 13, color: C.ink, fontWeight: 500 }}>{h.name}</p>
                    <p style={{ margin: 0, fontFamily: sans, fontSize: 10, color: C.inkMute }}>{h.streak} day streak 🔥</p>
                  </div>
                </div>
                <span style={{ fontFamily: serif, fontSize: 20, color: h.color }}>{pct}%</span>
              </div>
              <div style={{ marginTop: 12, background: C.stone, borderRadius: 4, height: 5, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: h.color, borderRadius: 4, transition: "width 0.5s" }} />
              </div>
              <p style={{ fontFamily: sans, fontSize: 11, color: C.inkMute, margin: "6px 0 0" }}>{done} of 7 days this week</p>
            </Card>
          );
        })}
      </div>

      {/* modal */}
      {adding && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(44,37,32,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 320, padding: 28 }}>
            <h3 style={{ fontFamily: serif, fontSize: 20, color: C.ink, margin: "0 0 16px", fontWeight: 400 }}>New Habit</h3>
            <input
              value={newH.name}
              onChange={(e) => setNewH({ ...newH, name: e.target.value })}
              placeholder="Habit name..."
              style={{ width: "100%", background: C.ivory, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 14px", color: C.ink, fontSize: 14, fontFamily: sans, outline: "none", boxSizing: "border-box", marginBottom: 14 }}
            />
            <p style={{ fontFamily: sans, fontSize: 12, color: C.inkMute, marginBottom: 8 }}>Icon:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {H_ICONS.map((ic) => (
                <button key={ic} onClick={() => setNewH({ ...newH, icon: ic })} style={{ fontSize: 20, background: newH.icon === ic ? C.blushLight : "transparent", border: newH.icon === ic ? `2px solid ${C.blush}` : "2px solid transparent", borderRadius: 8, padding: "4px 6px", cursor: "pointer" }}>{ic}</button>
              ))}
            </div>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.inkMute, marginBottom: 8 }}>Color:</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              {H_COLORS.map((c, i) => (
                <div key={i} onClick={() => setNewH({ ...newH, color: c })} style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: newH.color === c ? `3px solid ${C.ink}` : "3px solid transparent", cursor: "pointer" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn filled onClick={createHabit} style={{ flex: 1 }}>Create</Btn>
              <Btn onClick={() => setAdding(false)} color={C.inkSoft} bg={C.ivory} style={{ flex: 1 }}>Cancel</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// AMBIENT
// ─────────────────────────────────────────────
const SOUNDS = [
  { k: "rain", label: "Soft Rain", icon: "🌧️", color: C.sage, desc: "gentle drops on leaves" },
  { k: "cafe", label: "Café Murmur", icon: "☕", color: C.latte, desc: "warm chatter, espresso" },
  { k: "forest", label: "Forest", icon: "🌿", color: C.sage, desc: "birds, breeze, rustling" },
  { k: "ocean", label: "Ocean Waves", icon: "🌊", color: "#6BAED6", desc: "slow, steady tide" },
  { k: "fireplace", label: "Fireplace", icon: "🔥", color: C.clay, desc: "crackling warmth" },
  { k: "lofi", label: "Lofi Beats", icon: "🎵", color: C.blush, desc: "chill, mellow, focus" },
];
const GUIDED = [
  { title: "Box Breathing", desc: "4 counts in · hold · out · hold", steps: ["Inhale slowly... 1, 2, 3, 4", "Hold gently... 1, 2, 3, 4", "Exhale softly... 1, 2, 3, 4", "Hold peacefully... 1, 2, 3, 4"] },
  { title: "Body Scan", desc: "Release tension head to toe", steps: ["Soften your face & jaw", "Release your shoulders", "Unclench your hands", "Let your legs go heavy"] },
  { title: "5-4-3-2-1 Grounding", desc: "Anchor with your senses", steps: ["Name 5 things you see", "Touch 4 things around you", "Notice 3 sounds you hear", "Sense 2 things you can smell"] },
];

function AmbientPage() {
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [timer, setTimer] = useState<number | null>(null);
  const [guided, setGuided] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Label>Your sanctuary</Label>
        <h2 style={{ fontFamily: serif, fontSize: 30, color: C.ink, margin: 0, fontWeight: 400 }}>Ambient</h2>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, margin: "0 0 16px" }}>Mix sounds · tap to toggle · adjust volume</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {SOUNDS.map((s) => (
            <div
              key={s.k}
              onClick={() => setPlaying((p) => ({ ...p, [s.k]: !p[s.k] }))}
              style={{ background: playing[s.k] ? s.color + "22" : C.ivory, border: `1.5px solid ${playing[s.k] ? s.color : "transparent"}`, borderRadius: 12, padding: "14px 12px", cursor: "pointer" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: playing[s.k] ? s.color : C.stone, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {playing[s.k] && <span style={{ color: "#fff", fontSize: 9 }}>▶</span>}
                </div>
              </div>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.ink, fontWeight: 500, margin: "8px 0 2px" }}>{s.label}</p>
              <p style={{ fontFamily: sans, fontSize: 10, color: C.inkMute, margin: 0 }}>{s.desc}</p>
              {playing[s.k] && (
                <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 8 }}>
                  <input
                    type="range" min={0} max={100}
                    value={volumes[s.k] ?? 70}
                    onChange={(e) => setVolumes((v) => ({ ...v, [s.k]: +e.target.value }))}
                    style={{ width: "100%", accentColor: s.color }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* timer */}
        <Card>
          <Label>Focus timer</Label>
          <p style={{ fontFamily: serif, fontSize: 18, color: C.ink, margin: "2px 0 14px", fontWeight: 400 }}>Set a session</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[5, 10, 20, 30, 45, 60].map((t) => (
              <button key={t} onClick={() => setTimer(t)} style={{ padding: "7px 14px", borderRadius: 20, background: timer === t ? C.blushLight : C.ivory, border: `1px solid ${timer === t ? C.blush : C.border}`, color: timer === t ? C.blush : C.inkSoft, fontSize: 12, fontFamily: sans, cursor: "pointer", fontWeight: timer === t ? 600 : 400 }}>
                {t} min
              </button>
            ))}
          </div>
          {timer && (
            <div style={{ marginTop: 18, background: C.blushLight, borderRadius: 12, padding: 16, textAlign: "center" }}>
              <p style={{ fontFamily: serif, fontSize: 40, color: C.blush, margin: 0 }}>{timer}:00</p>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.inkSoft, margin: "4px 0 12px" }}>ready when you are</p>
              <Btn filled>▶ Start</Btn>
            </div>
          )}
        </Card>

        {/* breathing */}
        <Card>
          <Label>Guided practice</Label>
          <p style={{ fontFamily: serif, fontSize: 18, color: C.ink, margin: "2px 0 14px", fontWeight: 400 }}>Breathe with me</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {GUIDED.map((g, i) => (
              <div key={i} onClick={() => { setGuided(guided === i ? null : i); setStep(0); }} style={{ background: guided === i ? C.sageLight : C.ivory, border: `1.5px solid ${guided === i ? C.sage : "transparent"}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer" }}>
                <p style={{ margin: 0, fontFamily: sans, fontSize: 13, color: C.ink, fontWeight: 500 }}>{g.title}</p>
                <p style={{ margin: "2px 0 0", fontFamily: sans, fontSize: 11, color: C.inkSoft }}>{g.desc}</p>
                {guided === i && (
                  <div style={{ marginTop: 12 }}>
                    <p style={{ fontFamily: serif, fontSize: 16, color: C.sage, fontStyle: "italic", margin: "0 0 10px" }}>{g.steps[step]}</p>
                    <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                      {g.steps.map((_, si) => <div key={si} style={{ flex: 1, height: 3, borderRadius: 2, background: si <= step ? C.sage : C.stone }} />)}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn onClick={(e) => { e.stopPropagation(); setStep(Math.max(0, step - 1)); }} color={C.inkSoft} bg={C.ivory} style={{ padding: "4px 12px" }}>‹</Btn>
                      <Btn onClick={(e) => { e.stopPropagation(); setStep((step + 1) % g.steps.length); }} color={C.sage} bg={C.sageLight} style={{ padding: "4px 12px" }}>›</Btn>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MEMORIES
// ─────────────────────────────────────────────
interface Memory {
  id: number;
  caption: string;
  date: string;
  tag: string;
  src: string | null;
}

const MEM_TAGS = ["daily", "food", "nature", "travel", "people", "moments"];
const TAG_COLORS: Record<string, string> = {
  daily: "#C4907A", food: "#C4A882", nature: "#8A9E80",
  travel: "#6BAED6", people: "#A08CC0", moments: "#B8947A",
};
const TAG_EMOJIS: Record<string, string> = {
  daily: "🌅", food: "🍞", nature: "🌿",
  travel: "✈️", people: "💛", moments: "🌸",
};

function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([
    { id: 1, caption: "Morning coffee on the balcony", date: "May 20", tag: "daily", src: null },
    { id: 2, caption: "First attempt at sourdough — not bad!", date: "May 18", tag: "food", src: null },
    { id: 3, caption: "Sunset walk by the river", date: "May 15", tag: "nature", src: null },
  ]);
  const [adding, setAdding] = useState(false);
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState("daily");
  const [preview, setPreview] = useState<string | null>(null);
  const [viewing, setViewing] = useState<Memory | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const save = () => {
    setMemories([{
      id: Date.now(), caption,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      tag, src: preview,
    }, ...memories]);
    setAdding(false); setCaption(""); setPreview(null); setTag("daily");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <Label>Collected moments</Label>
          <h2 style={{ fontFamily: serif, fontSize: 30, color: C.ink, margin: 0, fontWeight: 400 }}>Memories</h2>
        </div>
        <Btn filled onClick={() => setAdding(true)}>📷 Add Memory</Btn>
      </div>

      <div style={{ columns: 3, gap: 14 }}>
        {memories.map((m) => (
          <div key={m.id} style={{ breakInside: "avoid", marginBottom: 14, cursor: "pointer" }} onClick={() => setViewing(m)}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {m.src
                ? <img src={m.src} alt={m.caption} style={{ width: "100%", display: "block", maxHeight: 220, objectFit: "cover" }} />
                : <div style={{ background: TAG_COLORS[m.tag] + "22", height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>{TAG_EMOJIS[m.tag]}</div>
              }
              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <Chip color={TAG_COLORS[m.tag]} bg={TAG_COLORS[m.tag] + "22"}>#{m.tag}</Chip>
                  <span style={{ fontFamily: sans, fontSize: 11, color: C.inkMute }}>{m.date}</span>
                </div>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, margin: 0, lineHeight: 1.5 }}>{m.caption}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* add modal */}
      {adding && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(44,37,32,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 370, padding: 28 }}>
            <h3 style={{ fontFamily: serif, fontSize: 20, color: C.ink, margin: "0 0 18px", fontWeight: 400 }}>New Memory</h3>
            <div
              onClick={() => fileRef.current?.click()}
              style={{ background: C.ivory, border: `2px dashed ${C.borderMed}`, borderRadius: 12, height: 170, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 14, overflow: "hidden" }}
            >
              {preview
                ? <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <>
                  <span style={{ fontSize: 36 }}>📷</span>
                  <p style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, margin: "8px 0 0" }}>tap to upload a photo</p>
                </>
              }
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What&apos;s this moment about?"
              style={{ width: "100%", background: C.ivory, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 14px", color: C.ink, fontSize: 14, fontFamily: sans, outline: "none", boxSizing: "border-box", marginBottom: 12 }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
              {MEM_TAGS.map((t) => (
                <button key={t} onClick={() => setTag(t)} style={{ padding: "4px 12px", borderRadius: 20, background: tag === t ? TAG_COLORS[t] + "22" : C.ivory, border: `1px solid ${tag === t ? TAG_COLORS[t] : C.border}`, color: tag === t ? TAG_COLORS[t] : C.inkSoft, fontSize: 11, fontFamily: sans, cursor: "pointer" }}>#{t}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn filled onClick={save} style={{ flex: 1 }}>Save Memory</Btn>
              <Btn onClick={() => { setAdding(false); setPreview(null); }} color={C.inkSoft} bg={C.ivory} style={{ flex: 1 }}>Cancel</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* view modal */}
      {viewing && (
        <div onClick={() => setViewing(null)} style={{ position: "fixed", inset: 0, background: "rgba(44,37,32,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <Card style={{ width: 440, padding: 0, overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            {viewing.src
              ? <img src={viewing.src} alt={viewing.caption} style={{ width: "100%", maxHeight: 320, objectFit: "cover", display: "block" }} />
              : <div style={{ background: TAG_COLORS[viewing.tag] + "22", height: 200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>{TAG_EMOJIS[viewing.tag]}</div>
            }
            <div style={{ padding: "16px 20px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <Chip color={TAG_COLORS[viewing.tag]} bg={TAG_COLORS[viewing.tag] + "22"}>#{viewing.tag}</Chip>
                <span style={{ fontFamily: sans, fontSize: 12, color: C.inkMute }}>{viewing.date}</span>
              </div>
              <p style={{ fontFamily: sans, fontSize: 15, color: C.inkSoft, margin: "0 0 14px", lineHeight: 1.6 }}>{viewing.caption}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Btn onClick={() => { setMemories(memories.filter((m) => m.id !== viewing.id)); setViewing(null); }} color="#B05050" bg="#F5E4E4">Delete</Btn>
                <Btn onClick={() => setViewing(null)} color={C.inkSoft} bg={C.ivory}>Close</Btn>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT EXPORT — Next.js page
// ─────────────────────────────────────────────
export default function Page() {
  const [page, setPage] = useState("home");

  const content: Record<string, React.ReactNode> = {
    home: <HomePage />,
    planner: <PlannerPage />,
    journal: <JournalPage />,
    habits: <HabitsPage />,
    ambient: <AmbientPage />,
    memories: <MemoriesPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: sans, color: C.ink }}>
      <SideNav page={page} setPage={setPage} />
      <main style={{ marginLeft: 76, padding: "36px 44px", minHeight: "100vh" }}>
        {content[page]}
      </main>
    </div>
  );
}
import { useState } from "react";
import { User, Sparkles, Mic, ChevronDown, Clock } from "lucide-react";
import { motion } from "motion/react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang } from "../constants/translations";
import { GRADES, SUBJECTS_DATA, RECENT_QUERIES_DATA } from "../constants/data";
import { BottomNav } from "../components/BottomNav";
import { AppHeader } from "../components/AppHeader";

export function HomeScreen({ lang, onQuery, onNavigate, offline, setOffline }: {
  lang: Lang;
  onQuery: () => void;
  onNavigate: (s: Screen) => void;
  offline: boolean;
  setOffline: (v: boolean) => void;
}) {
  const [micActive, setMicActive] = useState(false);
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("5");
  const [subject, setSubject] = useState(SUBJECTS_DATA[lang][1]);
  const t = TRANSLATIONS[lang];
  const subjects = SUBJECTS_DATA[lang];
  const recentQueries = RECENT_QUERIES_DATA[lang];

  const handleMic = () => {
    setMicActive(!micActive);
    if (!micActive) {
      setTimeout(() => { setMicActive(false); setQuery(t.micQuery); }, 2500);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: C.bg, position: "relative" }}>
      <AppHeader lang={lang} offline={offline} setOffline={setOffline} onNavigate={onNavigate} />

      <div className="flex-1 px-5 py-4 flex flex-col items-center gap-4 overflow-y-auto">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {/* Hero banner */}
          <div className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: C.primary, boxShadow: `0 4px 16px ${C.primary}40` }}>
            <div className="rounded-xl flex items-center justify-center"
              style={{ width: 44, height: 44, background: "rgba(255,255,255,0.15)", flexShrink: 0 }}>
              <Sparkles size={22} color={C.secondary} />
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500 }}>{t.todayChallenge}</p>
              <p style={{ color: C.white, fontSize: 14, fontWeight: 600, marginTop: 2 }}>{t.challengeText}</p>
            </div>
          </div>

          {/* Main input card */}
          <div className="rounded-2xl p-5 flex flex-col items-center gap-4"
            style={{ background: C.white, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `1px solid ${C.slate300}` }}>

            {/* Mic FAB */}
            <div className="relative flex items-center justify-center">
              {micActive && (
                <>
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    style={{ position: "absolute", width: 96, height: 96, borderRadius: "50%", background: C.success }} />
                  <motion.div animate={{ scale: [1, 1.7, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                    style={{ position: "absolute", width: 96, height: 96, borderRadius: "50%", background: C.success }} />
                </>
              )}
              <button onClick={handleMic}
                className="relative z-10 flex items-center justify-center rounded-full transition-all active:scale-95"
                style={{
                  width: 80, height: 80, border: "none", cursor: "pointer",
                  background: micActive ? C.success : C.secondary,
                  boxShadow: `0 6px 20px ${micActive ? C.success : C.secondary}60`,
                }}>
                <Mic size={34} color={C.white} />
              </button>
            </div>

            <p style={{ color: C.slate500, fontSize: 13 }}>
              {micActive ? t.listening : t.tapToSpeak}
            </p>

            {/* Divider */}
            <div className="w-full flex items-center gap-2">
              <div style={{ flex: 1, height: 1, background: C.slate300 }} />
              <span style={{ color: C.slate500, fontSize: 12 }}>{t.orTypeHere}</span>
              <div style={{ flex: 1, height: 1, background: C.slate300 }} />
            </div>

            {/* Text area */}
            <textarea value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder={t.typePlaceholder} rows={3}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 16,
                border: `1.5px solid ${query ? C.primary : C.slate300}`,
                fontSize: 15, color: C.slate900, resize: "none", outline: "none",
                background: C.slate100, fontFamily: "inherit",
              }} />

            {/* Context dropdowns */}
            <div className="w-full flex gap-2 flex-wrap">
              {[
                { key: "grade", value: grade, options: GRADES, setter: setGrade, formatOpt: (o: string) => `${t.gradeDropPrefix} ${o}` },
                { key: "subject", value: subject, options: subjects, setter: setSubject, formatOpt: (o: string) => o },
              ].map(({ key, value, options, setter, formatOpt }) => (
                <div key={key} className="relative flex-1 min-w-[120px]">
                  <select value={value} onChange={(e) => setter(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 100,
                      border: `1.5px solid ${C.primary}`, color: C.primary, background: `${C.primary}10`,
                      fontSize: 14, fontWeight: 600, cursor: "pointer",
                      outline: "none", appearance: "none", fontFamily: "inherit",
                    }}>
                    {options.map((o) => <option key={o} value={o}>{formatOpt(o)}</option>)}
                  </select>
                  <ChevronDown size={14} color={C.primary}
                    style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                </div>
              ))}
            </div>

            {/* Submit */}
            <button onClick={() => (query || micActive) && onQuery()}
              className="w-full rounded-full transition-all active:scale-95"
              style={{
                padding: "14px 0", minHeight: 50,
                background: query ? C.primary : C.slate300,
                color: C.white, fontSize: 16, fontWeight: 600, border: "none",
                cursor: query ? "pointer" : "default",
                boxShadow: query ? `0 4px 14px ${C.primary}40` : "none",
              }}>
              {t.askAI}
            </button>
          </div>

          {/* Recent history carousel */}
          <div>
            <p style={{ color: C.slate700, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{t.recentQueries}</p>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {recentQueries.map((q) => (
                <div key={q.id} className="flex-shrink-0 rounded-2xl p-3"
                  style={{ width: 160, background: C.white, border: `1px solid ${C.slate300}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <div className="rounded-full px-2 py-0.5 inline-block mb-2"
                    style={{ background: `${C.primary}15`, fontSize: 11, color: C.primary, fontWeight: 600 }}>
                    {q.subject}
                  </div>
                  <p style={{ color: C.slate900, fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{q.query}</p>
                  <p style={{ color: C.slate500, fontSize: 11, marginTop: 6 }}>{q.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav lang={lang} activeScreen="home" onNavigate={onNavigate} />
    </div>
  );
}

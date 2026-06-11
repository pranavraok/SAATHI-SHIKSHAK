import { useState } from "react";
import { ArrowLeft, Filter, ChevronRight } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";
import { HISTORY_ITEMS_DATA, SUBJECTS_DATA } from "../constants/data";
import { BottomNav } from "../components/BottomNav";
import { AppHeader } from "../components/AppHeader";

export function HistoryScreen({ lang, onNavigate, offline, setOffline }: { lang: Lang; onNavigate: (s: Screen) => void; offline: boolean; setOffline: (v: boolean) => void }) {
  const [filter, setFilter] = useState("__all__");
  const t = TRANSLATIONS[lang];
  const historyItems = HISTORY_ITEMS_DATA[lang];
  const subjects = SUBJECTS_DATA[lang];
  const filters = [{ key: "__all__", label: t.filterAll }, ...subjects.map((s) => ({ key: s, label: s }))];

  const filtered = filter === "__all__" ? historyItems : historyItems.filter((h) => h.subject === filter);

  return (
    <div className="flex flex-col h-full" style={{ background: C.bg }}>
      <AppHeader lang={lang} offline={offline} setOffline={setOffline} onNavigate={onNavigate} title={t.sessionHistory} />

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col items-center gap-4">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {/* Insight card */}
          <div className="rounded-2xl p-4 flex items-start gap-3"
            style={{ background: `${C.secondary}15`, border: `1.5px solid ${C.secondary}40` }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
            <div>
              <p style={{ color: "#92400E", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{t.patternFound}</p>
              <p style={{ color: "#92400E", fontSize: 13, lineHeight: 1.5 }}>{t.patternText}</p>
              <button onClick={() => onNavigate("pattern")} style={{ background: "none", border: "none", color: C.secondary, fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 4, padding: 0 }}>
                {t.viewResources}
              </button>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {filters.map(({ key, label }) => (
              <button key={key} onClick={() => setFilter(key)}
                className="flex-shrink-0 rounded-full transition-all"
                style={{
                  padding: "8px 16px", minHeight: 36, cursor: "pointer", fontSize: 14,
                  border: `1px solid ${filter === key ? C.primary : C.slate300}`,
                  background: filter === key ? C.primary : C.white,
                  color: filter === key ? C.white : C.slate700,
                  fontWeight: filter === key ? 600 : 400,
                  boxShadow: filter === key ? `0 2px 8px ${C.primary}30` : "0 1px 2px rgba(0,0,0,0.06)",
                } as React.CSSProperties}>
                {label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-3">
            {filtered.map((item, idx) => (
              <div key={item.id}>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center" style={{ paddingTop: 16 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%", background: C.primary, flexShrink: 0,
                      border: `2px solid ${C.white}`, boxShadow: `0 0 0 2px ${C.primary}`,
                    }} />
                    {idx < filtered.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: C.slate300, minHeight: 24, marginTop: 4 }} />
                    )}
                  </div>
                  <div className="flex-1 rounded-2xl p-4 mb-2"
                    style={{ background: C.white, border: `1px solid ${C.slate300}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="rounded-full px-2 py-0.5"
                        style={{ background: `${C.primary}15`, color: C.primary, fontSize: 11, fontWeight: 600 }}>
                        {item.subject}
                      </span>
                      <span style={{ color: C.slate500, fontSize: 11 }}>{item.date}</span>
                    </div>
                    <p style={{ color: C.slate900, fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>
                      {item.query}
                    </p>
                    <p style={{ color: C.slate500, fontSize: 13, lineHeight: 1.4 }}>{item.snippet}</p>
                    <button onClick={() => onNavigate("response")} className="flex items-center justify-end mt-3" style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <span style={{ color: C.primary, fontSize: 13, fontWeight: 500 }}>{t.viewFull}</span>
                      <ChevronRight size={16} color={C.primary} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav lang={lang} activeScreen="history" onNavigate={onNavigate} />
    </div>
  );
}

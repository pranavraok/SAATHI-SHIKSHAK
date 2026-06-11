import { useState } from "react";
import { BookOpen, CheckCircle } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";
import { GRADES, SUBJECTS_DATA } from "../constants/data";

export function OnboardingScreen({ lang, onNext }: { lang: Lang; onNext: (s: Screen) => void }) {
  const [selectedGrades, setSelectedGrades] = useState<Set<string>>(new Set());
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set());
  const t = TRANSLATIONS[lang];
  const subjects = SUBJECTS_DATA[lang];

  const toggle = <T extends string>(set: Set<T>, val: T): Set<T> => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    return next;
  };
  const canContinue = selectedGrades.size > 0 && selectedSubjects.size > 0;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: C.bg }}>
      <div className="px-6 pt-8 pb-4" style={{ background: C.white, borderBottom: `1px solid ${C.slate300}` }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-xl flex items-center justify-center"
            style={{ width: 36, height: 36, background: C.primary }}>
            <BookOpen size={18} color={C.white} />
          </div>
          <span style={{ color: C.primary, fontSize: 13, fontWeight: 600 }}>{t.appName}</span>
        </div>
        <h2 style={{ color: C.slate900, marginTop: 8 }}>{t.whatTeach}</h2>
        <p style={{ color: C.slate500, fontSize: 14, marginTop: 4 }}>{t.whatTeachSub}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6 items-center">
        <div className="w-full max-w-lg flex flex-col gap-6">
          {/* Grades */}
          <div>
            <p style={{ color: C.slate700, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.gradeLabel}</p>
            <div className="flex flex-wrap gap-2">
              {GRADES.map((g) => {
                const active = selectedGrades.has(g);
                return (
                  <button key={g} onClick={() => setSelectedGrades(toggle(selectedGrades, g))}
                    className="transition-all active:scale-95"
                    style={{
                      minWidth: 52, minHeight: 48, padding: "8px 14px", borderRadius: 100,
                      fontSize: 15, fontWeight: active ? 600 : 400,
                      background: active ? C.primary : C.white,
                      color: active ? C.white : C.slate700,
                      border: `1.5px solid ${active ? C.primary : C.slate300}`,
                      cursor: "pointer",
                      boxShadow: active ? `0 2px 8px ${C.primary}30` : "0 1px 2px rgba(0,0,0,0.06)",
                    }}>
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <p style={{ color: C.slate700, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.subjectLabel}</p>
            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => {
                const active = selectedSubjects.has(s);
                return (
                  <button key={s} onClick={() => setSelectedSubjects(toggle(selectedSubjects, s))}
                    className="transition-all active:scale-95"
                    style={{
                      minHeight: 48, padding: "8px 18px", borderRadius: 100,
                      fontSize: 15, fontWeight: active ? 600 : 400,
                      background: active ? C.secondary : C.white,
                      color: active ? C.white : C.slate700,
                      border: `1.5px solid ${active ? C.secondary : C.slate300}`,
                      cursor: "pointer",
                      boxShadow: active ? `0 2px 8px ${C.secondary}40` : "0 1px 2px rgba(0,0,0,0.06)",
                    }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl p-4 flex items-start gap-3"
            style={{ background: `${C.primary}10`, border: `1px solid ${C.primary}20` }}>
            <CheckCircle size={18} color={C.primary} style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ color: C.primary, fontSize: 13 }}>{t.privacyNote}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 shadow-lg flex justify-center" style={{ background: C.white, borderTop: `1px solid ${C.slate300}` }}>
        <button onClick={() => canContinue && onNext("home")}
          className="w-full max-w-lg rounded-full transition-all active:scale-95"
          style={{
            padding: "16px 0", minHeight: 52,
            background: canContinue ? C.primary : C.slate300,
            color: C.white, fontSize: 17, fontWeight: 600, border: "none",
            cursor: canContinue ? "pointer" : "default",
            boxShadow: canContinue ? `0 4px 16px ${C.primary}40` : "none",
          }}>
          {t.continueBtn}
        </button>
      </div>
    </div>
  );
}

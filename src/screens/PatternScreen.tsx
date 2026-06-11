import { ArrowLeft, Lightbulb, FileText, Video, Download, PlayCircle } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang } from "../constants/translations";

export function PatternScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-3"
        style={{ background: C.white, borderBottom: `1px solid ${C.slate300}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <ArrowLeft size={22} color={C.slate700} />
        </button>
        <span style={{ color: C.slate900, fontSize: 16, fontWeight: 600 }}>{t.patternInsightTitle}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          
          {/* Hero insight */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center rounded-full mb-4"
              style={{ width: 64, height: 64, background: `${C.secondary}15` }}>
              <Lightbulb size={32} color={C.secondary} />
            </div>
            <h2 style={{ color: C.slate900, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              {t.patternInsightTitle}
            </h2>
            <p style={{ color: C.slate500, fontSize: 15, lineHeight: 1.5 }}>
              {t.patternInsightDesc}
            </p>
          </div>

          {/* Why it matters */}
          <div className="rounded-2xl p-5" style={{ background: `${C.primary}08`, border: `1px solid ${C.primary}20` }}>
            <h3 style={{ color: C.primary, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
              {t.whyMatters}
            </h3>
            <p style={{ color: C.slate700, fontSize: 14, lineHeight: 1.6 }}>
              {t.whyMattersText}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{ color: C.slate900, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
              {t.curatedResources}
            </h3>
            
            <div className="flex flex-col gap-3">
              {/* Resource 1: Video */}
              <div className="rounded-2xl p-4 flex gap-4 items-center transition-all active:scale-95 cursor-pointer"
                style={{ border: `1px solid ${C.slate300}`, background: C.white, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                onClick={() => alert("Playing video tutorial...")}>
                <div className="rounded-xl flex flex-shrink-0 items-center justify-center"
                  style={{ width: 48, height: 48, background: "#FEF2F2" }}>
                  <Video size={24} color="#DC2626" />
                </div>
                <div className="flex-1">
                  <p style={{ color: C.slate900, fontSize: 15, fontWeight: 600 }}>{t.resVideo}</p>
                  <p style={{ color: C.slate500, fontSize: 12, marginTop: 2 }}>{t.time20} • YouTube</p>
                </div>
                <PlayCircle size={20} color={C.primary} />
              </div>

              {/* Resource 2: Lesson Plan */}
              <div className="rounded-2xl p-4 flex gap-4 items-center transition-all active:scale-95 cursor-pointer"
                style={{ border: `1px solid ${C.slate300}`, background: C.white, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                onClick={() => alert("Downloading lesson plan...")}>
                <div className="rounded-xl flex flex-shrink-0 items-center justify-center"
                  style={{ width: 48, height: 48, background: `${C.primary}15` }}>
                  <FileText size={24} color={C.primary} />
                </div>
                <div className="flex-1">
                  <p style={{ color: C.slate900, fontSize: 15, fontWeight: 600 }}>{t.resLessonPlan}</p>
                  <p style={{ color: C.slate500, fontSize: 12, marginTop: 2 }}>PDF • 1.2 MB</p>
                </div>
                <Download size={20} color={C.slate400} />
              </div>

              {/* Resource 3: Worksheet */}
              <div className="rounded-2xl p-4 flex gap-4 items-center transition-all active:scale-95 cursor-pointer"
                style={{ border: `1px solid ${C.slate300}`, background: C.white, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                onClick={() => alert("Downloading worksheet...")}>
                <div className="rounded-xl flex flex-shrink-0 items-center justify-center"
                  style={{ width: 48, height: 48, background: `${C.secondary}15` }}>
                  <FileText size={24} color={C.secondary} />
                </div>
                <div className="flex-1">
                  <p style={{ color: C.slate900, fontSize: 15, fontWeight: 600 }}>{t.resWorksheet}</p>
                  <p style={{ color: C.slate500, fontSize: 12, marginTop: 2 }}>PDF • 500 KB</p>
                </div>
                <Download size={20} color={C.slate400} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

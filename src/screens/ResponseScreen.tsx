import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowLeft, ChevronDown, ThumbsUp, ThumbsDown } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang } from "../constants/translations";

export function ResponseScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const t = TRANSLATIONS[lang];

  const accordionBlocks = [
    {
      id: "activity", title: t.classActivity, emoji: "🎲", color: C.secondary,
      content: (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 flex-wrap">
            <span className="rounded-full px-3 py-1"
              style={{ background: `${C.secondary}20`, color: "#92400E", fontSize: 12, fontWeight: 600 }}>
              {t.time20}
            </span>
            <span className="rounded-full px-3 py-1"
              style={{ background: `${C.success}20`, color: "#166534", fontSize: 12, fontWeight: 600 }}>
              {t.groupActivity}
            </span>
          </div>
          <div>
            <p style={{ color: C.slate700, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.materials}</p>
            {t.materialItems.map((m) => (
              <p key={m} style={{ color: C.slate700, fontSize: 14, padding: "4px 0" }}>• {m}</p>
            ))}
          </div>
          <p style={{ color: C.slate700, fontSize: 14 }}>{t.activityDesc}</p>
        </div>
      ),
    },
    {
      id: "inclusion", title: t.inclusionStrategy, emoji: "🤝", color: C.success,
      content: (
        <div className="flex flex-col gap-2">
          {t.inclusionTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span style={{ color: C.success, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✦</span>
              <p style={{ color: C.slate700, fontSize: 14 }}>{tip}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "reflection", title: t.reflectionQ, emoji: "💭", color: "#7C3AED",
      content: (
        <div className="flex flex-col gap-3">
          {t.reflections.map((q, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl p-3" style={{ background: "#F5F3FF" }}>
              <span style={{ color: "#7C3AED", fontWeight: 700 }}>Q{i + 1}</span>
              <p style={{ color: C.slate700, fontSize: 14 }}>{q}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ background: C.bg }}>
      <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-3"
        style={{ background: C.white, borderBottom: `1px solid ${C.slate300}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <ArrowLeft size={22} color={C.slate700} />
        </button>
        <div className="flex-1">
          <span style={{ color: C.slate900, fontSize: 16, fontWeight: 600 }}>{t.adviceTitle}</span>
          <p style={{ color: C.slate500, fontSize: 12 }}>{t.adviceSubtitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col items-center gap-3">
        <div className="w-full max-w-2xl flex flex-col gap-3">
          {/* Block 1 — expanded */}
          <div className="rounded-2xl overflow-hidden shadow-sm"
            style={{ background: C.white, border: `1px solid ${C.slate300}` }}>
            <div className="flex items-center gap-2 px-4 py-3"
              style={{ background: `${C.primary}08`, borderBottom: `1px solid ${C.primary}15` }}>
              <span style={{ fontSize: 18 }}>⚡</span>
              <span style={{ color: C.primary, fontSize: 15, fontWeight: 700 }}>{t.immediateAdvice}</span>
              <span className="ml-auto rounded-full px-2 py-0.5"
                style={{ background: `${C.primary}15`, color: C.primary, fontSize: 11, fontWeight: 600 }}>
                {t.doNow}
              </span>
            </div>
            <div className="px-4 py-4 flex flex-col gap-3">
              {t.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 28, height: 28, background: C.primary, color: C.white, fontSize: 13, fontWeight: 700 }}>
                    {i + 1}
                  </div>
                  <p style={{ color: C.slate700, fontSize: 14, lineHeight: 1.5, paddingTop: 3 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accordion blocks */}
          <Accordion.Root type="multiple" className="w-full">
            {accordionBlocks.map((block) => (
              <Accordion.Item key={block.id} value={block.id}
                className="rounded-2xl overflow-hidden shadow-sm mb-3"
                style={{ background: C.white, border: `1px solid ${C.slate300}` }}>
                <Accordion.Trigger className="w-full"
                  style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <div className="flex items-center gap-2 px-4 py-3">
                    <span style={{ fontSize: 18 }}>{block.emoji}</span>
                    <span style={{ color: C.slate900, fontSize: 15, fontWeight: 600 }}>{block.title}</span>
                    <ChevronDown size={18} color={C.slate500} style={{ marginLeft: "auto" }} />
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="px-4 py-4" style={{ borderTop: `1px solid ${block.color}20` }}>
                    {block.content}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          {/* Citation */}
          <div className="rounded-xl px-4 py-3" style={{ background: C.slate100, border: `1px solid ${C.slate300}` }}>
            <p style={{ color: C.slate500, fontSize: 11 }}>{t.citation}</p>
          </div>
        </div>
      </div>

      {/* Feedback footer */}
      <div className="px-5 py-4 flex justify-center" style={{ background: C.white, borderTop: `1px solid ${C.slate300}` }}>
        <div className="flex gap-3 w-full max-w-2xl">
          <button onClick={() => { setFeedback("up"); setTimeout(() => alert("Thanks for your positive feedback!"), 100); }}
            className="flex-1 flex items-center justify-center gap-2 rounded-full transition-all active:scale-95"
            style={{
              minHeight: 50, border: "none", cursor: "pointer",
              background: feedback === "up" ? C.success : `${C.success}15`,
              color: feedback === "up" ? C.white : C.success,
              fontSize: 14, fontWeight: 600,
            }}>
            <ThumbsUp size={18} />{t.helpful}
          </button>
          <button onClick={() => { setFeedback("down"); setTimeout(() => alert("Thanks for your feedback, we will improve!"), 100); }}
            className="flex-1 flex items-center justify-center gap-2 rounded-full transition-all active:scale-95"
            style={{
              minHeight: 50, border: "none", cursor: "pointer",
              background: feedback === "down" ? "#EF4444" : "#FEE2E2",
              color: feedback === "down" ? C.white : "#DC2626",
              fontSize: 14, fontWeight: 600,
            }}>
            <ThumbsDown size={18} />{t.needsWork}
          </button>
        </div>
      </div>
    </div>
  );
}

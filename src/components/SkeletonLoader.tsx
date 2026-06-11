import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang } from "../constants/translations";

export function SkeletonLoader({ lang }: { lang: Lang }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="flex flex-col min-h-screen" style={{ background: C.bg }}>
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3"
        style={{ background: C.white, borderBottom: `1px solid ${C.slate300}` }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.slate100 }} />
        <span style={{ color: C.primary, fontSize: 16, fontWeight: 700 }}>{t.appName}</span>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.slate100 }} />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 px-6 gap-6">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-3">
          <div className="rounded-full flex items-center justify-center"
            style={{ width: 72, height: 72, background: `${C.primary}20` }}>
            <Sparkles size={32} color={C.primary} />
          </div>
          <p style={{ color: C.primary, fontSize: 18, fontWeight: 600 }}>{t.thinking}</p>
          <p style={{ color: C.slate500, fontSize: 14 }}>{t.preparingAdvice}</p>
        </motion.div>
        <div className="w-full max-w-lg flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              style={{
                height: i === 1 ? 80 : 50, borderRadius: 16,
                background: `linear-gradient(90deg, ${C.slate100} 25%, ${C.slate300} 50%, ${C.slate100} 75%)`,
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}

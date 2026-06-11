import { useState, useRef } from "react";
import { BookOpen, Sparkles, ArrowLeft } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";

export function SplashScreen({ lang, onLangChange, onNext }: { lang: Lang; onLangChange: (l: Lang) => void; onNext: (s: Screen) => void }) {
  const [phone, setPhone] = useState("");
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-8"
      style={{ background: `linear-gradient(180deg, ${C.primary}18 0%, ${C.bg} 40%)` }}>
      {/* Logo & branding */}
      <div className="flex flex-col items-center mt-8 gap-3">
        <div className="flex items-center justify-center rounded-3xl shadow-lg"
          style={{ width: 80, height: 80, background: C.primary }}>
          <BookOpen size={36} color={C.white} />
          <Sparkles size={18} color={C.secondary} style={{ marginLeft: -8, marginBottom: -24 }} />
        </div>
        <h1 className="mt-2" style={{ color: C.primary, fontSize: 26, fontWeight: 700, textAlign: "center" }}>
          {t.appName}
        </h1>
        <p style={{ color: C.slate500, fontSize: 15, textAlign: "center" }}>{t.tagline}</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm flex flex-col gap-5 mt-8">
        {/* Language toggle */}
        <div className="flex items-center self-center rounded-full p-1 gap-1"
          style={{ background: C.slate100, border: `1px solid ${C.slate300}` }}>
          {(["hi", "en"] as const).map((l) => (
            <button key={l} onClick={() => onLangChange(l)}
              className="rounded-full transition-all"
              style={{
                padding: "8px 22px", minHeight: 40,
                background: lang === l ? C.primary : "transparent",
                color: lang === l ? C.white : C.slate700,
                fontWeight: lang === l ? 600 : 400, fontSize: 15,
                border: "none", cursor: "pointer",
              }}>
              {l === "hi" ? "हिन्दी" : "English"}
            </button>
          ))}
        </div>

        {/* Phone input */}
        <div className="flex flex-col gap-1">
          <label style={{ color: C.slate700, fontSize: 14, fontWeight: 600 }}>{t.mobileLabel}</label>
          <div className="flex items-center rounded-2xl overflow-hidden shadow-sm"
            style={{ border: `2px solid ${phone.length > 0 ? C.primary : C.slate300}`, background: C.white }}>
            <span className="px-3 py-4"
              style={{ color: C.slate500, fontSize: 16, borderRight: `1px solid ${C.slate300}` }}>
              +91
            </span>
            <input type="tel" maxLength={10} value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="XXXXX XXXXX"
              style={{
                flex: 1, padding: "14px 12px", border: "none", outline: "none",
                fontSize: 18, letterSpacing: 2, color: C.slate900, background: "transparent",
              }} />
          </div>
        </div>

        {/* Submit */}
        <button onClick={() => phone.length === 10 && onNext("otp")}
          className="w-full rounded-full transition-all active:scale-95"
          style={{
            padding: "16px 0", minHeight: 52,
            background: phone.length === 10 ? C.primary : C.slate300,
            color: C.white, fontSize: 17, fontWeight: 600, border: "none",
            cursor: phone.length === 10 ? "pointer" : "default",
            boxShadow: phone.length === 10 ? `0 4px 16px ${C.primary}40` : "none",
          }}>
          {t.getOtp}
        </button>
      </div>

      <p style={{ color: C.slate500, fontSize: 12, textAlign: "center", marginTop: 24 }}>{t.footer}</p>
    </div>
  );
}

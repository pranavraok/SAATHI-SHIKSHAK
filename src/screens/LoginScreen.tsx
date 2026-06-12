import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";

export function LoginScreen({ lang, onNext, onBack }: { lang: Lang; onNext: (s: Screen) => void; onBack: () => void }) {
  const [phone, setPhone] = useState("");
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-8"
      style={{ background: `linear-gradient(180deg, ${C.primary}18 0%, ${C.bg} 40%)` }}>
      
      <div className="w-full flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-black/5">
          <ArrowLeft size={24} color={C.slate700} />
        </button>
      </div>

      <div className="flex flex-col w-full max-w-sm mt-4 gap-2">
        <h1 style={{ color: C.primary, fontSize: 28, fontWeight: 700 }}>
          {t.loginTitle}
        </h1>
        <p style={{ color: C.slate500, fontSize: 15 }}>{t.tagline}</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-5 mt-10 flex-1">
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
      </div>

      <div className="w-full max-w-sm flex flex-col mt-auto mb-4">
        <button onClick={() => phone.length === 10 && onNext("otp")}
          className="w-full rounded-full transition-all active:scale-95"
          style={{
            padding: "16px 0", minHeight: 52,
            background: phone.length === 10 ? C.primary : C.slate300,
            color: C.white, fontSize: 17, fontWeight: 600, border: "none",
            cursor: phone.length === 10 ? "pointer" : "default",
            boxShadow: phone.length === 10 ? `0 4px 16px ${C.primary}40` : "none",
          }}>
          {t.loginBtn}
        </button>
      </div>
    </div>
  );
}

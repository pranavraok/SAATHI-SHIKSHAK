import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ArrowLeft } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";

export function OTPScreen({ lang, onNext, onBack, authMode }: { lang: Lang; onNext: (s: Screen) => void; onBack: () => void; authMode: "signup" | "login" }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [toast, setToast] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft > 0) return;
    setToast(true);
    setTimeLeft(30);
    setTimeout(() => setToast(false), 3000);
  };

  const handleOtp = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next);
    if (val && i < 3) refs[i + 1].current?.focus();
  };
  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current?.focus();
  };
  const filled = otp.every((d) => d !== "");

  return (
    <div className="flex flex-col px-6 py-8 gap-6 min-h-screen"
      style={{ background: `linear-gradient(180deg, ${C.primary}18 0%, ${C.bg} 40%)` }}>
      <button onClick={onBack} className="flex items-center gap-2 self-start"
        style={{ background: "none", border: "none", color: C.primary, cursor: "pointer", padding: "8px 0" }}>
        <ArrowLeft size={20} />
        <span style={{ fontSize: 15, fontWeight: 500 }}>{t.goBack}</span>
      </button>

      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center justify-center rounded-3xl shadow-md"
          style={{ width: 64, height: 64, background: C.primary }}>
          <BookOpen size={28} color={C.white} />
        </div>
        <h2 style={{ color: C.primary, marginTop: 12, textAlign: "center" }}>{t.enterOtp}</h2>
        <p style={{ color: C.slate500, fontSize: 14, textAlign: "center" }}>{t.otpSent}</p>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {otp.map((digit, i) => (
          <input key={i} ref={refs[i]} type="tel" maxLength={1} value={digit}
            onChange={(e) => handleOtp(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            style={{
              width: 64, height: 64, textAlign: "center", fontSize: 26, fontWeight: 700,
              border: `2px solid ${digit ? C.primary : C.slate300}`,
              borderRadius: 16, outline: "none", color: C.primary,
              background: C.white, boxShadow: digit ? `0 2px 8px ${C.primary}30` : "none",
            }} />
        ))}
      </div>

      <button onClick={() => filled && onNext(authMode === "signup" ? "onboarding" : "home")}
        className="w-full max-w-sm self-center rounded-full mt-4 transition-all active:scale-95"
        style={{
          padding: "16px 0", minHeight: 52,
          background: filled ? C.success : C.slate300,
          color: C.white, fontSize: 17, fontWeight: 600, border: "none",
          cursor: filled ? "pointer" : "default",
          boxShadow: filled ? `0 4px 16px ${C.success}50` : "none",
        }}>
        {t.verify}
      </button>

      <button 
        onClick={handleResend} 
        disabled={timeLeft > 0}
        style={{ 
          background: "none", 
          border: "none", 
          color: timeLeft > 0 ? C.slate400 : C.primary, 
          cursor: timeLeft > 0 ? "default" : "pointer", 
          fontSize: 14 
        }} 
        className="self-center"
      >
        {t.resendOtp} {timeLeft > 0 ? `(${timeLeft}s)` : ""}
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-10 left-1/2 px-6 py-3 rounded-full shadow-lg"
            style={{ background: C.slate900, color: C.white, fontSize: 14, zIndex: 50 }}
          >
            OTP Resent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

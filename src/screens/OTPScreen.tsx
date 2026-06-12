import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ArrowLeft, Loader2 } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";
import { sendOtp, verifyOtp } from "../services/otpService";

export function OTPScreen({
  lang,
  onNext,
  onBack,
  authMode,
  phone,
}: {
  lang: Lang;
  onNext: (s: Screen) => void;
  onBack: () => void;
  authMode: "signup" | "login";
  phone: string;
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const t = TRANSLATIONS[lang];

  // Auto-send OTP when screen mounts
  useEffect(() => {
    if (phone) handleSendOtp();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSendOtp = async () => {
    if (!phone) return;
    setLoading(true);
    const result = await sendOtp(phone);
    setLoading(false);
    if (result.success) {
      showToast("OTP sent to +91 " + phone, "success");
      setTimeLeft(30);
    } else {
      showToast(result.message, "error");
    }
  };

  const handleResend = () => {
    if (timeLeft > 0 || loading) return;
    setOtp(["", "", "", ""]);
    refs[0].current?.focus();
    handleSendOtp();
  };

  const handleOtp = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 3) refs[i + 1].current?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current?.focus();
  };

  const filled = otp.every((d) => d !== "");

  const handleVerify = async () => {
    if (!filled || verifying) return;
    setVerifying(true);
    const enteredOtp = otp.join("");
    const result = await verifyOtp(phone, enteredOtp);
    setVerifying(false);
    if (result.success) {
      showToast("Verified! ✅", "success");
      setTimeout(() => onNext(authMode === "signup" ? "onboarding" : "home"), 800);
    } else {
      showToast(result.message, "error");
      setOtp(["", "", "", ""]);
      refs[0].current?.focus();
    }
  };

  return (
    <div
      className="flex flex-col px-6 py-8 gap-6 min-h-screen"
      style={{ background: `linear-gradient(180deg, ${C.primary}18 0%, ${C.bg} 40%)` }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 self-start"
        style={{ background: "none", border: "none", color: C.primary, cursor: "pointer", padding: "8px 0" }}
      >
        <ArrowLeft size={20} />
        <span style={{ fontSize: 15, fontWeight: 500 }}>{t.goBack}</span>
      </button>

      <div className="flex flex-col items-center gap-2 mt-4">
        <div
          className="flex items-center justify-center rounded-3xl shadow-md"
          style={{ width: 64, height: 64, background: C.primary }}
        >
          <BookOpen size={28} color={C.white} />
        </div>
        <h2 style={{ color: C.primary, marginTop: 12, textAlign: "center" }}>{t.enterOtp}</h2>
        <p style={{ color: C.slate500, fontSize: 14, textAlign: "center" }}>
          {t.otpSent}{phone ? ` +91 ${phone}` : ""}
        </p>
        {loading && (
          <div className="flex items-center gap-2 mt-1" style={{ color: C.slate500, fontSize: 13 }}>
            <Loader2 size={14} className="animate-spin" />
            Sending OTP...
          </div>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtp(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            disabled={loading}
            style={{
              width: 64,
              height: 64,
              textAlign: "center",
              fontSize: 26,
              fontWeight: 700,
              border: `2px solid ${digit ? C.primary : C.slate300}`,
              borderRadius: 16,
              outline: "none",
              color: C.primary,
              background: C.white,
              boxShadow: digit ? `0 2px 8px ${C.primary}30` : "none",
              opacity: loading ? 0.5 : 1,
            }}
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={!filled || verifying || loading}
        className="w-full max-w-sm self-center rounded-full mt-4 transition-all active:scale-95 flex items-center justify-center gap-2"
        style={{
          padding: "16px 0",
          minHeight: 52,
          background: filled && !verifying ? C.success : C.slate300,
          color: C.white,
          fontSize: 17,
          fontWeight: 600,
          border: "none",
          cursor: filled && !verifying ? "pointer" : "default",
          boxShadow: filled && !verifying ? `0 4px 16px ${C.success}50` : "none",
        }}
      >
        {verifying && <Loader2 size={18} className="animate-spin" />}
        {verifying ? "Verifying..." : t.verify}
      </button>

      <button
        onClick={handleResend}
        disabled={timeLeft > 0 || loading}
        style={{
          background: "none",
          border: "none",
          color: timeLeft > 0 || loading ? C.slate400 : C.primary,
          cursor: timeLeft > 0 || loading ? "default" : "pointer",
          fontSize: 14,
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
            style={{
              background: toast.type === "error" ? "#e74c3c" : C.slate900,
              color: C.white,
              fontSize: 14,
              zIndex: 50,
              whiteSpace: "nowrap",
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { ArrowDownToLine } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";

export function InstallScreen({ lang, onNext, deferredPrompt }: { lang: Lang; onNext: (s: Screen) => void; deferredPrompt: any }) {
  const t = TRANSLATIONS[lang];

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    } else {
      // If the browser doesn't support the prompt or it wasn't captured, 
      // providing an alert or gracefully degrading could be an option.
      // For now, we continue since they clicked install.
      console.log('Install prompt not available');
    }
    onNext("home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-10 text-center"
      style={{ background: `linear-gradient(180deg, ${C.primary}18 0%, ${C.bg} 40%)` }}>
      
      <div className="flex items-center justify-center rounded-3xl shadow-lg mb-8"
        style={{ width: 80, height: 80, background: C.primary }}>
        <ArrowDownToLine size={36} color={C.white} />
      </div>

      <h1 style={{ color: C.primary, fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        {t.installTitle}
      </h1>
      
      <p style={{ color: C.slate600, fontSize: 16, lineHeight: 1.5, marginBottom: 32 }}>
        {t.installDesc}
      </p>

      <div className="w-full max-w-sm flex flex-col gap-4">
        <button onClick={handleInstall}
          className="w-full rounded-full transition-all active:scale-95"
          style={{
            padding: "16px 0", minHeight: 52,
            background: C.primary,
            color: C.white, fontSize: 17, fontWeight: 600, border: "none",
            cursor: "pointer",
            boxShadow: `0 4px 16px ${C.primary}40`,
          }}>
          {t.installBtn}
        </button>

        <button onClick={() => onNext("home")}
          className="w-full rounded-full transition-all active:scale-95"
          style={{
            padding: "16px 0", minHeight: 52,
            background: "transparent",
            color: C.slate500, fontSize: 15, fontWeight: 600, border: "none",
            cursor: "pointer",
          }}>
          {t.maybeLater}
        </button>
      </div>
    </div>
  );
}

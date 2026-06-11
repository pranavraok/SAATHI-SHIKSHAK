import { User } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";
import { OfflineBadge } from "./OfflineBadge";
import { ConnectivityToggle } from "./ConnectivityToggle";

export function AppHeader({ lang, offline, setOffline, onNavigate, title }: {
  lang: Lang;
  offline: boolean;
  setOffline: (v: boolean) => void;
  onNavigate: (s: Screen) => void;
  title?: string;
}) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3"
      style={{ background: C.white, borderBottom: `1px solid ${C.slate300}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <button onClick={() => onNavigate("profile")}
        className="flex items-center justify-center rounded-full transition-all active:scale-90"
        style={{ width: 40, height: 40, background: C.slate100, border: "none", cursor: "pointer" }}>
        <User size={20} color={C.slate700} />
      </button>

      <div className="flex flex-col items-center">
        <span style={{ color: C.primary, fontSize: 16, fontWeight: 700 }}>{title || t.appName}</span>
        <OfflineBadge offline={offline} />
      </div>

      <ConnectivityToggle offline={offline} onToggle={() => setOffline(!offline)} />
    </div>
  );
}

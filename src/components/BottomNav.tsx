import { Mic, Clock, User } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";

export function BottomNav({ lang, activeScreen, onNavigate }: { lang: Lang; activeScreen: Screen; onNavigate: (s: Screen) => void }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex items-center justify-around px-4"
      style={{ background: C.white, borderTop: `1px solid ${C.slate300}` }}>
      {[
        { id: "home", icon: Mic, label: t.navAsk },
        { id: "history", icon: Clock, label: t.navHistory },
        { id: "profile", icon: User, label: t.navProfile },
      ].map((item) => {
        const isActive = activeScreen === item.id;
        const Icon = item.icon;
        return (
          <button key={item.id} onClick={() => onNavigate(item.id as Screen)} 
            className="flex flex-col items-center transition-all relative pt-3 pb-3"
            style={{ background: "none", border: "none", cursor: "pointer", width: "60px" }}>
            {/* Active Dash */}
            {isActive && (
              <div style={{ position: "absolute", top: 0, width: "32px", height: "3px", borderRadius: "0 0 4px 4px", background: C.primary }} />
            )}
            <Icon size={22} color={isActive ? C.primary : C.slate500} style={{ marginBottom: 4 }} />
            <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 500, color: isActive ? C.primary : C.slate500 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

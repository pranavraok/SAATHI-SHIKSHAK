import { Signal, SignalZero } from "lucide-react";

export function ConnectivityToggle({ offline, onToggle }: { offline: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      className="flex items-center justify-center rounded-full transition-all active:scale-90"
      style={{
        width: 40, height: 40, border: "none", cursor: "pointer",
        background: offline ? "#FEF3C7" : "#DCFCE7",
        boxShadow: offline ? "0 0 0 2px #F59E0B40" : "0 0 0 2px #22C55E30",
      }}>
      {offline ? <SignalZero size={20} color="#B45309" /> : <Signal size={20} color="#15803D" />}
    </button>
  );
}

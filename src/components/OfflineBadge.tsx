import { Wifi, WifiOff } from "lucide-react";

export function OfflineBadge({ offline }: { offline: boolean }) {
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
      style={{ background: offline ? "#FEF3C7" : "#DCFCE7", color: offline ? "#92400E" : "#166534", fontSize: 11 }}>
      {offline ? <WifiOff size={10} /> : <Wifi size={10} />}
      <span>{offline ? "Offline" : "Online"}</span>
    </div>
  );
}

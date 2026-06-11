import { X, GraduationCap, School, MapPin, TrendingUp, Star, Award, Globe, Bell, ChevronRight, LogOut } from "lucide-react";
import { C } from "../constants/theme";
import { TRANSLATIONS, Lang, Screen } from "../constants/translations";
import { TEACHER_PROFILE } from "../constants/data";
import { BottomNav } from "../components/BottomNav";
import { AppHeader } from "../components/AppHeader";

export function ProfileScreen({ lang, onNavigate, offline, setOffline }: { lang: Lang; onNavigate: (s: Screen) => void; offline: boolean; setOffline: (v: boolean) => void }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col h-full bg-white">
      <AppHeader lang={lang} offline={offline} setOffline={setOffline} onNavigate={onNavigate} title={t.profile} />

      <div className="flex-1 overflow-y-auto pb-6 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          {/* Avatar + name */}
          <div className="flex flex-col items-center px-5 py-6" style={{ borderBottom: `1px solid ${C.slate300}` }}>
            <div style={{ position: "relative", width: 80, height: 80, marginBottom: 12 }}>
              <div className="flex items-center justify-center rounded-full shadow-md"
                style={{ width: 80, height: 80, background: C.primary }}>
                <span style={{ color: C.white, fontSize: 28, fontWeight: 700 }}>रा</span>
              </div>
              <div style={{
                position: "absolute", bottom: 2, right: 2, width: 20, height: 20,
                borderRadius: "50%", background: C.success, border: `2px solid ${C.white}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.white }} />
              </div>
            </div>
            <p style={{ color: C.slate900, fontSize: 18, fontWeight: 700, textAlign: "center" }}>
              {lang === "hi" ? TEACHER_PROFILE.name : TEACHER_PROFILE.nameEn}
            </p>
            <p style={{ color: C.slate500, fontSize: 13, textAlign: "center", marginTop: 2 }}>
              {lang === "hi" ? TEACHER_PROFILE.nameEn : TEACHER_PROFILE.name}
            </p>
            <div className="flex items-center gap-1 mt-2 rounded-full px-3 py-1"
              style={{ background: `${C.primary}12` }}>
              <GraduationCap size={13} color={C.primary} />
              <span style={{ color: C.primary, fontSize: 12, fontWeight: 600 }}>
                {t.teacherRole} • ID: {TEACHER_PROFILE.employeeId}
              </span>
            </div>
          </div>

          {/* School info */}
          <div className="px-5 py-4 flex flex-col gap-3" style={{ borderBottom: `1px solid ${C.slate300}` }}>
            {[
              { icon: <School size={17} color={C.primary} />, label: t.schoolLabel, bg: `${C.primary}12`,
                value: lang === "hi" ? TEACHER_PROFILE.school : TEACHER_PROFILE.schoolEn },
              { icon: <MapPin size={17} color={C.secondary} />, label: t.districtLabel, bg: `${C.secondary}18`,
                value: lang === "hi" ? TEACHER_PROFILE.district : TEACHER_PROFILE.districtEn },
            ].map(({ icon, label, bg, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: 36, height: 36, background: bg }}>{icon}</div>
                <div>
                  <p style={{ color: C.slate500, fontSize: 11, fontWeight: 500 }}>{label}</p>
                  <p style={{ color: C.slate900, fontSize: 14, fontWeight: 600 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${C.slate300}` }}>
            <p style={{ color: C.slate700, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t.activityTitle}</p>
            <div className="flex gap-3">
              {[
                { icon: <TrendingUp size={16} color={C.primary} />, val: TEACHER_PROFILE.stats.thisWeek, label: t.thisWeek, bg: `${C.primary}10` },
                { icon: <Star size={16} color={C.secondary} />, val: TEACHER_PROFILE.stats.total, label: t.totalQueries, bg: `${C.secondary}12` },
                { icon: <Award size={16} color={C.success} />, val: `${TEACHER_PROFILE.stats.streak}🔥`, label: t.dayStreak, bg: `${C.success}12` },
              ].map(({ icon, val, label, bg }) => (
                <div key={label} className="flex-1 rounded-2xl p-3 flex flex-col items-center gap-1" style={{ background: bg }}>
                  {icon}
                  <span style={{ color: C.slate900, fontSize: 18, fontWeight: 700 }}>{val}</span>
                  <span style={{ color: C.slate500, fontSize: 10, textAlign: "center" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grades & subjects */}
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${C.slate300}` }}>
            <p style={{ color: C.slate700, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.teaches}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {TEACHER_PROFILE.grades.map((g) => (
                <span key={g} className="rounded-full px-3 py-1"
                  style={{ background: `${C.primary}15`, color: C.primary, fontSize: 13, fontWeight: 600 }}>
                  {t.gradePrefix} {g}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {TEACHER_PROFILE.subjects[lang].map((s) => (
                <span key={s} className="rounded-full px-3 py-1"
                  style={{ background: `${C.secondary}18`, color: "#92400E", fontSize: 13, fontWeight: 600 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Settings rows */}
          <div className="px-5 py-2" style={{ borderBottom: `1px solid ${C.slate300}` }}>
            {[
              { icon: <Globe size={17} color={C.primary} />, label: t.langPref, value: t.langVal, bg: `${C.primary}10`, action: () => alert("Language settings clicked") },
              { icon: <Bell size={17} color={C.secondary} />, label: t.notifications, value: t.notifOn, bg: `${C.secondary}12`, action: () => alert("Notification settings clicked") },
            ].map(({ icon, label, value, bg, action }) => (
              <button key={label} onClick={action} className="w-full flex items-center gap-3 py-3 active:scale-95 transition-all text-left" style={{ borderBottom: `1px solid ${C.slate300}`, background: 'none', border: 'none', cursor: 'pointer' }}>
                <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: 36, height: 36, background: bg }}>{icon}</div>
                <span style={{ flex: 1, color: C.slate900, fontSize: 14, fontWeight: 500 }}>{label}</span>
                <span style={{ color: C.slate500, fontSize: 13 }}>{value}</span>
                <ChevronRight size={16} color={C.slate300} />
              </button>
            ))}
          </div>

          {/* Joined + logout */}
          <div className="px-5 py-6 flex flex-col gap-4">
            <p style={{ color: C.slate500, fontSize: 12, textAlign: "center" }}>
              {t.joined} {TEACHER_PROFILE.joined[lang]}
            </p>
            <button onClick={() => onNavigate("splash")} className="w-full flex items-center justify-center gap-2 rounded-full transition-all active:scale-95"
              style={{
                minHeight: 50, border: "1.5px solid #FCA5A5",
                background: "#FEF2F2", color: "#DC2626",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}>
              <LogOut size={18} />
              {t.logout}
            </button>
          </div>
        </div>
      </div>
      <BottomNav lang={lang} activeScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}

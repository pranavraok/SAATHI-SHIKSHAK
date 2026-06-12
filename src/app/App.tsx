import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Screen, Lang } from "../constants/translations";
import { SplashScreen } from "../screens/SplashScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { OTPScreen } from "../screens/OTPScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { InstallScreen } from "../screens/InstallScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { ResponseScreen } from "../screens/ResponseScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { PatternScreen } from "../screens/PatternScreen";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [lang, setLang] = useState<Lang>("hi");
  const [offline, setOffline] = useState(false);
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  // Captured phone number passed from Login/Signup → OTPScreen
  const [capturedPhone, setCapturedPhone] = useState("");

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const navigate = (s: Screen) => {
    if (s === "signup") setAuthMode("signup");
    if (s === "login") setAuthMode("login");
    if ((s === "response" || s === "pattern") && screen !== "loading") setPrevScreen(screen);
    setScreen(s);
  };

  const handleQuery = () => {
    setPrevScreen(screen);
    setScreen("loading");
    setTimeout(() => setScreen("response"), 2800);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="h-[100dvh]"
      >
        {screen === "splash" && (
          <SplashScreen lang={lang} onLangChange={setLang} onNext={navigate} />
        )}
        {screen === "signup" && (
          <SignupScreen
            lang={lang}
            onNext={navigate}
            onBack={() => navigate("splash")}
            onPhoneCapture={(p) => setCapturedPhone(p)}
          />
        )}
        {screen === "login" && (
          <LoginScreen
            lang={lang}
            onNext={navigate}
            onBack={() => navigate("splash")}
            onPhoneCapture={(p) => setCapturedPhone(p)}
          />
        )}
        {screen === "otp" && (
          <OTPScreen
            lang={lang}
            onNext={navigate}
            onBack={() => navigate(authMode)}
            authMode={authMode}
            phone={capturedPhone}
          />
        )}
        {screen === "onboarding" && (
          <OnboardingScreen lang={lang} onNext={navigate} />
        )}
        {screen === "install" && (
          <InstallScreen lang={lang} onNext={navigate} deferredPrompt={deferredPrompt} />
        )}
        {screen === "home" && (
          <HomeScreen
            lang={lang}
            onQuery={handleQuery}
            onNavigate={navigate}
            offline={offline}
            setOffline={setOffline}
          />
        )}
        {screen === "loading" && <SkeletonLoader lang={lang} />}
        {screen === "response" && (
          <ResponseScreen lang={lang} onBack={() => navigate(prevScreen)} />
        )}
        {screen === "history" && (
          <HistoryScreen lang={lang} onNavigate={navigate} offline={offline} setOffline={setOffline} />
        )}
        {screen === "profile" && (
          <ProfileScreen lang={lang} onNavigate={navigate} offline={offline} setOffline={setOffline} />
        )}
        {screen === "pattern" && (
          <PatternScreen lang={lang} onBack={() => navigate(prevScreen)} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

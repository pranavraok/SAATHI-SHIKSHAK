# 🎓 Saathi Shikshak (साथी शिक्षक)

**An Answer to Every Question. Every Day.**

Saathi Shikshak is an AI-powered, bilingual (English & Hindi) Progressive Web Application (PWA) specifically designed to assist teachers in India. It acts as an intelligent companion, providing real-time pedagogical advice, classroom activities, inclusion strategies, and lesson resources aligned with the **NEP 2020** and **NIPUN Bharat** guidelines.

---

## ✨ Key Features

- **🗣️ Bilingual Support:** Seamlessly switch between Hindi and English at any time.
- **📱 Progressive Web App (PWA):** Installable as a native-like app on Android/iOS devices with offline-capability indicators.
- **🎙️ Voice & Text Input:** Teachers can ask complex pedagogical questions using voice dictation or text.
- **🧠 AI-Powered Insights:** Delivers structured advice including "Do Now" activities, group strategies, and inclusion tips.
- **📊 Pattern Identification:** Automatically identifies recurring themes in a teacher's queries (e.g., struggling with teaching Fractions) and proactively curates lesson plans, worksheets, and video tutorials.
- **🕒 Session History:** Keeps a log of past queries for easy retrieval and review.
- **👤 Teacher Profiles:** Tracks activity streaks, subjects taught, and preferences.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** CSS (Custom design system with rich theming and gradients)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **PWA Integration:** `vite-plugin-pwa`

---

## 📂 Project Structure

The project is structured to be highly modular and scalable:

```text
src/
├── app/
│   └── App.tsx               # Main application entry point and router
├── components/               # Reusable UI components
│   ├── AppHeader.tsx         # Sticky top header
│   ├── BottomNav.tsx         # Fixed bottom app navigation
│   ├── ConnectivityToggle.tsx# Online/Offline simulation toggle
│   ├── OfflineBadge.tsx      # Status badge
│   └── SkeletonLoader.tsx    # Loading animations
├── constants/                # Configuration and static data
│   ├── data.ts               # Mock data (Teacher profiles, History, Subjects)
│   ├── theme.ts              # Design system colors and variables
│   └── translations.ts       # English & Hindi translation dictionaries
├── screens/                  # Top-level page views
│   ├── HistoryScreen.tsx     # Past sessions and patterns
│   ├── HomeScreen.tsx        # Main dashboard and query input
│   ├── OnboardingScreen.tsx  # Initial teacher setup
│   ├── OTPScreen.tsx         # Phone authentication
│   ├── PatternScreen.tsx     # Pattern insights and curated resources
│   ├── ProfileScreen.tsx     # Teacher activity and settings
│   ├── ResponseScreen.tsx    # Detailed AI pedagogical advice
│   └── SplashScreen.tsx      # App loading and language selection
├── styles/                   # Global stylesheets
│   ├── globals.css           # Reset and base styles
│   ├── index.css             # Utility classes
│   └── theme.css             # CSS variables
└── main.tsx                  # React DOM renderer
```

---

## 🚀 Local Development

Follow these steps to run the application locally:

### Prerequisites
- Node.js (v16+)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`. 

### 3. Build for Production (PWA)
```bash
npm run build
```
This generates the optimized production bundle along with the necessary Service Workers and `manifest.webmanifest` required for the PWA capabilities in the `dist` folder.

---

## 🎨 Design Philosophy
The app is designed to feel like a premium, native mobile application. It features a sticky top header, a fixed bottom navigation bar, dynamic cross-fade routing animations, and extensive use of micro-interactions (like touch-scale effects) to ensure a fluid user experience.
# 👑 SUPER-META PROMPT: SaathiShikshak PWA Frontend UI/UX Generation

**Target AI Generator:** v0.app, Figma AI (Make), or equivalent advanced UI-code generators.
**Role:** Top-Tier Senior Frontend UI/UX & Product Designer.
**Objective:** Generate a production-grade, mobile-first PWA prototype (React/Tailwind) for "SaathiShikshak" (Teaching Companion).

---

## ⚙️ SYSTEM & CONTEXT INSTRUCTIONS FOR THE AI GENERATOR

**Context:** SaathiShikshak is an AI-powered, multilingual (Hindi-first) teaching companion for Indian government school teachers. It provides immediate, curriculum-aligned pedagogical advice. 
**Vibe/Aesthetic:** Modern, highly accessible, minimal cognitive load. Inspired by premium UI kits (shadcn/ui, Radix) but adapted for low-tier Android devices and low digital literacy.
**Key Constraints:** * **Mobile-First viewport only** (e.g., 375x812px max width).
* **WCAG 2.1 AA** contrast ratios.
* **Large Touch Targets** (Minimum 48x48dp).

---

## 🎨 GLOBAL DESIGN SYSTEM (TOKENS)

* **Colors:**
    * `Primary`: `#1B4F72` (Deep Blue - Trust/Government)
    * `Secondary`: `#F39C12` (Amber - Warmth/Action)
    * `Background`: `#F8F9FA` (Light Grey - Outdoor visibility)
    * `Success/Action`: `#27AE60` (Green - Positive reinforcement)
    * `Text`: Slate-900 (Primary), Slate-500 (Secondary).
* **Typography:** `Noto Sans` & `Noto Sans Devanagari` (Sans-serif, highly legible). Base size: 16px. Headings: 20px+.
* **Components/Style:** Rounded corners (`rounded-2xl` for cards, `rounded-full` for primary buttons). Soft, subtle drop shadows (`shadow-sm`) to separate cards from the grey background. No complex gradients.

---

## 📱 PROTOTYPE SCREEN SPECIFICATIONS (One-Shot Flow)

Generate the following 5 integrated screens/views using state-toggles or a scrollable artboard layout.

### Screen 1: Splash & Authentication
* **Layout:** Centered flexbox.
* **Header:** App Name "साथी शिक्षक" (SaathiShikshak) with a simple book/sparkle logo. Tagline: "हर सवाल का जवाब. रोज़."
* **Components:**
    * Language Toggle: Pill-shaped segmented control `[ हिन्दी | English ]`.
    * Input: Large, high-contrast text field for 10-digit Mobile Number.
    * Button: Full-width Primary Button (`#1B4F72`) -> "लॉग इन करें / Get OTP".
    * State 2: 4-digit OTP input boxes (large 48x48px squares).

### Screen 2: Context Onboarding (One-time)
* **Header:** "आप क्या पढ़ाते हैं?" (What do you teach?)
* **Components:**
    * Section 1 (Grades): Wrap-layout of selectable Action Chips for Grades 1 through 8. Active state: Blue background, white text. Inactive: White background, slate border.
    * Section 2 (Subjects): Wrap-layout of Chips (Hindi, Math, EVS, English).
    * Button: Floating Action Button (FAB) or full-width bottom sticky button -> "आगे बढ़ें / Continue".

### Screen 3: Home / Query Input (The Core Interface)
* **Header:** Sticky top nav. Avatar/Profile icon left, "SaathiShikshak" text center, Settings icon right.
* **Hero Section:** "आज की चुनौती" (Today's Challenge). 
* **Input Area (Prominent):**
    * A large, elevated card in the center.
    * Primary Input: A massive, central Microphone FAB (Amber `#F39C12` or Green) for Voice Input. Pulsing animation state when active.
    * Secondary Input: A simple text area below the mic "या यहाँ टाइप करें..." (Or type here).
* **Quick Context Bar:** Two dropdown pills below input: `[ कक्षा 5 ▾ ]` `[ गणित ▾ ]`.
* **Recent History:** Horizontal scroll (carousel) of small cards showing last 3 queries.

### Screen 4: AI Response (Structured Output Renderer)
* **Header:** "आज के लिए सलाह" (Advice for Today).
* **Layout:** A vertical stack of 5 distinct UI Cards. Use Accordion patterns for blocks 2, 3, and 4 (collapsed by default to save space).
    * **Block 1 (Immediate Action - Expanded):** Card with title "तत्काल सलाह". Numbered list (1, 2, 3) with distinct bullet styling.
    * **Block 2 (Activity - Collapsible):** Card title "कक्षा गतिविधि". Contains time required badge and materials list.
    * **Block 3 (Inclusion - Collapsible):** Card title "समावेश रणनीति".
    * **Block 4 (Reflection - Collapsible):** Card title "चिंतन प्रश्न".
    * **Block 5 (Citation - Small/Footer):** Micro-text, muted color. "संदर्भ: NEP 2020, NIPUN Bharat".
* **Footer Actions:** Sticky bottom bar. Two buttons: 👍 "मददगार था" (Helpful) / 👎 "और बेहतर चाहिए" (Needs improvement).

### Screen 5: Session History (Dashboard)
* **Layout:** Vertical feed / Timeline view.
* **Components:**
    * Filter row: Chips to filter by `[All]` `[Math]` `[Hindi]`.
    * List Items: Date/Time stamp. The teacher's query (bold). A 1-line snippet of the AI advice. A right-chevron icon to view full details.
    * Insights Card (Top): "Pattern identified: 3 queries about Fractions this week. View resources."

---

## ⚡ INTERACTION & ACCESSIBILITY RULES

1.  **Skeleton Loaders:** When transitioning from Screen 3 to Screen 4, display a clean skeleton loader card with a shimmer effect and text: "सोच रहे हैं..." (Thinking...).
2.  **Offline State Indicator:** Add a small subtle badge near the header: `[☁️ Offline - Cached Mode]` for simulated no-internet states.
3.  **Typography Hierarchy:** Ensure strict contrast. Block titles must be bold (600 weight), body text regular (400 weight).
4.  **No Horizontal Scrolling** (except for the recent history carousel).

**Execute this design as a single, cohesive React/Tailwind file representing the complete user journey.**
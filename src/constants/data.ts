import { Lang } from "./translations";

export const GRADES = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const SUBJECTS_DATA: Record<Lang, string[]> = {
  hi: ["हिंदी", "गणित", "EVS", "English", "विज्ञान", "सामाजिक"],
  en: ["Hindi", "Math", "EVS", "English", "Science", "Social"],
};

export const RECENT_QUERIES_DATA: Record<Lang, { id: number; query: string; subject: string; time: string }[]> = {
  hi: [
    { id: 1, query: "भिन्न कैसे सिखाएं?", subject: "गणित", time: "आज, 9:30" },
    { id: 2, query: "पर्यावरण पाठ योजना", subject: "EVS", time: "कल, 2:15" },
    { id: 3, query: "कविता पाठन गतिविधि", subject: "हिंदी", time: "सोम, 4:00" },
  ],
  en: [
    { id: 1, query: "How to teach fractions?", subject: "Math", time: "Today, 9:30" },
    { id: 2, query: "Environment lesson plan", subject: "EVS", time: "Yesterday, 2:15" },
    { id: 3, query: "Poetry reading activity", subject: "Hindi", time: "Mon, 4:00" },
  ],
};

export const HISTORY_ITEMS_DATA: Record<Lang, { id: number; date: string; query: string; snippet: string; subject: string }[]> = {
  hi: [
    { id: 1, date: "आज, 9:30 AM", query: "कक्षा 5 में भिन्न (Fractions) कैसे सिखाएं?", snippet: "हाथों से बनाई गई फ्रेक्शन स्ट्रिप्स का उपयोग करें...", subject: "गणित" },
    { id: 2, date: "कल, 2:15 PM", query: "पर्यावरण विषय पर रोचक गतिविधि बताएं", snippet: "बच्चों को बाहर ले जाकर पेड़-पौधों की पहचान करवाएं...", subject: "EVS" },
    { id: 3, date: "सोम, 4:00 PM", query: "हिंदी कविता पाठन को आकर्षक कैसे बनाएं?", snippet: "लय और ताल के साथ कविता पढ़वाएं, हाव-भाव जोड़ें...", subject: "हिंदी" },
    { id: 4, date: "रवि, 11:00 AM", query: "कक्षा 3 गणित — जोड़-घटाव", snippet: "गिनती के पत्थर और माचिस की तीलियों से जोड़ सिखाएं...", subject: "गणित" },
  ],
  en: [
    { id: 1, date: "Today, 9:30 AM", query: "How to teach Fractions in Class 5?", snippet: "Use handmade fraction strips to visualize...", subject: "Math" },
    { id: 2, date: "Yesterday, 2:15 PM", query: "Share an engaging activity for EVS", snippet: "Take children outside to identify trees and plants...", subject: "EVS" },
    { id: 3, date: "Mon, 4:00 PM", query: "How to make Hindi poetry reading engaging?", snippet: "Read poems with rhythm and gestures...", subject: "Hindi" },
    { id: 4, date: "Sun, 11:00 AM", query: "Class 3 Math — Addition & Subtraction", snippet: "Teach addition using pebbles and matchsticks...", subject: "Math" },
  ],
};

export const TEACHER_PROFILE = {
  name: "राम कुमार शर्मा",
  nameEn: "Ram Kumar Sharma",
  school: "राजकीय प्राथमिक विद्यालय",
  schoolEn: "Govt. Primary School",
  district: "वाराणसी, उत्तर प्रदेश",
  districtEn: "Varanasi, Uttar Pradesh",
  employeeId: "UP-VNS-04821",
  grades: ["3", "4", "5"],
  subjects: { hi: ["गणित", "EVS", "हिंदी"], en: ["Math", "EVS", "Hindi"] },
  stats: { thisWeek: 12, total: 147, streak: 8 },
  joined: { hi: "जनवरी 2024", en: "January 2024" },
};

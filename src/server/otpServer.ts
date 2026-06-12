// ─────────────────────────────────────────────────────────────────────────────
// Fast2SMS Backend — Express API routes for OTP
// ─────────────────────────────────────────────────────────────────────────────
// Run this separately as a Node.js server OR copy into Firebase Cloud Functions.
//
// ENV VARS REQUIRED (server side only — never expose to frontend):
//   FAST2SMS_API_KEY=your_key_here
//   PORT=3000 (optional, defaults to 3000)
//
// To run locally:
//   npx ts-node src/server/otpServer.ts
//
// ─────────────────────────────────────────────────────────────────────────────

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Restrict origin in production!

// In-memory OTP store (use Redis / Firestore for production)
const otpStore = new Map<string, { otp: string; expiresAt: number; attempts: number }>();

const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY ?? "";
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

// ── SEND OTP ──────────────────────────────────────────────────────────────────
app.post("/api/send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  if (!FAST2SMS_API_KEY) {
    return res.status(500).json({ error: "FAST2SMS_API_KEY not configured" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: FAST2SMS_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        route: "otp",
        variables_values: otp,
        numbers: phone,
      }),
    });

    const data = await response.json();

    if (!data.return) {
      return res.status(500).json({ error: "Fast2SMS rejected the request", detail: data });
    }

    // Store OTP server-side
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
      attempts: 0,
    });

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reach Fast2SMS" });
  }
});

// ── VERIFY OTP ────────────────────────────────────────────────────────────────
app.post("/api/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone and OTP are required" });
  }

  const record = otpStore.get(phone);

  if (!record) {
    return res.status(400).json({ error: "No OTP found. Please request a new one." });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return res.status(400).json({ error: "OTP expired. Please request a new one." });
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    otpStore.delete(phone);
    return res.status(429).json({ error: "Too many attempts. Request a new OTP." });
  }

  if (record.otp !== otp) {
    record.attempts += 1;
    return res.status(400).json({ error: `Invalid OTP. ${MAX_ATTEMPTS - record.attempts} attempts left.` });
  }

  otpStore.delete(phone);
  return res.json({ success: true });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`OTP server running on port ${PORT}`));

export default app;

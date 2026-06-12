// ─────────────────────────────────────────────────────────────────────────────
// Fast2SMS OTP Service
// ─────────────────────────────────────────────────────────────────────────────
// The API key is NEVER stored in frontend code.
// All calls go through /api/send-otp and /api/verify-otp
// which must be served by your backend (Vercel serverless, Firebase Function, etc.)
//
// For local dev — add to .env:
//   VITE_OTP_API_BASE=http://localhost:3000
// For production — set VITE_OTP_API_BASE to your deployed backend URL
// ─────────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.VITE_OTP_API_BASE ?? "";

export type OtpResult = { success: boolean; message: string };

/**
 * Calls your backend which then fires Fast2SMS to send a real SMS.
 */
export async function sendOtp(phone: string): Promise<OtpResult> {
  try {
    const res = await fetch(`${BASE}/api/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.error ?? "Failed to send OTP" };
    return { success: true, message: "OTP sent successfully" };
  } catch {
    return { success: false, message: "Network error. Check connection." };
  }
}

/**
 * Calls your backend to verify the entered OTP.
 */
export async function verifyOtp(phone: string, otp: string): Promise<OtpResult> {
  try {
    const res = await fetch(`${BASE}/api/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.error ?? "Invalid OTP" };
    return { success: true, message: "OTP verified" };
  } catch {
    return { success: false, message: "Network error. Check connection." };
  }
}

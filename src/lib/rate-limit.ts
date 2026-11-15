// A simple in-memory rate limiter. 
// In production with multiple servers, use Redis (e.g., Upstash).
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true; // Allowed
  }

  if (record.count >= limit) {
    return false; // Blocked
  }

  record.count += 1;
  return true; // Allowed
}
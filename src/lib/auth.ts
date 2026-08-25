import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const AUTH_SECRET = process.env.AUTH_SECRET || "default-secret-change-in-production-123456";

export interface UserSessionPayload {
  userId: string;
  email: string;
  name: string;
  plan: string;
  avatar?: string;
}

export function signToken(payload: UserSessionPayload): string {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): UserSessionPayload | null {
  try {
    return jwt.verify(token, AUTH_SECRET) as UserSessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<UserSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

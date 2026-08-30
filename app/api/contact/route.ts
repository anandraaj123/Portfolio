import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/firebase";

// Simple in-memory rate limiting map for local/single-server deployment
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - clientData.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  clientData.count += 1;
  if (clientData.count > limit) {
    return true;
  }

  return false;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message cannot exceed 5000 characters"),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    
    // Rate limit: Max 5 submissions per 10 minutes per IP
    if (checkRateLimit(ip, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    
    // Validate request body using Zod
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid request parameters";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, message } = parseResult.data;

    // Graceful fallback for local development if Firebase is not connected
    if (!db) {
      console.warn("Firestore Database not initialized. Simulating message write:", { name, email, message });
      return NextResponse.json({
        success: true,
        message: "Message received (Development Mode: Firestore is offline)."
      });
    }

    // Save message in Firestore
    await db.collection("messages").add({
      name,
      email,
      message,
      createdAt: new Date(),
      status: "unread"
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!"
    });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

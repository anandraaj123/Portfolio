import { getChatFallbackResponse } from "@/lib/chatFallback";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export class AIService {
  /**
   * Sends a message to the AI assistant via Next.js Route Handler /api/chat.
   * If network or server fails, automatically resolves using the local fallback engine.
   */
  static async sendMessage(
    message: string,
    history: ChatMessage[]
  ): Promise<string> {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: history.map((msg) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.response) {
        return data.response;
      }

      // If server returned an error, fallback gracefully
      console.warn("Server API returned error or empty response. Using client-side fallback.");
      return getChatFallbackResponse(message);
    } catch (error: any) {
      console.warn("AIService network request failed. Falling back to local offline engine:", error);
      // Graceful client fallback without breaking the user experience
      return getChatFallbackResponse(message);
    }
  }
}

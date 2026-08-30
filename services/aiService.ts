export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export class AIService {
  /**
   * Sends a message to the AI assistant via Next.js Route Handler /api/chat.
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response from server");
      }

      return data.response;
    } catch (error: any) {
      console.error("AIService.sendMessage failed:", error);
      throw error;
    }
  }
}

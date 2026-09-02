"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Trash2, Cpu, ArrowUpRight } from "lucide-react";
import { AIService, ChatMessage } from "@/services/aiService";

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Tell me about NAVi",
    "What are Anand's core skills?",
    "Why should I hire Anand?",
    "How can I contact Anand?",
    "What is Anand's background?"
  ];

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm Spidey, Anand's personal AI assistant. 🕷️\n\nAsk me anything about Anand's projects (like NAVi), tech stack, education, or how to reach out!\n\nHow can I help you today?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-open chat after 4 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Lock body scroll on mobile when chatbot is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  // Listen for global open-ai-chat event
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

  // Close panel on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        chatPanelRef.current && 
        !chatPanelRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest(".ai-trigger-button")
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await AIService.sendMessage(text, messages);
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Oops! I encountered an error connecting to my database. Please try again.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Conversation history cleared. I'm Spidey. How can I help you learn about Anand today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Speech Bubble Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="fixed bottom-20 right-6 z-40 bg-[#0c0e14]/95 border border-accent/30 text-white text-[11px] font-mono py-2.5 px-4 rounded-xl shadow-2xl flex items-center gap-2 whitespace-nowrap select-none shadow-accent/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            May I help you?
            {/* Tiny triangle pointing down to the FAB trigger */}
            <span className="absolute bottom-[-5px] right-10 w-2.5 h-2.5 bg-[#0c0e14] border-r border-b border-accent/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-trigger-button fixed bottom-6 right-6 z-40 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-[#b59973] text-black font-semibold text-xs py-3 px-5 rounded-full flex items-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 select-none cursor-pointer"
        style={{ minHeight: "44px" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        ✦ Ask Spidey
      </button>

      {/* AI Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-end sm:p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              ref={chatPanelRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="glass-panel w-full sm:w-[420px] h-[85vh] sm:h-[600px] bg-[#17171c]/95 border-b-0 sm:border-b border-white/10 rounded-t-3xl sm:rounded-3xl flex flex-col justify-between overflow-hidden shadow-2xl safe-pb"
            >
              
              {/* Drawer Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <Cpu className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono tracking-wider font-bold text-white uppercase">
                      Spidey
                    </h3>
                    <p className="text-[9px] text-slate-400 font-mono">
                      Ask me anything about Anand
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Clear Button */}
                  <button
                    onClick={handleClearChat}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                    title="Clear Conversation"
                    aria-label="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    aria-label="Close Chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white/5 text-slate-300 border border-white/5 rounded-tl-none whitespace-pre-line"
                      }`}
                    >
                      {msg.content}
                      <span className="block text-[8px] text-slate-500 font-mono mt-1 text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions chips block */}
              <div className="px-4 py-2 border-t border-white/5">
                <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none snap-x">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-400 hover:text-white border border-white/5 hover:border-primary/30 bg-white/5 transition-all duration-300 snap-align-start flex items-center gap-1 select-none"
                    >
                      {prompt}
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input form footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="p-4 border-t border-white/5 bg-white/5 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me something about Anand..."
                  className="flex-1 bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-3 rounded-xl bg-primary hover:bg-[#b59973] disabled:bg-slate-800 disabled:text-slate-600 text-black transition-colors"
                  aria-label="Send message"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

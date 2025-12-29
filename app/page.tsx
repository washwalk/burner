"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, Zap } from "lucide-react";
import { generateKey, exportKey, encryptText } from "@/lib/crypto";

export default function Home() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [strength, setStrength] = useState(0);

  // Calculate "Strength" for the visual meter
  useEffect(() => {
    if (text.length === 0) setStrength(0);
    else if (text.length < 6) setStrength(25);
    else if (text.length < 12) setStrength(50);
    else setStrength(100);
  }, [text]);

  async function handleCreate() {
    if (!text) return;
    
    setIsEncrypting(true);
    
    // Artificial delay (0.8s) to let the "Scanning" animation play
    // This improves "Perceived Security"
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const key = await generateKey();
      const exportedKey = await exportKey(key);
      const encrypted = await encryptText(text, key);

      const res = await fetch("/api/secret", {
        method: "POST",
        body: JSON.stringify(encrypted),
      });

      const { id } = await res.json();
      const url = `${window.location.origin}/s/${id}#${exportedKey}`;
      setLink(url);
      navigator.clipboard.writeText(url);
    } finally {
      setIsEncrypting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="sr-only">Wodah Burner: Secure, Self-Destructing Encrypted Secret Sharing</h1>
      <div className="relative flex flex-col gap-6">
        
        {/* 1. Header with Status */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight">Create Secret</h1>
            <p className="text-gray-600 dark:text-neutral-500 text-sm mt-1">AES-256 Client-Side Encryption</p>
          </div>
          <div className="text-[10px] font-mono text-gray-600 dark:text-neutral-600 uppercase tracking-widest">
            {text.length} Bytes
          </div>
        </div>

        {/* 2. Textarea with "Scanning" Overlay */}
        <div className="relative group">
          <textarea
            className="w-full min-h-[200px] p-4 rounded-xl bg-white/5 dark:bg-neutral-900/50 backdrop-blur-sm border border-gray-300/20 dark:border-neutral-800 text-black dark:text-emerald-500 focus:border-emerald-500/50 outline-none transition-all font-mono text-sm resize-none"
            placeholder="Enter secret data..."
            value={text}
            onChange={(e) => {
                setText(e.target.value);
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
            }}
            disabled={isEncrypting || !!link}
            style={{ height: 'auto' }}
          />

          {/* Scanning Animation */}
          <AnimatePresence>
            {isEncrypting && (
              <motion.div 
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10"
              />
            )}
          </AnimatePresence>

          {/* Encryption Overlay */}
          <AnimatePresence>
            {isEncrypting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <Lock className="w-6 h-6 text-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-500 tracking-tighter">ENCRYPTING...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Strength Meter */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-neutral-500 font-bold">Payload Complexity</span>
            <span className="text-[10px] font-mono text-gray-600 dark:text-neutral-600">{strength}%</span>
          </div>
          <div className="h-1 w-full bg-gray-200 dark:bg-neutral-900 rounded-full overflow-hidden">
            <motion.div 
              animate={{ 
                width: `${strength}%`,
                backgroundColor: strength < 50 ? "#ef4444" : strength < 100 ? "#f59e0b" : "#10b981" 
              }}
              className="h-full transition-colors duration-500"
            />
          </div>
        </div>

        {/* 4. Action Button */}
        {!link ? (
          <button
            onClick={handleCreate}
            disabled={isEncrypting || !text}
            className="relative overflow-hidden group w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl transition-all hover:bg-gray-800 dark:hover:bg-neutral-200 disabled:opacity-30 disabled:grayscale"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 fill-current" />
              Secure & Copy
            </span>
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-white dark:bg-emerald-500/5 border border-emerald-500/30 dark:border-emerald-500/20 rounded-xl"
          >
            <div className="flex items-center gap-2 text-emerald-400 dark:text-emerald-500 mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Link Secured & Copied</span>
            </div>
            <div className="bg-black/40 dark:bg-black/40 p-3 rounded border border-gray-300 dark:border-neutral-800 font-mono text-xs break-all text-black dark:text-neutral-300">
              {link}
            </div>
            <button 
              onClick={() => { setLink(""); setText(""); }} 
              className="mt-4 text-[10px] text-gray-500 dark:text-neutral-500 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors"
            >
              Create New Secret
            </button>
          </motion.div>
        )}
      </div>

      <section className="mt-20 py-12 border-t border-gray-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">How it Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-white font-bold text-lg">1</span>
      </div>
      <h3 className="font-semibold text-black dark:text-white mb-2">Encrypt</h3>
      <p className="text-gray-600 dark:text-neutral-400 text-sm">Your secret is encrypted in your browser using AES-GCM 256-bit encryption.</p>
      </div>
      <div className="text-center">
      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-white font-bold text-lg">2</span>
      </div>
      <h3 className="font-semibold text-black dark:text-white mb-2">Share Link</h3>
      <p className="text-gray-600 dark:text-neutral-400 text-sm">A secure link is generated and copied to your clipboard instantly.</p>
      </div>
      <div className="text-center">
      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-white font-bold text-lg">3</span>
      </div>
      <h3 className="font-semibold text-black dark:text-white mb-2">Burn</h3>
      <p className="text-gray-600 dark:text-neutral-400 text-sm">The secret is permanently deleted from our servers after one read.</p>
      </div>
      </div>
      </section>
    </main>
  );
}

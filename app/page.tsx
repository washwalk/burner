"use client";
import { useState } from "react";
import { generateKey, exportKey, encryptText } from "@/lib/crypto";

export default function Home() {
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCreate() {
        if (!text) return;
        setLoading(true);
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
            setLoading(false);
        }
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="sr-only">Wodah Burner: Secure, Self-Destructing Encrypted Secret Sharing</h1>
        <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">Share a secret.</h1>
        <p className="text-gray-600 dark:text-neutral-400">Encrypted in your browser. Burned after one read.</p>

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
        style={{ height: 'auto' }}
        />

        {!link ? (
            <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
            >
            {loading ? "Securing..." : "Secure & Copy"}
            </button>
        ) : (
            <div className="p-4 bg-white dark:bg-neutral-900 border border-emerald-500/30 rounded-xl animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs text-emerald-400 mb-2 uppercase tracking-widest font-bold">Link Copied to Clipboard</p>
            <code className="text-sm break-all text-black dark:text-neutral-200">{link}</code>
            <button onClick={() => setLink("")} className="block mt-4 text-xs text-gray-500 dark:text-neutral-500 underline">Create another</button>
            </div>
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

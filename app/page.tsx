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
        <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">Share a secret.</h1>
        <p className="text-gray-600 dark:text-neutral-400">Encrypted in your browser. Burned after one read.</p>

        <textarea
        className="w-full h-64 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 text-black dark:text-neutral-100 focus:border-emerald-500 outline-none transition-all font-mono text-sm"
        placeholder="Paste sensitive data (passwords, keys, snippets)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        />

        {!link ? (
            <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
            >
            {loading ? "Encrypting..." : "Generate Secure Link"}
            </button>
        ) : (
            <div className="p-4 bg-white dark:bg-neutral-900 border border-emerald-500/30 rounded-xl animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs text-emerald-400 mb-2 uppercase tracking-widest font-bold">Link Copied to Clipboard</p>
            <code className="text-sm break-all text-black dark:text-neutral-200">{link}</code>
            <button onClick={() => setLink("")} className="block mt-4 text-xs text-gray-500 dark:text-neutral-500 underline">Create another</button>
            </div>
        )}
        </div>
        </main>
    );
}

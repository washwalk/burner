import { ShieldCheck, Github, Lock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-200 dark:border-neutral-900 bg-white dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Mission */}
        <div className="space-y-4">
        <h3 className="text-black dark:text-white font-semibold flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        Zero Knowledge
        </h3>
         <p className="text-sm text-gray-500 dark:text-neutral-500 leading-relaxed">
         Wodah Burner is built on the principle that privacy shouldn't be a feature.
         Zero-Knowledge Architecture: Your decryption key never leaves your device. We physically cannot read your data even if we were forced to.
         </p>
        </div>

        {/* Column 2: Tech Info */}
        <div className="space-y-4">
        <h3 className="text-black dark:text-white font-semibold flex items-center gap-2">
        <Lock className="w-4 h-4 text-emerald-500" />
        The Security
        </h3>
        <ul className="text-sm text-gray-500 dark:text-neutral-500 space-y-2">
        <li>AES-GCM 256-bit Encryption</li>
        <li>Client-side key generation</li>
        <li>Auto-destruct on read</li>
        </ul>
        </div>

        {/* Column 3: Links */}
        <div className="space-y-4">
        <h3 className="text-white font-semibold">Project</h3>
        <div className="flex flex-col gap-2">
        <a
        href="https://github.com"
        className="text-sm text-gray-500 dark:text-neutral-500 hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors"
        target="_blank"
        rel="noreferrer"
        >
        <Github className="w-4 h-4" />
        Open Source (Auditable)
        </a>
        <span className="text-xs text-gray-600 dark:text-neutral-600 mt-2">
        © {new Date().getFullYear()} WODAH LABS
        </span>
        </div>
        </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-900 flex justify-center">
        <p className="text-[10px] text-gray-700 dark:text-neutral-700 uppercase tracking-[0.2em]">
        Simple • Focused • Computational
        </p>
        </div>
        </div>
        </footer>
    );
}

import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-neutral-900 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
        <span className="font-bold tracking-tighter text-2xl text-black dark:text-white group-hover:text-emerald-500 transition-colors">
        WODAH
        </span>
        <div className="h-4 w-[1px] bg-gray-300 dark:bg-neutral-800" />
        <span className="text-xs font-mono text-gray-500 dark:text-neutral-500 uppercase tracking-widest mt-1">
        Burner
        </span>
        </Link>

        <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/10">
        <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tight">
        E2EE Active
        </span>
        </div>
        </div>
        </div>
        </header>
    );
}

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-swarm-dark/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐝</span>
          <span className="text-xl font-bold text-white">SwarmX</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="/" className="hover:text-white transition">Explore</a>
          <a href="/register" className="hover:text-white transition">Register Agent</a>
          <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
        </nav>
        <button className="bg-swarm-primary hover:bg-swarm-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}

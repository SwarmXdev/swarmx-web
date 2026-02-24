export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        AI Agents, <span className="text-swarm-accent">Tokenized</span>
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
        The decentralized marketplace where AI agents issue tokens, trade capabilities, and earn revenue. Built on Solana.
      </p>
      <div className="flex gap-4 justify-center">
        <a href="/register" className="bg-swarm-primary hover:bg-swarm-primary/80 text-white px-6 py-3 rounded-lg font-medium transition">
          Register Your Agent
        </a>
        <a href="#agents" className="border border-gray-600 hover:border-gray-400 text-gray-300 px-6 py-3 rounded-lg font-medium transition">
          Explore Agents
        </a>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
        <div>
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-sm text-gray-500">Agents</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">$0</div>
          <div className="text-sm text-gray-500">Volume</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-sm text-gray-500">Calls</div>
        </div>
      </div>
    </section>
  );
}

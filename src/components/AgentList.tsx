interface Agent {
  name: string;
  description: string;
  price: number;
  callCount: number;
  change24h: number;
}

// Placeholder data — will be replaced with API calls
const PLACEHOLDER_AGENTS: Agent[] = [
  { name: 'CodeReview', description: 'AI-powered code review and bug detection', price: 0.001, callCount: 0, change24h: 0 },
  { name: 'Translator', description: 'Multi-language translation and localization', price: 0.001, callCount: 0, change24h: 0 },
  { name: 'DataAnalyst', description: 'Data cleaning, analysis, and visualization', price: 0.001, callCount: 0, change24h: 0 },
  { name: 'ContractAuditor', description: 'Smart contract security review (informational only)', price: 0.001, callCount: 0, change24h: 0 },
  { name: 'ContentWriter', description: 'SEO articles and social media content', price: 0.001, callCount: 0, change24h: 0 },
];

function AgentCard({ agent }: { agent: Agent }) {
  const changeColor = agent.change24h >= 0 ? 'text-swarm-green' : 'text-swarm-red';
  const changePrefix = agent.change24h >= 0 ? '+' : '';

  return (
    <div className="bg-swarm-card border border-gray-800 rounded-xl p-5 hover:border-swarm-primary/50 transition cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
        <span className={`text-sm font-medium ${changeColor}`}>
          {changePrefix}{agent.change24h}%
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-4">{agent.description}</p>
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="text-gray-500">Price: </span>
          <span className="text-white font-medium">{agent.price} SOL</span>
        </div>
        <div>
          <span className="text-gray-500">Calls: </span>
          <span className="text-white font-medium">{agent.callCount}</span>
        </div>
      </div>
    </div>
  );
}

export function AgentList() {
  return (
    <div id="agents" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {PLACEHOLDER_AGENTS.map((agent) => (
        <AgentCard key={agent.name} agent={agent} />
      ))}
    </div>
  );
}

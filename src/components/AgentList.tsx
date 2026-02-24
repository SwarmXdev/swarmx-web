import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAgents, type Agent } from '@/lib/api';

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agent/${encodeURIComponent(agent.name)}`}>
      <div className="bg-swarm-card border border-gray-800 rounded-xl p-5 hover:border-swarm-primary/50 transition cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">{agent.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500">Calls: </span>
            <span className="text-white font-medium">{agent.callCount ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAgents()
      .then((data) => setAgents(data.agents))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div id="agents" className="text-center py-12 text-gray-400">
        Loading agents...
      </div>
    );
  }

  if (error) {
    return (
      <div id="agents" className="text-center py-12 text-swarm-red">
        Failed to load agents: {error}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div id="agents" className="text-center py-12 text-gray-500">
        No agents registered yet. Be the first!
      </div>
    );
  }

  return (
    <div id="agents" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <AgentCard key={agent.name} agent={agent} />
      ))}
    </div>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error: ${res.status}`);
  }
  const json = await res.json();
  if (json.success === false) throw new Error(json.error || 'API error');
  return json.data as T;
}

// --- Agents ---

export interface Agent {
  publicKey: string;
  authority: string;
  name: string;
  description: string;
  endpoint: string;
  tokenMint: string;
  tokensSold: string;
  solCollected: string;
  callCount: string;
  tokensBurned: string;
  bump: number;
}

export interface AgentsResponse {
  agents: Agent[];
  total: number;
}

export interface RegisterAgentBody {
  name: string;
  description: string;
  endpoint: string;
  walletAddress: string;
}

export interface RegisterAgentResponse {
  transaction: string;
  agentPDA: string;
  mintPDA: string;
}

export function getAgents() {
  return request<AgentsResponse>('/api/agents');
}

export function getAgent(name: string) {
  return request<Agent>(`/api/agents/${encodeURIComponent(name)}`);
}

export function registerAgent(body: RegisterAgentBody) {
  return request<RegisterAgentResponse>('/api/agents/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// --- Tokens ---

export interface TokenInfo {
  agent: string;
  tokenMint: string;
  tokensSold: string;
  solCollected: string;
  currentPriceLamports: string;
}

export interface TxResponse {
  transaction: string;
}

export function getTokenInfo(agentName: string) {
  return request<TokenInfo>(`/api/tokens/${encodeURIComponent(agentName)}`);
}

export function buyToken(agentName: string, amountSol: number, buyerWallet: string) {
  return request<TxResponse>(`/api/tokens/${encodeURIComponent(agentName)}/buy`, {
    method: 'POST',
    body: JSON.stringify({ amountSol, buyerWallet }),
  });
}

export function sellToken(agentName: string, amountToken: number, sellerWallet: string) {
  return request<TxResponse>(`/api/tokens/${encodeURIComponent(agentName)}/sell`, {
    method: 'POST',
    body: JSON.stringify({ amountToken, sellerWallet }),
  });
}

// --- Calls ---

export function callAgent(agentName: string, callerWallet: string, tokenAmount: number) {
  return request<TxResponse>(`/api/calls/${encodeURIComponent(agentName)}`, {
    method: 'POST',
    body: JSON.stringify({ callerWallet, tokenAmount }),
  });
}

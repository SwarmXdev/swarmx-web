import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import { Header } from '@/components/Header';
import { getAgent, getTokenInfo, buyToken, sellToken, callAgent, type Agent, type TokenInfo } from '@/lib/api';

export default function AgentDetail() {
  const router = useRouter();
  const { name } = router.query;
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [agent, setAgent] = useState<Agent | null>(null);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [txStatus, setTxStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!name || typeof name !== 'string') return;
    setLoading(true);
    Promise.all([getAgent(name), getTokenInfo(name)])
      .then(([a, t]) => { setAgent(a); setTokenInfo(t); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name]);

  const walletAddress = publicKey?.toBase58() ?? '';

  async function signAndSend(base64Tx: string): Promise<string> {
    const tx = Transaction.from(Buffer.from(base64Tx, 'base64'));
    const signature = await sendTransaction(tx, connection);
    await connection.confirmTransaction(signature, 'confirmed');
    return signature;
  }

  async function handleBuy() {
    if (!name || typeof name !== 'string' || !walletAddress || !buyAmount) return;
    setTxStatus('Preparing buy transaction...');
    try {
      const res = await buyToken(name, parseFloat(buyAmount), walletAddress);
      setTxStatus('Please approve the transaction in your wallet...');
      const sig = await signAndSend(res.transaction);
      setTxStatus(`Buy confirmed: ${sig}`);
      setBuyAmount('');
      const [a, t] = await Promise.all([getAgent(name), getTokenInfo(name)]);
      setAgent(a);
      setTokenInfo(t);
    } catch (err: any) {
      setTxStatus(`Error: ${err.message}`);
    }
  }

  async function handleSell() {
    if (!name || typeof name !== 'string' || !walletAddress || !sellAmount) return;
    setTxStatus('Preparing sell transaction...');
    try {
      const res = await sellToken(name, parseFloat(sellAmount), walletAddress);
      setTxStatus('Please approve the transaction in your wallet...');
      const sig = await signAndSend(res.transaction);
      setTxStatus(`Sell confirmed: ${sig}`);
      setSellAmount('');
      const [a, t] = await Promise.all([getAgent(name), getTokenInfo(name)]);
      setAgent(a);
      setTokenInfo(t);
    } catch (err: any) {
      setTxStatus(`Error: ${err.message}`);
    }
  }

  async function handleCall() {
    if (!name || typeof name !== 'string' || !walletAddress) return;
    setTxStatus('Preparing call transaction...');
    try {
      const res = await callAgent(name, walletAddress, 1);
      setTxStatus('Please approve the transaction in your wallet...');
      const sig = await signAndSend(res.transaction);
      setTxStatus(`Call confirmed: ${sig}`);
      const [a, t] = await Promise.all([getAgent(name), getTokenInfo(name)]);
      setAgent(a);
      setTokenInfo(t);
    } catch (err: any) {
      setTxStatus(`Error: ${err.message}`);
    }
  }

  const priceSol = tokenInfo ? (Number(tokenInfo.currentPriceLamports) / 1e9).toFixed(9) : '—';

  return (
    <>
      <Head>
        <title>{typeof name === 'string' ? name : 'Agent'} — SwarmX</title>
      </Head>
      <div className="min-h-screen bg-swarm-dark">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-10">
          {loading && <p className="text-gray-400 text-center py-12">Loading...</p>}
          {error && <p className="text-swarm-red text-center py-12">{error}</p>}
          {agent && tokenInfo && (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">{agent.name}</h1>
              <p className="text-gray-400 mb-8">{agent.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Stat label="Price" value={`${priceSol} SOL`} />
                <Stat label="Tokens Sold" value={Number(tokenInfo.tokensSold).toLocaleString()} />
                <Stat label="SOL Collected" value={(Number(tokenInfo.solCollected) / 1e9).toFixed(4)} />
                <Stat label="Calls" value={agent.callCount} />
              </div>

              {/* Actions */}
              {!walletAddress ? (
                <p className="text-gray-500 text-center py-4">Connect your wallet to trade or call this agent.</p>
              ) : (
                <div className="space-y-4">
                  {/* Buy */}
                  <div className="bg-swarm-card border border-gray-800 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-3">Buy Tokens</h3>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="SOL amount"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="flex-1 bg-swarm-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-swarm-primary"
                      />
                      <button onClick={handleBuy} className="bg-swarm-green hover:bg-swarm-green/80 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                        Buy
                      </button>
                    </div>
                  </div>

                  {/* Sell */}
                  <div className="bg-swarm-card border border-gray-800 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-3">Sell Tokens</h3>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        placeholder="Token amount"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="flex-1 bg-swarm-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-swarm-primary"
                      />
                      <button onClick={handleSell} className="bg-swarm-red hover:bg-swarm-red/80 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                        Sell
                      </button>
                    </div>
                  </div>

                  {/* Call Agent */}
                  <div className="bg-swarm-card border border-gray-800 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-3">Call Agent</h3>
                    <button onClick={handleCall} className="bg-swarm-primary hover:bg-swarm-primary/80 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                      Call (1 token)
                    </button>
                  </div>

                  {txStatus && (
                    <p className="text-sm text-swarm-accent text-center">{txStatus}</p>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-swarm-card border border-gray-800 rounded-xl p-4 text-center">
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

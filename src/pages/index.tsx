import Head from 'next/head';
import { AgentList } from '@/components/AgentList';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Head>
        <title>SwarmX — AI Agent Token Marketplace</title>
        <meta name="description" content="AI agents issue tokens, trade capabilities, and earn revenue on Solana." />
      </Head>
      <div className="min-h-screen bg-swarm-dark">
        <Header />
        <Hero />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">🔥 Trending Agents</h2>
          <AgentList />
        </main>
      </div>
    </>
  );
}

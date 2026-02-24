# 🌐 SwarmX Web

Web application for the SwarmX AI Agent Token Marketplace.

## Overview

Explore AI agents, trade their tokens, and track performance — all in a sleek dark-themed interface built for the Solana ecosystem.

## Features

- 🔍 **Explore** — Browse and discover AI agents
- 📈 **Trade** — Buy/sell agent tokens via bonding curves
- 💼 **Wallet** — Phantom wallet integration
- 📊 **Charts** — Real-time token price charts
- 🚀 **Register** — Launch your own AI agent token

## Tech Stack

- **Framework:** Next.js 14 + React 18
- **Styling:** TailwindCSS
- **Wallet:** Solana Wallet Adapter (Phantom)
- **Charts:** Lightweight Charts (TradingView)
- **Language:** TypeScript

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Export static site
npm run build  # outputs to /out
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx        # Navigation bar + wallet connect
│   ├── Hero.tsx          # Landing hero section
│   └── AgentList.tsx     # Agent cards grid
├── pages/
│   ├── _app.tsx          # App wrapper
│   └── index.tsx         # Home page
└── styles/
    └── globals.css       # Global styles + Tailwind
```

## License

MIT

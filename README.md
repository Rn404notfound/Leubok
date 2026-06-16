# Leubok - Web3 Marketplace

A decentralized e-commerce marketplace built on the Cosmos ecosystem with blockchain-based payments, smart contracts, and AI-powered commerce features.

## 🌟 Features

### Core Marketplace
- 🛍️ Product listing and discovery
- 🔍 Advanced search and filtering
- 🛒 Shopping cart management
- 📦 Order tracking and history
- ⭐ Reputation and rating system

### Blockchain & Payments
- 💳 USDC payments on Cosmos
- 🔐 Smart contract escrow
- 💰 Automatic seller payouts
- 🔄 Dispute resolution
- ✅ Transaction verification

### User System
- 🔑 Wallet-based authentication (Keplr, Leap, WalletConnect)
- 👤 Buyer and seller profiles
- 📊 User dashboard
- 🎖️ Seller verification badges
- 📈 Transaction history

### Seller Tools
- 📊 Sales analytics
- 💵 Revenue dashboard
- 📦 Inventory management
- 🎯 Promotion tools
- 🤖 AI marketing assistant

### AI Features
- 🤖 Product recommendations
- ✍️ AI description generation
- 🔍 Smart product discovery
- 💬 AI customer support

### Admin Panel
- 📊 Dashboard analytics
- 👥 User management
- 🛡️ Moderation tools
- 📈 Revenue tracking
- ⚙️ System configuration

## 🏗️ Project Structure

```
leubok/
├── frontend/                 # Next.js marketplace UI
├── backend/                  # Node.js API server
├── admin-panel/             # Next.js admin dashboard
├── smart-contracts/         # CosmWasm contracts (Rust)
├── database/                # Prisma schemas & migrations
├── docs/                    # Documentation
├── docker-compose.yml       # Docker configuration
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Rust (for smart contracts)
- PostgreSQL 14+

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rn404notfound/leubok.git
cd leubok
```

2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Install dependencies
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install

# Admin Panel
cd ../admin-panel && npm install

# Smart Contracts
cd ../smart-contracts && rustup update
```

4. Start the database
```bash
docker-compose up -d postgres
```

5. Run migrations
```bash
cd backend
npx prisma migrate deploy
```

6. Start development servers
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Admin Panel
cd admin-panel && npm run dev
```

Access the application:
- 🛍️ Marketplace: http://localhost:3000
- ⚙️ Admin Panel: http://localhost:3001
- 📡 API: http://localhost:3500

## 📊 Development Phases

### Phase 1: MVP (Core Marketplace)
- [ ] User wallet authentication
- [ ] Basic product listing
- [ ] Shopping cart
- [ ] USDC payment (testnet)
- [ ] Simple order management

### Phase 2: Enhanced Features
- [ ] Reputation system
- [ ] Seller dashboard
- [ ] Inventory management
- [ ] Advanced search
- [ ] Order tracking

### Phase 3: AI & Advanced
- [ ] AI recommendations
- [ ] AI description generation
- [ ] AI support chatbot
- [ ] Analytics dashboard
- [ ] Seller tools

### Phase 4: Admin & Scaling
- [ ] Admin panel
- [ ] Moderation tools
- [ ] Advanced analytics
- [ ] Seller subscriptions
- [ ] Enterprise features

### Phase 5: Mainnet & Multi-chain
- [ ] Mainnet deployment
- [ ] IBC integration
- [ ] Multi-chain support
- [ ] DeFi features
- [ ] Enterprise solutions

## 🔒 Security

- ✅ Smart contract audited patterns
- ✅ Wallet-based authentication (non-custodial)
- ✅ HTTPS encryption
- ✅ Rate limiting & DDoS protection
- ✅ Input validation & sanitization
- ✅ Role-based access control (RBAC)
- ✅ Reentrancy protection
- ✅ Transaction verification

## 📚 Documentation

See `/docs` for detailed documentation:
- [Architecture.md](./docs/ARCHITECTURE.md) - System design
- [Database Schema](./docs/DATABASE_SCHEMA.md) - Data models
- [API Documentation](./docs/API.md) - Endpoint reference
- [Smart Contracts](./docs/SMART_CONTRACTS.md) - Contract details
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production setup

## 🤝 Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT + Wallet Auth
- OpenAI API

### Blockchain
- CosmWasm
- Rust
- Cosmos SDK
- USDC CW20

### Storage
- IPFS (Pinata)
- Arweave

## 🌐 Deployment

- **Frontend**: Vercel
- **Backend**: AWS ECS / DigitalOcean
- **Database**: AWS RDS PostgreSQL
- **Blockchain**: Cosmos testnet → mainnet
- **Storage**: IPFS + CDN

## 📄 License

MIT License - See LICENSE file

## 🤝 Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines

## 📧 Contact

- GitHub: [@Rn404notfound](https://github.com/Rn404notfound)
- Issues: Use GitHub Issues for bug reports
- Discussions: Use GitHub Discussions for feature requests

---

**Built with ❤️ for Web3 Commerce**

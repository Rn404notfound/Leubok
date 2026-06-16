# Leubok System Architecture

## High-Level Overview

Leubok is a decentralized marketplace combining:
- Traditional e-commerce UI/UX (Shopee/Amazon style)
- Blockchain infrastructure (Cosmos ecosystem)
- Smart contract automation (CosmWasm escrow)
- AI-powered features (recommendations, descriptions)
- Enterprise admin tools

## Layered Architecture

### 1. Presentation Layer (Frontend)

**Components:**
- Next.js 15 marketplace UI
- React components with TypeScript
- Tailwind CSS styling system
- Responsive mobile-first design

**Key Features:**
- Wallet connection UI (Keplr, Leap, WalletConnect)
- Product browsing and search
- Shopping cart management
- Payment flow
- Order tracking
- User dashboard
- Seller tools
- Admin panel (separate app)

**State Management:**
- Zustand for global state
- React Context for theme/auth
- React Query for API data fetching

### 2. API Layer (Backend)

**Technology Stack:**
- Node.js runtime
- Express.js framework
- REST API endpoints
- JWT authentication
- Wallet signature verification

**Responsibilities:**
- User authentication and authorization
- Product management
- Order processing
- Payment coordination
- IPFS/Arweave integration
- AI API calls
- Email notifications
- Admin operations
- Analytics and reporting

**Architecture Pattern:**
```
Routes → Controllers → Services → Database/External APIs
```

### 3. Database Layer

**Technology:**
- PostgreSQL (relational database)
- Prisma ORM (type-safe queries)
- Redis (caching layer)

**Data Models:**
- Users (buyers, sellers, admins)
- Products and categories
- Orders and payments
- Reviews and ratings
- Disputes and support tickets
- Admin logs and analytics

### 4. Blockchain Layer

**Chain:** Cosmos ecosystem

**Smart Contracts (CosmWasm):**

1. **Escrow Contract**
   - Receives USDC from buyer
   - Locks funds during fulfillment
   - Releases to seller on confirmation
   - Handles refunds on disputes

2. **Reputation Contract**
   - Stores on-chain ratings
   - Maintains trust scores
   - Tracks transaction history
   - Issues seller verification tokens

3. **Marketplace Contract**
   - Manages product listings
   - Creates orders
   - Tracks platform fees
   - Enforces business rules

4. **Token Integration**
   - USDC CW20 token interactions
   - Payment transfers
   - Fee distributions

### 5. Storage Layer

**Distributed Storage:**
- **IPFS (via Pinata):** Product images, documents
- **Arweave:** Permanent storage for receipts, contracts
- **CDN:** Edge caching for images

### 6. External Services

**AI Services:**
- OpenAI (GPT-4) for descriptions and recommendations
- Claude (Anthropic) for content moderation

**Email Service:**
- SendGrid or SMTP for notifications

**Analytics:**
- Google Analytics (frontend)
- Custom analytics (backend)

## Data Flow Diagrams

### User Registration Flow
```
User connects wallet
    ↓
Frontend gets message to sign
    ↓
User signs with wallet (non-custodial)
    ↓
Backend verifies signature
    ↓
Backend creates user record
    ↓
Backend generates JWT token
    ↓
Frontend stores JWT and starts session
```

### Purchase Flow
```
Buyer adds products to cart
    ↓
Buyer initiates checkout
    ↓
Backend calculates total + fees
    ↓
Frontend initiates USDC transfer to escrow contract
    ↓
Buyer confirms payment with wallet
    ↓
Transaction broadcast to Cosmos chain
    ↓
Backend monitors transaction confirmation
    ↓
Order created in database
    ↓
Seller receives notification
    ↓
Seller ships product
    ↓
Buyer confirms receipt
    ↓
Backend triggers escrow release
    ↓
Smart contract transfers USDC to seller
    ↓
Platform fee transferred to admin wallet
    ↓
Order marked completed
    ↓
Both parties can leave reviews
```

### Dispute Resolution Flow
```
Buyer reports issue
    ↓
AI analyzes claim
    ↓
Admin notified
    ↓
Admin reviews evidence
    ↓
Admin makes decision
    ↓
If refund approved:
  → Smart contract refunds buyer
If resolved:
  → Release to seller
    ↓
Dispute closed
```

## API Endpoint Structure

```
/api/v1/
├── /auth
│   ├── POST /wallet-message
│   ├── POST /verify-wallet
│   └── POST /logout
├── /users
│   ├── GET /profile
│   ├── PUT /profile
│   ├── GET /stats
│   └── GET /:id/reputation
├── /products
│   ├── GET / (list)
│   ├── POST / (create)
│   ├── GET /:id
│   ├── PUT /:id
│   ├── DELETE /:id
│   └── GET /category/:category
├── /orders
│   ├── POST / (create)
│   ├── GET / (list)
│   ├── GET /:id
│   ├── PUT /:id/status
│   ├── POST /:id/confirm
│   └── POST /:id/track
├── /payments
│   ├── POST /create-escrow
│   ├── GET /:id
│   ├── POST /:id/release
│   └── POST /:id/refund
├── /ratings
│   ├── POST /
│   ├── GET /:id
│   └── PUT /:id
├── /cart
│   ├── GET /
│   ├── POST /items
│   ├── PUT /items/:id
│   └── DELETE /items/:id
├── /search
│   ├── GET / (full-text search)
│   └── GET /suggestions
└── /admin
    ├── GET /dashboard
    ├── GET /users
    ├── PUT /users/:id
    ├── GET /products
    ├── DELETE /products/:id
    ├── GET /orders
    ├── GET /analytics
    └── POST /disputes/:id/resolve
```

## Security Architecture

### Frontend Security
- HTTPS only
- Content Security Policy (CSP)
- XSS protection
- CSRF tokens
- Local storage for JWT (or sessionStorage)

### Backend Security
- Input validation and sanitization
- SQL injection prevention (Prisma)
- Rate limiting
- DDoS protection
- CORS configuration
- JWT token validation
- Wallet signature verification
- Role-based access control (RBAC)

### Smart Contract Security
- Re-entrancy guards
- Safe math (checked arithmetic)
- Pause mechanism
- Owner controls
- Timelock for critical functions

### Wallet Security
- Non-custodial (keys stay in user's wallet)
- Client-side signing only
- Message-based authentication
- Wallet connection via Keplr/Leap

## Scalability Strategy

### Database Scaling
- Connection pooling
- Read replicas
- Partitioning by user/date
- Query optimization
- Caching with Redis

### API Scaling
- Load balancing
- Horizontal scaling with containers
- CDN for static assets
- Response caching

### Blockchain Scaling
- Batch transactions
- Off-chain indexing
- Event monitoring
- Async processing

### Frontend Scaling
- Code splitting
- Image optimization
- CDN distribution
- Service workers

## Deployment Architecture

```
Users
  ↓
CDN (CloudFlare/Akamai)
  ↓
Load Balancer
  ├─ Frontend (Vercel)
  ├─ Admin Panel (Vercel)
  └─ Backend (AWS ECS/Docker)
        ↓
        ├─ PostgreSQL (AWS RDS)
        ├─ Redis (AWS ElastiCache)
        ├─ IPFS Gateway (Pinata)
        └─ Blockchain (Cosmos RPC)
```

## Monitoring & Observability

**Logging:**
- Application logs (ELK stack)
- Transaction logs
- Error tracking (Sentry)

**Monitoring:**
- Performance metrics (Datadog)
- Database performance
- API latency
- Smart contract events

**Alerting:**
- High error rates
- Payment failures
- System outages
- Unusual activity

## Development Workflow

1. **Local Development**
   - Docker Compose for services
   - Hot reload enabled
   - Local Cosmos testnet
   - Mock payment system

2. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Playwright)
   - Smart contract testing (Rust)

3. **Staging**
   - Cosmos testnet
   - Staging database
   - Staging IPFS node
   - Full feature testing

4. **Production**
   - Cosmos mainnet
   - Production database
   - High availability setup
   - Disaster recovery

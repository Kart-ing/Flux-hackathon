# 🌟 Flux: The Complete AI Agent Economy

> **A groundbreaking hackathon submission featuring three integrated systems: a multi-agent marketplace powered by Dedalus, an autonomous payment infrastructure with virtual cards and AI consensus, and a beautiful real-time economy dashboard.**

[![Status](https://img.shields.io/badge/status-production--ready-brightgreen)]()
[![Python](https://img.shields.io/badge/python-3.10+-blue)]()
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue)]()
[![Next.js](https://img.shields.io/badge/next.js-14-black)]()
[![Dedalus](https://img.shields.io/badge/dedalus-powered-purple)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 🎯 The Vision

**Flux** is a complete demonstration of the future of AI agent economies. It combines three powerful systems to create an autonomous marketplace where AI agents can discover services, hire each other, request payments with justifications, get approved by multi-agent consensus, and transact using one-time virtual cards - all tracked in real-time through a beautiful dashboard.

---

## 📋 Table of Contents

- [🎯 The Vision](#-the-vision)
- [🏗️ Three Integrated Systems](#️-three-integrated-systems)
- [🎬 Complete Demo Flow](#-complete-demo-flow)
- [🚀 Quick Start](#-quick-start)
- [📦 Repository Structure](#-repository-structure)
- [💡 Key Features](#-key-features)
- [🏛️ Architecture](#️-architecture)
- [🎭 Demo Scenarios](#-demo-scenarios)
- [📊 Analytics & Monitoring](#-analytics--monitoring)
- [🔐 Security Features](#-security-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🏗️ Three Integrated Systems

### 1. 🤖 **Simulation: Multi-Agent Marketplace** ([/Simulation](./Simulation))

An AI agent marketplace powered by Dedalus where specialized agents offer services to each other:

- **Orchestrator Agent**: Takes natural language goals, breaks them into tasks, hires specialist agents
- **Specialized Service Agents**:
  - 📊 Data Analyst - $25 (data analysis, cleaning, visualization)
  - ✍️ Content Writer - $15-30 (blog posts, ad copy, technical writing)
  - 🔍 Researcher - $20-50 (market research, fact-checking)
  - 💻 Code Reviewer - $15-60 (code review, bug detection)
  - 🎨 Image Generator - $10-40 (marketing images, graphics)
- **Service Marketplace**: Discovery, pricing, contracts
- **Complete Workflows**: Marketing campaigns, product launches, data pipelines

**Example**: "Launch a marketing campaign" → Orchestrator hires Researcher (audience analysis) → Content Writer (ad copy) → Image Generator (visuals) → Delivers complete campaign.

### 2. 💳 **AgentPay SDK: Autonomous Payment Infrastructure** ([/AgentPay-SDK](./AgentPay-SDK))

A complete payment brain and ledger system for AI agents:

- **Payment Model**: Agents, wallets, policies, payment intents, transfers, escrow, streams
- **Internal Ledger**: Double-entry accounting with credits as default currency
- **Agent Policies**: Spending limits, approval thresholds, allowlists, daily caps
- **Virtual Cards**: One-time use cards with full details (number, CVV, expiry)
- **AI Consensus**: 5-agent quorum evaluates payment requests before approval
- **REST API**: HTTP interface for any language to integrate

**Example**: Agent requests $100 → 5 AI agents vote → If approved, one-time virtual card generated → Agent makes purchase → Card auto-expires.

### 3. 📊 **Flux Economy: Real-Time Dashboard** ([/flux/flux-economy](./flux/flux-economy))

A beautiful Next.js dashboard that visualizes the entire economy:

- **Economy Overview**: Total volume, active agents, transaction counts
- **Agent Management**: View all agents, their balances, transactions, performance stats
- **Transaction History**: Real-time feed with consensus vote details
- **Budget Tracking**: Usage monitoring, cost estimation, budget alerts
- **API Key Management**: Generate keys for SDK agents
- **Analytics**: Spending patterns, approval rates, agent performance metrics

**Example**: See real-time consensus votes as they happen → Track which agents are top earners/spenders → Monitor budget usage → Generate API keys for new agents.

---

## 🎬 Complete Demo Flow

Here's how all three systems work together:

### Scenario: Marketing Campaign with Autonomous Payment

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER REQUEST                                                 │
│   User: "Create a marketing campaign for our new AI product"   │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. ORCHESTRATOR AGENT (Simulation)                             │
│   - Breaks down goal into subtasks                             │
│   - Identifies required specialists:                           │
│     • Researcher: Analyze market and competitors ($50)          │
│     • Content Writer: Create ad copy ($30)                      │
│     • Image Generator: Design visuals ($40)                     │
│   - Total budget needed: $120                                   │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. PAYMENT REQUEST (AgentPay SDK)                              │
│   Orchestrator: "I need $120 for marketing campaign services"  │
│   - Purpose: "Hire 3 specialists for campaign creation"        │
│   - Justification: "Market research + content + visuals"       │
│   - Expected ROI: "$5K from improved customer acquisition"     │
│   - Urgency: High                                               │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. AI CONSENSUS QUORUM (5 Agents Vote)                         │
│   💼 CFO Agent (Claude Sonnet):                                │
│      ✅ YES - "Reasonable cost for clear deliverables"          │
│   🚀 Growth Agent (GPT-4):                                      │
│      ✅ YES - "Aligns with customer acquisition strategy"       │
│   🛡️ Risk Agent (Grok):                                        │
│      ✅ YES - "Low risk, well-defined scope"                    │
│   ⚙️ Operations Agent (GPT-4o-mini):                           │
│      ✅ YES - "Standard marketing expense, good value"          │
│   📊 Data Agent (O1):                                           │
│      ✅ YES - "ROI metrics support the investment"              │
│                                                                 │
│   RESULT: ✅ 5/5 APPROVED                                       │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. VIRTUAL CARD GENERATION                                     │
│   Card Number: 4242 4242 9182 7364                             │
│   CVV: 123                                                      │
│   Expiry: 12/26                                                 │
│   Limit: $120.00                                                │
│   Valid for: 24 hours                                           │
│   Status: ACTIVE                                                │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. AGENT HIRING & TRANSACTIONS                                 │
│   Orchestrator uses card to hire agents:                       │
│   - Pay Researcher: $50 ✅ (Balance: $70)                       │
│   - Pay Content Writer: $30 ✅ (Balance: $40)                   │
│   - Pay Image Generator: $40 ✅ (Balance: $0)                   │
│   Card Status: USED                                             │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 7. WORK EXECUTION (Simulation)                                 │
│   Each specialist agent completes their task:                  │
│   - Researcher: Delivers market analysis report                │
│   - Content Writer: Creates compelling ad copy                 │
│   - Image Generator: Produces marketing visuals                │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 8. DASHBOARD VISUALIZATION (Flux Economy)                      │
│   Real-time updates showing:                                   │
│   - Payment request with all 5 consensus votes                 │
│   - Virtual card details and usage                             │
│   - 3 agent hire transactions                                  │
│   - Budget tracking ($120 spent)                               │
│   - Agent performance stats (Researcher +$50 earned, etc.)     │
│   - Complete audit trail                                       │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ 9. DELIVERABLES                                                │
│   User receives complete marketing campaign:                   │
│   ✅ Market analysis and competitor research                    │
│   ✅ Professional ad copy                                       │
│   ✅ Marketing visuals and graphics                             │
│   All for $120, fully autonomous, fully audited                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### One-Command Setup

```bash
cd "/Users/kartikeypandey/Documents/Flux overall"
./quick-start.sh
```

This script will:
- Check prerequisites (Python 3.10+, Node.js 18+)
- Install all dependencies (backend, frontend, SDK)
- Set up environment files
- Initialize database
- Provide launch instructions

### Manual Setup (3 terminals)

**Terminal 1 - Backend:**
```bash
cd flux/flux-economy/backend
python3 -m venv venv && source venv/bin/activate
pip install flask flask-cors python-dotenv supabase requests dedalus-labs
python api.py
```

**Terminal 2 - Frontend:**
```bash
cd flux/flux-economy
npm install && npm run dev
```

**Terminal 3 - Run Simulation:**
```bash
cd Simulation
pip install -r requirements.txt
python run_orchestrator.py
```

### Access Points

- 🌐 **Dashboard**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5001
- 🔑 **Login**: `demo` / `welcome`

---

## 📦 Repository Structure

This is a multi-repository hackathon submission with three submodules:

```
Flux-hackathon/
├── AgentPay-SDK/           # Payment infrastructure (Submodule)
│   ├── agentpay/
│   │   ├── sdk.py                    # Main SDK interface
│   │   ├── http_client.py            # API communication
│   │   └── models/                   # Data models
│   ├── examples/
│   │   └── autonomous_agent.py       # Complete demo script
│   └── README.md
│
├── Simulation/             # Multi-agent marketplace (Submodule)
│   ├── agents/
│   │   ├── specialized/              # Service provider agents
│   │   └── orchestrator/             # Coordinator agent
│   ├── tools/                        # Reusable tools
│   ├── marketplace/                  # Service catalog & discovery
│   ├── scenarios/                    # Demo workflows
│   ├── run_orchestrator.py           # Main entry point
│   └── README.md
│
├── flux/                   # Dashboard & backend (Submodule)
│   └── flux-economy/
│       ├── app/                      # Next.js pages
│       │   ├── dashboard/
│       │   ├── agents/
│       │   ├── billing/
│       │   └── api-keys/
│       ├── components/               # React components
│       │   ├── VirtualCardDisplay.tsx
│       │   ├── AgentCard.tsx
│       │   └── TransactionRow.tsx
│       ├── backend/
│       │   ├── api.py                # Flask API server
│       │   ├── card_generator.py     # Virtual card creation
│       │   ├── approval_flow.py      # Quorum integration
│       │   ├── concensus.py          # 5-agent voting system
│       │   └── auth_middleware.py    # API key authentication
│       └── README.md
│
├── quick-start.sh          # Automated setup script
├── IMPLEMENTATION_GUIDE.md # Complete technical documentation
├── IMPLEMENTATION_SUMMARY.md
├── AGENT_TRACKING.md
└── README.md               # This file
```

---

## 💡 Key Features

### 🤖 Multi-Agent Marketplace
- ✅ **5 Specialized Agents** with unique capabilities and pricing
- ✅ **Orchestrator System** that breaks down complex goals
- ✅ **Service Discovery** and marketplace catalog
- ✅ **Natural Language** task decomposition
- ✅ **Real Workflows** (marketing campaigns, product launches)

### 💳 Autonomous Payments
- ✅ **Virtual Card Generation** - Luhn-valid, one-time use, auto-expiry
- ✅ **5-Agent Quorum** - Multi-model AI consensus (Claude, GPT-4, Grok, O1)
- ✅ **Payment Policies** - Spending limits, approval thresholds, allowlists
- ✅ **Double-Entry Ledger** - Complete transaction history
- ✅ **Escrow & Streaming** - Advanced payment patterns
- ✅ **REST API** - Language-agnostic HTTP interface

### 📊 Real-Time Dashboard
- ✅ **Economy Overview** - Live stats on volume, agents, transactions
- ✅ **Agent Management** - View balances, performance, transaction history
- ✅ **Consensus Visualization** - See AI votes in real-time
- ✅ **Budget Tracking** - Usage monitoring with alerts
- ✅ **API Key Management** - Generate and manage SDK keys
- ✅ **Beautiful UI** - Modern design with Tailwind CSS

### 🔐 Security & Compliance
- ✅ **API Key Authentication** - Bearer token security
- ✅ **User Isolation** - Row-level security in database
- ✅ **Card Validation** - Luhn algorithm, expiry checks
- ✅ **Audit Trail** - Complete transaction history
- ✅ **Budget Limits** - Prevent overspending

---

## 🏛️ Architecture

### High-Level System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER / CLIENT                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              FLUX ECONOMY DASHBOARD (Next.js)                   │
│  • Economy overview    • Agent management   • Transactions      │
│  • Budget tracking     • API keys           • Analytics         │
└───────────┬────────────────────────────────────────────┬────────┘
            │                                            │
            ▼                                            ▼
┌──────────────────────────┐              ┌──────────────────────┐
│  SIMULATION SYSTEM       │              │  AGENTPAY SDK        │
│  (Dedalus Agents)        │◄────────────►│  (Payment Brain)     │
│                          │              │                      │
│  • Orchestrator Agent    │              │  • Virtual Cards     │
│  • Service Agents:       │              │  • AI Consensus      │
│    - Data Analyst        │              │  • Internal Ledger   │
│    - Content Writer      │              │  • Payment Policies  │
│    - Researcher          │              │  • REST API          │
│    - Code Reviewer       │              │                      │
│    - Image Generator     │              │                      │
└──────────┬───────────────┘              └──────────┬───────────┘
           │                                         │
           └─────────────────┬───────────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  FLASK BACKEND API   │
                  │  • Request routing   │
                  │  • Authentication    │
                  │  • Card generation   │
                  │  • Consensus flow    │
                  │  • Mock merchant     │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  SUPABASE DATABASE   │
                  │  (PostgreSQL)        │
                  │  • users             │
                  │  • agents            │
                  │  • transactions      │
                  │  • virtual_cards     │
                  │  • api_keys          │
                  └──────────────────────┘
```

### Payment Request Flow

```
Agent Request
      ↓
Policy Check (spending limits, allowlists)
      ↓
5-Agent Quorum Vote
      ↓  (3+ YES required)
Virtual Card Generation
      ↓
Card Details Returned
      ↓
Agent Makes Purchase
      ↓
Validation (Luhn, expiry, limit)
      ↓
Transaction Recorded
      ↓
Card Marked as Used
      ↓
Dashboard Updated
```

---

## 🎭 Demo Scenarios

### 1. Marketing Campaign (Recommended First Demo)

```bash
cd Simulation
python scenarios/marketing_campaign.py
```

**What happens:**
1. Orchestrator receives goal: "Create marketing campaign"
2. Breaks down into: Research → Content → Visuals
3. Requests payment for $120
4. 5 AI agents vote (expect 5/5 approval)
5. Virtual card generated
6. Hires 3 specialists
7. Each completes their task
8. Deliverables aggregated
9. Full audit trail in dashboard

### 2. Autonomous Payment Demo

```bash
cd AgentPay-SDK
export AGENTPAY_API_KEY="sk_test_your_key_here"
python examples/autonomous_agent.py
```

**What happens:**
- Scenario 1: $100 OpenAI credits (APPROVE ✅)
- Scenario 2: $50 Analytics tools (APPROVE ✅)
- Scenario 3: $2,500 AWS (DENY ❌)

### 3. Data Pipeline Workflow

```bash
cd Simulation
python scenarios/data_pipeline.py
```

**What happens:**
1. Request: "Analyze sales data and generate report"
2. Hires Data Analyst
3. Processes dataset
4. Generates visualizations
5. Creates summary report

---

## 📊 Analytics & Monitoring

### Dashboard Features

**Economy Tab** (http://localhost:3000/dashboard)
- Total transaction volume
- Active agents count
- Transaction throughput
- Top earners and spenders

**Agents Tab** (http://localhost:3000/agents)
- All registered agents
- Balance and hold amounts
- Transaction counts
- Average transaction size
- Performance metrics

**Billing Tab** (http://localhost:3000/billing)
- API call tracking
- Virtual cards generated
- Consensus votes cast
- Total spending
- Budget progress bar
- Cost estimation

**Transactions Tab**
- Real-time transaction feed
- Consensus vote details for each payment
- Card usage tracking
- Full audit trail

### Monitoring Agent Performance

```python
from agentpay import AgentPaySDK

sdk = AgentPaySDK()

# View agent stats
stats = sdk.get_agent_stats("data-analyst-001")
print(f"Total earned: ${stats['total_earned'] / 100}")
print(f"Jobs completed: {stats['transaction_count']}")
print(f"Avg per job: ${stats['avg_transaction_size'] / 100}")
```

---

## 🔐 Security Features

### Authentication & Authorization
- **API Key System**: Secure bearer token authentication
- **User Isolation**: Row-level security ensures data privacy
- **Password Hashing**: Secure password storage with SHA-256

### Payment Security
- **One-Time Cards**: Cards can only be used once
- **Auto-Expiry**: 24-hour expiration window
- **Luhn Validation**: Industry-standard card number validation
- **Amount Limits**: Cards cannot exceed approved amount
- **Status Tracking**: Active/Used/Expired/Cancelled states

### Consensus Security
- **Multi-Model Voting**: 5 different AI models prevent bias
- **Approval Threshold**: Requires 3+ YES votes
- **Full Reasoning**: Each vote includes detailed explanation
- **Audit Trail**: All votes permanently recorded

### Policy Enforcement
- **Spending Limits**: Max per transaction
- **Daily Caps**: Maximum daily spend
- **Allowlists**: Restrict which agents can transact
- **Pause Switch**: Global kill-switch for emergencies

---

## 🛠️ Technologies Used

### Backend
- **Python 3.10+** - Core language
- **Flask** - API server
- **Supabase** - PostgreSQL database with real-time features
- **Dedalus** - AI agent orchestration framework
- **SQLite** - Local development database

### AI Models (Consensus Quorum)
- **Anthropic Claude Sonnet 4** - CFO Agent (conservative oversight)
- **OpenAI GPT-4** - Growth Agent (expansion focus)
- **xAI Grok** - Risk Agent (risk assessment)
- **OpenAI GPT-4o-mini** - Operations Agent (practical focus)
- **OpenAI O1** - Data Agent (evidence-based analysis)

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **shadcn/ui** - UI components

### Payment Infrastructure
- **AgentPay SDK** - Custom payment framework
- **Virtual Cards** - Luhn-valid card generation
- **Double-Entry Ledger** - Accounting system

---

## 📚 Documentation

### Core Documentation
- **[README.md](./README.md)** - This file (overview and getting started)
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete technical guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Feature-by-feature summary
- **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** - Final implementation status
- **[AGENT_TRACKING.md](./AGENT_TRACKING.md)** - Agent registration system details

### System-Specific Documentation
- **[AgentPay-SDK/README.md](./AgentPay-SDK/README.md)** - SDK documentation
- **[Simulation/README.md](./Simulation/README.md)** - Marketplace documentation
- **[flux/README.md](./flux/README.md)** - Dashboard documentation

### Quick References
- **[quick-start.sh](./quick-start.sh)** - Automated setup script
- **API Endpoints**: See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#api-reference)

---

## 🎓 Use Cases & Applications

This system demonstrates patterns for:

### Enterprise Use Cases
- **AI Agent Orchestration** - Complex multi-agent workflows
- **Autonomous Procurement** - Agents making purchasing decisions
- **Budget Management** - Automated spending with oversight
- **Service Marketplaces** - Agent-to-agent service discovery

### Research Applications
- **Consensus Mechanisms** - Multi-agent democratic decision making
- **Economic Simulations** - Agent behavior in markets
- **Payment Infrastructure** - Virtual card systems
- **AI Governance** - Oversight and accountability

### Developer Tools
- **SDK Design** - Building payment systems for agents
- **Dashboard Patterns** - Real-time transaction visualization
- **Policy Engines** - Configurable spending rules
- **Audit Systems** - Complete transaction tracking

---

## 🚧 Implementation Status

| Component | Status | Completion |
|-----------|--------|------------|
| **AgentPay SDK** | ✅ Complete | 100% |
| • Payment model | ✅ | 100% |
| • Virtual cards | ✅ | 100% |
| • AI consensus | ✅ | 100% |
| • REST API | ✅ | 100% |
| **Simulation** | ✅ Complete | 100% |
| • Orchestrator | ✅ | 100% |
| • Service agents | ✅ | 100% |
| • Marketplace | ✅ | 100% |
| • Workflows | ✅ | 100% |
| **Dashboard** | ✅ Complete | 100% |
| • Economy view | ✅ | 100% |
| • Agent management | ✅ | 100% |
| • Transactions | ✅ | 100% |
| • Budget tracking | ✅ | 100% |
| • API keys | ✅ | 100% |
| **Integration** | ✅ Complete | 100% |
| • End-to-end flow | ✅ | 100% |
| • Database schema | ✅ | 100% |
| • Authentication | ✅ | 100% |

**Overall Progress: 100% Complete** ✅

---

## 🎯 Success Metrics

| Metric | Target | Status |
|--------|--------|--------|
| End-to-end agent workflow | Working | ✅ Achieved |
| Multi-agent consensus | 5 AI models | ✅ Achieved |
| Virtual card generation | Luhn-valid, CVV, expiry | ✅ Achieved |
| Budget tracking | Real-time with alerts | ✅ Achieved |
| Dashboard visualization | All data displayed | ✅ Achieved |
| API integration | REST API functional | ✅ Achieved |
| Documentation | Comprehensive guides | ✅ Achieved |
| Demo scenarios | 3+ working examples | ✅ Achieved |

---

## 🔮 Future Enhancements

### High Priority
- [ ] **Real Payment Rails** - Integrate Stripe/bank transfers
- [ ] **Webhooks** - Event notifications for external systems
- [ ] **Rate Limiting** - Prevent API abuse
- [ ] **Multi-Currency** - Support USD, EUR, etc.

### Medium Priority
- [ ] **Mobile App** - React Native dashboard
- [ ] **Advanced Analytics** - Charts, trends, forecasting
- [ ] **Agent Reputation** - Trust scores and ratings
- [ ] **Batch Payments** - Pay multiple agents at once

### Nice to Have
- [ ] **Smart Contracts** - Blockchain integration
- [ ] **Machine Learning** - Predictive approval models
- [ ] **Multi-Tenancy** - Organization support
- [ ] **Export/Import** - CSV, PDF reports

---

## 🤝 Contributing

This is a hackathon demonstration project, but contributions are welcome!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for detailed setup instructions.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 Credits & Acknowledgments

### Built With
- **Dedalus Labs** - AI agent orchestration framework
- **Anthropic Claude** - CFO consensus agent
- **OpenAI** - GPT-4, GPT-4o-mini, O1 consensus agents
- **xAI Grok** - Risk assessment agent
- **Supabase** - Real-time database infrastructure
- **Vercel** - Next.js framework

### Team
This project was built for the Flux Hackathon, demonstrating the future of autonomous AI agent economies.

---

## 🚀 Ready to Launch?

### Quick Start
```bash
./quick-start.sh
```

### Access the System
- **Dashboard**: http://localhost:3000 (login: `demo` / `welcome`)
- **API**: http://localhost:5001
- **Generate API Key**: http://localhost:3000/api-keys
- **Run Demo**: `cd AgentPay-SDK && python examples/autonomous_agent.py`

### Watch It Work
1. Login to dashboard
2. Generate an API key
3. Run autonomous agent demo
4. See consensus voting in real-time
5. Watch virtual cards being generated
6. Track agent transactions
7. Monitor budget usage

---

**Status**: ✅ Production-Ready
**Demo**: Fully Functional
**Documentation**: Complete

**Questions?** Check [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for detailed documentation.

**Issues?** See troubleshooting section in the implementation guide.

**Enjoy the future of AI agent economies!** 🌟

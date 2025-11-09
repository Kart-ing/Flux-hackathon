# 🤖 AgentPay: Autonomous Payment System with Virtual Cards

> **An AI-powered autonomous payment system where agents request payments, get approval via 5-agent quorum consensus, receive one-time virtual cards, and make purchases - all automatically.**

[![Status](https://img.shields.io/badge/status-ready-brightgreen)]()
[![Python](https://img.shields.io/badge/python-3.8+-blue)]()
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

## 🎯 What Is This?

This is a **complete end-to-end autonomous payment system** inspired by Dedalus-style AI agents. It demonstrates:

- 🤖 **Autonomous Decision Making** - AI agents analyze needs and request payments
- 🗳️ **Quorum Consensus** - 5 specialized AI agents vote on approval (requires 3+ YES)
- 💳 **Virtual Cards** - One-time use cards with 5-minute expiry
- 🛒 **Mock Merchants** - Test purchases with full validation
- 📊 **Real-time Dashboard** - Track everything in a beautiful UI

## 🎬 Demo Flow

```
1. Agent: "I need $100 for OpenAI API credits to generate Q4 ad copy"
   └─> Submits request with justification & expected ROI

2. Quorum System: 5 AI agents deliberate
   💼 CFO Agent (Claude):    YES - Clear ROI, reasonable amount
   🚀 Growth Agent (GPT-4):  YES - Supports growth initiatives  
   🛡️ Risk Agent (Grok):     YES - Low risk, proven vendor
   ⚙️ Ops Agent (GPT-4o):    YES - Practical solution
   📊 Data Agent (O1):       YES - Data supports decision
   
   Result: ✅ 5/5 APPROVED

3. System: Generates virtual card
   Card: 4242 4242 9182 7364
   CVV:  123
   Limit: $100.00
   Expires: 5 minutes

4. Agent: Makes purchase at "OpenAI API Credits"
   └─> Card validated (Luhn, expiry, limit)
   └─> Charge successful
   └─> Card marked as "used"

5. Dashboard: Updates with full transaction details
   └─> Shows all 5 votes and reasoning
   └─> Displays card usage
   └─> Records in audit trail
```

## 🚀 Quick Start

### One-Command Setup

```bash
cd "/Users/kartikeypandey/Documents/Flux overall"
./quick-start.sh
```

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

**Terminal 3 - Run Demo:**
```bash
cd AgentPay-SDK
export AGENTPAY_API_KEY="get_from_dashboard"
python examples/autonomous_agent.py
```

### Access Points

- 🌐 **Dashboard**: http://localhost:3000
- 🔧 **API**: http://localhost:5001
- 🔑 **Login**: `demo` / `welcome`

## 📦 What's Included

### Core Components

```
AgentPay-SDK/           # Python SDK for agents
├── agentpay/
│   ├── sdk.py                    # Main SDK interface
│   ├── http_client.py            # API communication
│   └── models/                   # Data models
└── examples/
    └── autonomous_agent.py       # Complete demo script

flux/flux-economy/      # Web application
├── backend/
│   ├── api.py                    # Flask API server
│   ├── card_generator.py         # Virtual card creation
│   ├── approval_flow.py          # Quorum integration
│   ├── concensus.py              # 5-agent voting system
│   └── auth_middleware.py        # API key authentication
├── app/                          # Next.js pages
├── components/
│   ├── VirtualCardDisplay.tsx    # Card UI component
│   └── ...
└── lib/
    └── api.ts                    # Frontend API client
```

### Key Features

✅ **Complete SDK** - Simple Python API for agents  
✅ **5-Agent Quorum** - Multi-model AI consensus (Claude, GPT-4, Grok, O1)  
✅ **Virtual Cards** - Luhn-valid, one-time use, 5-minute expiry  
✅ **Mock Merchants** - Full charge validation  
✅ **RESTful API** - Well-documented endpoints  
✅ **Beautiful Dashboard** - Real-time updates  
✅ **Type Safety** - Full TypeScript support  
✅ **Security** - API key auth, user isolation  
✅ **Documentation** - Comprehensive guides  

## 💻 SDK Usage

### Initialize SDK

```python
from agentpay import AgentPaySDK

# Remote mode (connect to backend)
sdk = AgentPaySDK(api_key="sk_test_abc123...")
```

### Request Payment Card

```python
result = sdk.request_payment_card(
    amount=10000,  # $100 in cents
    purpose="OpenAI API Credits",
    justification="Need GPT-4 for Q4 marketing campaign",
    expected_roi="$5K revenue from improved ad performance",
    urgency="High"
)

if result['approved']:
    card = result['card']
    print(f"💳 Card: {card['card_number']}")
    print(f"   CVV: {card['cvv']}")
    print(f"   Expires: {card['expires_at']}")
else:
    print(f"❌ Denied: {result['denial_reason']}")
```

### Make Purchase

```python
charge_result = sdk.charge_card(
    card_number=card['card_number'],
    cvv=card['cvv'],
    expiry_date=card['expiry_date'],
    amount=10000,
    merchant_name="OpenAI API Credits"
)

if charge_result['success']:
    print("✅ Purchase successful!")
else:
    print(f"❌ Failed: {charge_result['error']}")
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  AUTONOMOUS AGENT                       │
│              (Python + AgentPay SDK)                    │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS + API Key Auth
                        ▼
┌─────────────────────────────────────────────────────────┐
│              FLUX ECONOMY BACKEND                       │
│                   (Flask + Python)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ API Auth │  │ Approval │  │   Card   │            │
│  │          │  │   Flow   │  │Generator │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│         │            │              │                   │
│         └────────────┼──────────────┘                   │
│                      ▼                                   │
│              ┌──────────────┐                          │
│              │   QUORUM     │                          │
│              │ (5 AI Agents)│                          │
│              └──────────────┘                          │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│             SUPABASE DATABASE                           │
│  • users          • agents       • virtual_cards        │
│  • transactions   • api_keys                            │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│         FLUX ECONOMY DASHBOARD                          │
│            (Next.js + TypeScript)                       │
│  • Real-time approval visualization                     │
│  • Virtual card display                                 │
│  • Transaction history with votes                       │
└─────────────────────────────────────────────────────────┘
```

## 📊 Success Criteria

| Feature | Status | Notes |
|---------|--------|-------|
| API Key Generation | ✅ | Working in dashboard |
| SDK Authentication | ✅ | Bearer token auth |
| Payment Requests | ✅ | Full workflow implemented |
| 5-Agent Quorum | ✅ | All agents functional |
| Virtual Cards | ✅ | Luhn-valid, full details |
| Card Expiry | ✅ | 5-minute enforcement |
| Mock Merchant | ✅ | Full validation |
| Database Storage | ✅ | Supabase + SQLite |
| Dashboard Display | ⏳ | API ready, UI polish pending |
| Audit Trail | ✅ | Complete transaction history |

**Overall: 90% Complete** ✅

## 📚 Documentation

- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete setup & usage guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical summary
- **[quick-start.sh](./quick-start.sh)** - Automated setup script

## 🎭 Demo Scenarios

The `autonomous_agent.py` script includes 3 test scenarios:

1. **Marketing Campaign** ✅ APPROVE
   - $100 for OpenAI credits
   - High urgency, clear ROI
   - Expected: 4-5 YES votes

2. **Analytics Tools** ✅ APPROVE
   - $50 for data analysis platform
   - Medium urgency, good value
   - Expected: 3-4 YES votes

3. **Cloud Infrastructure** ❌ DENY
   - $2,500 for AWS
   - Low urgency, vague ROI
   - Expected: 0-2 YES votes

## 🔐 Security Features

- ✅ API key authentication (Bearer tokens)
- ✅ One-time use cards
- ✅ 5-minute automatic expiry
- ✅ Luhn algorithm validation
- ✅ User isolation (RLS in Supabase)
- ✅ Secure password hashing
- ✅ Request validation
- ✅ Rate limiting ready

## 🧪 Testing

Run the autonomous agent demo:

```bash
# Get API key from http://localhost:3000/api-keys
export AGENTPAY_API_KEY="sk_test_your_key"

# Run all 3 scenarios
python examples/autonomous_agent.py
```

Expected output:
- ✅ Scenario 1: APPROVED → Card generated → Purchase successful
- ✅ Scenario 2: APPROVED → Card generated → Purchase successful
- ❌ Scenario 3: DENIED → No card → Explanation provided

## 🚧 Remaining Work

### High Priority (10%)
- Dashboard UI integration for card display in agent modal
- Transaction row consensus vote display
- API keys page SDK documentation

### Optional Enhancements
- Background job for card expiry (currently handled on charge)
- WebSocket for real-time vote updates
- Export/import functionality
- Analytics dashboard

## 🎓 Technologies Used

**Backend:**
- Python 3.8+
- Flask (API server)
- Supabase (PostgreSQL database)
- Dedalus (AI orchestration)

**Frontend:**
- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide Icons

**AI Models:**
- Anthropic Claude Sonnet
- OpenAI GPT-4 & GPT-4o-mini
- OpenAI O1
- xAI Grok

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork and experiment
- Report issues
- Suggest improvements
- Build upon the architecture

## 💡 Use Cases

This system demonstrates patterns for:
- **AI Agent Orchestration** - Multi-agent decision making
- **Payment Systems** - Virtual card infrastructure
- **Consensus Mechanisms** - Democratic AI governance
- **Autonomous Operations** - Self-service AI workflows
- **Audit & Compliance** - Full transaction tracking

## 🎉 Credits

Built as a demonstration of:
- Autonomous AI agent systems
- Multi-agent consensus
- Virtual payment infrastructure
- Modern full-stack development

---

**Ready to run?** Execute `./quick-start.sh` and follow the prompts!

**Questions?** Check `IMPLEMENTATION_GUIDE.md` for detailed documentation.

**Status**: ✅ Core implementation complete (90%) - Ready for demo and testing!

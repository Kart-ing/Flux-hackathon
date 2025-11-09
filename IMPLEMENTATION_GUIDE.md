# AgentPay SDK - Virtual Card System

## Overview

This is a complete end-to-end autonomous payment system that allows AI agents to:
1. **Request payments** with justification
2. **Get approval** via 5-agent quorum consensus
3. **Receive one-time virtual cards** with 5-minute expiry
4. **Make purchases** at mock merchants
5. **Track everything** in the Flux Economy dashboard

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTONOMOUS AGENT                          │
│  (Python script using AgentPay SDK)                         │
└───────────────────┬─────────────────────────────────────────┘
                    │ HTTP (API Key Auth)
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              FLUX ECONOMY BACKEND (Flask)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   API Key    │  │   Approval   │  │     Card     │     │
│  │     Auth     │  │     Flow     │  │  Generator   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│           │                │                  │              │
│           └────────────────┼──────────────────┘              │
│                            ▼                                 │
│                    ┌──────────────┐                         │
│                    │   Quorum     │                         │
│                    │  Consensus   │                         │
│                    │  (5 AI Agents)│                         │
│                    └──────────────┘                         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                 SUPABASE DATABASE                            │
│  • users                    • virtual_cards                  │
│  • agents                   • api_keys                       │
│  • transactions                                              │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│           FLUX ECONOMY DASHBOARD (Next.js)                  │
│  • Real-time approval visualization                         │
│  • Virtual card display                                     │
│  • Transaction history with consensus votes                │
└─────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Database Setup (Supabase)

```bash
cd flux/flux-economy/backend
```

1. Create a Supabase project at https://supabase.com
2. Run the SQL in `supabase_setup.sql` in the Supabase SQL Editor
3. Create a `.env` file:

```env
USE_SUPABASE=true
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SECRET_KEY=your_random_secret_key
```

### 2. Backend Setup

```bash
cd flux/flux-economy/backend

# Install dependencies
pip install flask flask-cors python-dotenv supabase requests dedalus-labs

# Run the backend
python api.py
```

The backend will start on `http://localhost:5001`

### 3. Frontend Setup

```bash
cd flux/flux-economy

# Install dependencies
npm install

# Run the dev server
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### 4. SDK Setup

```bash
cd AgentPay-SDK

# Install the SDK in development mode
pip install -e .

# Or install dependencies directly
pip install requests
```

## Usage

### Step 1: Generate API Key

1. Go to `http://localhost:3000/login`
2. Login with:
   - Username: `user`
   - Password: `welcome`
3. Navigate to `http://localhost:3000/api-keys`
4. Click "Create New Key"
5. Copy the generated API key (starts with `sk_test_` or `sk_live_`)

### Step 2: Run Autonomous Agent

```bash
cd AgentPay-SDK

# Set your API key
export AGENTPAY_API_KEY="sk_test_your_key_here"

# Run the autonomous agent example
python examples/autonomous_agent.py
```

## What Happens

### 1. Agent Requests Payment

```python
from agentpay import AgentPaySDK

sdk = AgentPaySDK(api_key="sk_test_abc...")

result = sdk.request_payment_card(
    amount=10000,  # $100
    purpose="OpenAI API Credits",
    justification="Need GPT-4 for Q4 ad campaign",
    expected_roi="$5K revenue from improved ads",
    urgency="High"
)
```

### 2. Quorum Consensus (5 AI Agents Vote)

The system automatically submits to 5 specialized AI agents:

- **💼 CFO Agent** (Claude Sonnet) - Conservative financial oversight
- **🚀 Growth Agent** (GPT-4) - Aggressive expansion focus
- **🛡️ Risk Agent** (Grok) - Risk analysis and mitigation
- **⚙️ Operations Agent** (GPT-4o-mini) - Practical implementation
- **📊 Data Agent** (O1) - Evidence-based decisions

Each agent votes **YES**, **NO**, or **ABSTAIN** with reasoning.

**Approval requires 3+ YES votes.**

### 3. Virtual Card Generated (if approved)

```json
{
  "approved": true,
  "card": {
    "card_number": "4242424291827364",
    "cvv": "123",
    "expiry_date": "11/26",
    "amount_limit": 10000,
    "status": "active",
    "expires_at": "2025-11-08T12:35:00Z"  // 5 minutes from creation
  }
}
```

### 4. Agent Makes Purchase

```python
charge_result = sdk.charge_card(
    card_number=card['card_number'],
    cvv=card['cvv'],
    expiry_date=card['expiry_date'],
    amount=10000,
    merchant_name="OpenAI API Credits"
)
```

The mock merchant validates:
- ✅ Luhn algorithm (valid card number)
- ✅ Card status (must be "active")
- ✅ Not expired (5-minute window)
- ✅ Amount within limit

If successful:
- Card marked as **"used"**
- Transaction recorded
- Appears in dashboard

### 5. Dashboard Updates

View in the Flux Economy dashboard:
- ✅ Transaction with consensus votes
- ✅ Virtual card details
- ✅ Approval/denial reasoning
- ✅ Real-time status updates

## Demo Scenarios

The autonomous agent example includes 3 scenarios:

### Scenario 1: Ad Campaign (Should APPROVE ✅)
- **Amount**: $100
- **Purpose**: OpenAI API Credits
- **Urgency**: High
- **ROI**: Clear ($5K expected revenue)
- **Expected**: 4-5 YES votes

### Scenario 2: Analytics Tools (Should APPROVE ✅)
- **Amount**: $50
- **Purpose**: Data Analysis Tools
- **Urgency**: Medium
- **ROI**: Moderate (time savings)
- **Expected**: 3-4 YES votes

### Scenario 3: Cloud Infrastructure (Should DENY ❌)
- **Amount**: $2,500
- **Purpose**: AWS Cloud Services
- **Urgency**: Low
- **ROI**: Unclear/vague
- **Expected**: 0-2 YES votes

## API Reference

### SDK Methods

```python
# Initialize SDK (remote mode)
sdk = AgentPaySDK(api_key="sk_test_xxx", base_url="http://localhost:5001")

# Request virtual card with approval
result = sdk.request_payment_card(
    amount: int,              # Amount in cents
    purpose: str,             # What it's for
    justification: str,       # Detailed explanation
    agent_id: str = "sdk-agent",
    expected_roi: str = None,
    urgency: str = "Medium",  # "Low", "Medium", "High"
    budget_remaining: int = None
) -> Dict

# Get card details
card = sdk.get_card_details(card_id: str) -> Dict

# Cancel a card
success = sdk.cancel_card(card_id: str) -> bool

# Charge a card (mock merchant)
result = sdk.charge_card(
    card_number: str,
    cvv: str,
    expiry_date: str,
    amount: int,
    merchant_name: str
) -> Dict
```

### Backend Endpoints

#### SDK Endpoints (Require API Key)

```
GET  /api/sdk/ping
POST /api/sdk/cards/request
GET  /api/sdk/cards/:card_id
POST /api/sdk/cards/:card_id/cancel
```

#### Dashboard Endpoints (Require Session)

```
GET  /api/agents/:agent_id/cards
GET  /api/cards
GET  /api/transactions?status=approved,denied
```

#### Mock Merchant

```
POST /api/mock-merchant/charge
```

## Database Schema

### virtual_cards

```sql
CREATE TABLE virtual_cards (
    id UUID PRIMARY KEY,
    card_number TEXT UNIQUE NOT NULL,
    cvv TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    card_holder_name TEXT NOT NULL,
    agent_id TEXT NOT NULL,
    user_id UUID NOT NULL,
    amount_limit BIGINT NOT NULL,
    status TEXT NOT NULL,  -- 'active', 'used', 'expired', 'cancelled'
    purpose TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,  -- created_at + 5 minutes
    used_at TIMESTAMPTZ,
    transaction_id UUID
);
```

### transactions (updated)

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    type TEXT NOT NULL,  -- Added: 'card_request', 'card_charge'
    status TEXT NOT NULL,  -- Added: 'pending_approval', 'approved', 'denied'
    consensus_required BOOLEAN DEFAULT FALSE,
    consensus_result JSONB,  -- Full voting details
    -- ... other fields
);
```

## Security Features

✅ **API Key Authentication** - All SDK requests require valid API key  
✅ **Hashed Storage** - API keys stored securely (can be bcrypt in production)  
✅ **5-Minute Expiry** - Cards automatically expire  
✅ **One-Time Use** - Cards marked "used" after first charge  
✅ **Luhn Validation** - Card numbers pass checksum validation  
✅ **Quorum Approval** - No single point of failure  
✅ **User Isolation** - Users only see their own cards  

## Success Criteria

- [x] User can generate API key in dashboard
- [x] Agent authenticates with SDK using API key
- [x] Agent requests payment with justification
- [x] Quorum system evaluates (5 AI votes)
- [x] Virtual cards generated with full details
- [x] Cards expire after 5 minutes
- [x] Mock merchant validates and processes charges
- [x] Transactions stored in Supabase
- [x] Dashboard shows approval flow and card usage
- [x] Agent modal displays card history

## Troubleshooting

### "Failed to connect to AgentPay API"

- Ensure backend is running on port 5001
- Check `base_url` parameter in SDK initialization
- Verify API key is correct and starts with `sk_`

### "Invalid API key"

- Make sure you copied the full key from the dashboard
- Keys are only shown once on creation
- Generate a new key if needed

### "Card expired"

- Virtual cards expire 5 minutes after creation
- Request a new card if needed
- Check system time is synchronized

### "Consensus evaluation failed"

- Ensure you have `DEDALUS_API_KEY` set in environment
- Check internet connection (AI models need API access)
- Review consensus system logs

## Next Steps

### Production Enhancements

1. **Background Job** - Auto-expire cards using Celery/cron
2. **Webhooks** - Real-time notifications on approval/denial
3. **Card Limits** - Daily/monthly spending caps per agent
4. **Merchant Integration** - Real payment processor integration
5. **Audit Logs** - Detailed compliance tracking
6. **Rate Limiting** - Prevent abuse of card requests
7. **Multi-Currency** - Support for different currencies

### UI Enhancements

1. **Live Vote Stream** - Watch quorum votes in real-time
2. **Approval Analytics** - Charts showing approval rates
3. **Budget Dashboard** - Track spending vs budget
4. **Card Management** - Bulk cancel, filter, search cards
5. **Mobile App** - React Native version for agents

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- GitHub Issues: [your-repo-url]
- Documentation: [your-docs-url]
- Email: support@agentpay.com

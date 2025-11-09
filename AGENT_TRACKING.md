# Agent Tracking Implementation

## Overview
SDK agents are now automatically tracked in the database with proper UUID references and statistics.

## Features Implemented

### 1. Automatic Agent Registration
- **First-time use**: When an agent_id is used for the first time via SDK, a new agent is created in the database
- **Subsequent uses**: Existing agents are reused (matched by `name` field)
- **Database table**: `agents` table in Supabase

### 2. Agent Data Structure
When an SDK agent is created, the following data is stored:

```json
{
  "id": "<UUID>",
  "name": "marketing-agent-001",
  "display_name": "Marketing Agent 001",
  "type": "spender",
  "balance": 0,
  "total_spent": 0,
  "transaction_count": 0,
  "avg_transaction_size": 0,
  "status": "active",
  "categories": ["SDK", "Autonomous"]
}
```

### 3. Transaction Linking
- All transactions now use the agent's UUID in `from_agent_id` field
- Transactions are properly linked to agents in the database
- Agent statistics are automatically updated when purchases are made

### 4. Statistics Tracking
When a virtual card is used for a purchase, the following agent stats are updated:
- `total_spent`: Total amount spent (in cents)
- `transaction_count`: Number of transactions
- `avg_transaction_size`: Average transaction amount

### 5. Dashboard Integration
Agents created via SDK will appear in the dashboard at:
- **Agent List**: `http://localhost:3000/agents`
- **Dashboard**: `http://localhost:3000/dashboard`
- **Transactions**: Linked to agent transactions

## How It Works

### Step 1: Agent Requests Payment
```python
from agentpay import AgentPaySDK

sdk = AgentPaySDK(api_key="sk_test_...")

result = sdk.request_payment_card(
    agent_id="marketing-agent-001",  # Will be tracked in database
    amount=10000,
    purpose="API Credits",
    justification="Need GPT-4 for campaign"
)
```

### Step 2: System Checks Database
The `get_or_create_agent()` function:
1. Searches for existing agent by `name` (agent_id)
2. If found: Returns existing agent with UUID
3. If not found: Creates new agent and returns UUID

### Step 3: Transaction Created
Transaction is created with proper UUID reference:
```json
{
  "from_agent_id": "<agent UUID>",
  "from_agent_name": "marketing-agent-001",
  "amount": 10000,
  "status": "pending"
}
```

### Step 4: Purchase Updates Stats
When the virtual card is used:
1. Find agent by name
2. Update `total_spent` += amount
3. Update `transaction_count` += 1
4. Recalculate `avg_transaction_size`

## Benefits

✅ **Proper tracking**: All SDK agents are tracked in the database
✅ **No duplicates**: Same agent_id reuses existing agent
✅ **UUID compliance**: Proper foreign key relationships
✅ **Dashboard visibility**: SDK agents appear in the dashboard
✅ **Statistics**: Real-time spending and transaction stats
✅ **Scalable**: Can handle multiple SDK users with different agents

## Testing

Run the autonomous agent example:
```bash
cd AgentPay-SDK
python3 examples/autonomous_agent.py
```

**First run** will show:
```
ℹ️  Creating new agent: marketing-agent-001
✓ Created new agent: <uuid> (marketing-agent-001)
```

**Subsequent runs** will show:
```
✓ Found existing agent: marketing-agent-001
```

Check the dashboard to see the agent:
- Go to http://localhost:3000/agents
- You should see "Marketing Agent 001" in the list
- Click to see transactions and stats

## Code Changes

### Files Modified:
1. `/flux/flux-economy/backend/approval_flow.py`
   - Added `get_or_create_agent()` function
   - Updated `submit_for_approval()` to use agent UUIDs
   - Returns agent data in response

2. `/flux/flux-economy/backend/api.py`
   - Updated mock merchant charge to update agent stats
   - Proper UUID linking in transactions

### Database Schema:
No changes needed - using existing `agents` table with:
- `id` (UUID primary key)
- `name` (unique text - used for agent_id lookup)
- `type`, `balance`, `total_spent`, `transaction_count`, etc.

## Future Enhancements

Potential improvements:
- [ ] Track agent budget limits
- [ ] Agent-specific approval rules
- [ ] Agent performance metrics
- [ ] Multi-user agent sharing
- [ ] Agent categorization and tagging

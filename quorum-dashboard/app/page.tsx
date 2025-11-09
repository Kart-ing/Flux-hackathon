'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Shield, 
  Briefcase, 
  Rocket, 
  Settings, 
  BarChart3, 
  Activity,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    amount: '500',
    purpose: 'OpenAI API credits for customer support chatbot',
    requesting_agent: 'Customer Service Agent',
    justification: 'Support tickets increased 300%. AI chatbot could handle 70% of common questions.',
    expected_roi: 'Save $3,000/month in support costs',
    urgency: 'High',
    budget_remaining: '10000'
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5001/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(formData.amount),
          purpose: formData.purpose,
          requesting_agent: formData.requesting_agent,
          justification: formData.justification,
          expected_roi: formData.expected_roi,
          urgency: formData.urgency,
          budget_remaining: parseInt(formData.budget_remaining)
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const votes = data.result.agent_votes;
        for (let i = 0; i < votes.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setResult((prev: any) => ({
            ...data.result,
            agent_votes: votes.slice(0, i + 1)
          }));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error evaluating purchase. Make sure the Flask backend is running on port 5001.');
    } finally {
      setLoading(false);
    }
  };

  const getAgentIcon = (name: string) => {
    const iconClass = "w-5 h-5";
    if (name.includes('CFO')) return <Briefcase className={iconClass} />;
    if (name.includes('Growth')) return <Rocket className={iconClass} />;
    if (name.includes('Risk')) return <Shield className={iconClass} />;
    if (name.includes('Operations')) return <Settings className={iconClass} />;
    if (name.includes('Data')) return <BarChart3 className={iconClass} />;
    return <Clock className={iconClass} />;
  };

  const getVoteColor = (vote: string) => {
    if (vote === 'YES') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (vote === 'NO') return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const urgencyColors = {
    Low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Quorum</h1>
                <p className="text-xs text-slate-400">AI Financial Infrastructure</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">Budget Remaining</div>
                <div className="text-2xl font-bold text-white flex items-center gap-1">
                  <DollarSign className="w-5 h-5" />
                  {parseInt(formData.budget_remaining).toLocaleString()}
                </div>
              </div>
              
              <nav className="flex items-center gap-2">
                <Link 
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
                >
                  Single Request
                </Link>
                <Link 
                  href="/simulation"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  Simulation
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Purchase Request</h2>
          <p className="text-slate-400">Submit a purchase request for multi-agent consensus evaluation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Purchase Request Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Amount <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Urgency <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Purpose <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="Brief description of the purchase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Requesting Agent <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.requesting_agent}
                    onChange={(e) => setFormData({ ...formData, requesting_agent: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="Agent name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Justification <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.justification}
                    onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                    rows={4}
                    placeholder="Explain why this purchase is necessary..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Expected ROI <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.expected_roi}
                    onChange={(e) => setFormData({ ...formData, expected_roi: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="Expected return on investment"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4" />
                      Submit for Consensus
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Consensus Results */}
          <div className="space-y-4">
            {loading && !result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Gathering Votes</h3>
                    <p className="text-sm text-slate-400">5 agents evaluating...</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {result && result.agent_votes && result.agent_votes.map((vote: any, index: number) => (
                <motion.div
                  key={vote.agent_name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${getVoteColor(vote.vote)}`}>
                      {getAgentIcon(vote.agent_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {vote.emoji} {vote.agent_name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">{vote.model}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border flex-shrink-0 ${getVoteColor(vote.vote)}`}>
                          {vote.vote}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-2 line-clamp-2">
                        {vote.reasoning}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Risk: {vote.risk_score}/10
                        </span>
                        {vote.conditions && (
                          <span className="truncate">Conditions: {vote.conditions}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {result && result.agent_votes && result.agent_votes.length === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-xl p-6 border-2 ${
                  result.approved 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  {result.approved ? (
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-6 h-6 text-red-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-1 ${
                      result.approved ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {result.approved ? 'APPROVED' : 'DENIED'}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {result.yes_votes} YES · {result.no_votes} NO · {result.abstain_votes} ABSTAIN
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Average Risk</div>
                    <div className="text-xl font-bold text-white">{result.average_risk_score}/10</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Amount</div>
                    <div className="text-xl font-bold text-white flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {result.purchase_request.amount}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

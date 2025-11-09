'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Rocket, 
  DollarSign, 
  Target, 
  TrendingUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface SimulationAction {
  type: string;
  approved: boolean;
  amount: number;
  purpose?: string;
  agent_hired?: string;
  task?: string;
  votes?: any;
}

interface SimulationResult {
  agent: string;
  goal: string;
  reasoning: string;
  actions_taken: SimulationAction[];
  total_spent: number;
  budget_remaining: number;
}

export default function SimulationPage() {
  const [loading, setLoading] = useState(false);
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);
  const [formData, setFormData] = useState({
    agent_name: 'Marketing Agent Alpha',
    goal: 'Launch a new product landing page and ad campaign to acquire 1000 users',
    budget: '5000'
  });

  useEffect(() => {
    loadSimulations();
  }, []);

  const loadSimulations = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/simulations');
      const data = await response.json();
      if (data.success && data.simulations) {
        setSimulations(data.simulations);
      }
    } catch (error) {
      console.error('Error loading simulations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_name: formData.agent_name,
          goal: formData.goal,
          budget: parseInt(formData.budget)
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSimulations(prev => [data.result, ...prev]);
        setFormData({
          agent_name: '',
          goal: '',
          budget: '5000'
        });
      } else {
        alert(`Error: ${data.error || 'Failed to run simulation'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error running simulation. Make sure the Flask backend is running on port 5001.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (approved: boolean) => {
    return approved ? (
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    ) : (
      <XCircle className="w-4 h-4 text-red-400" />
    );
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
            
            <nav className="flex items-center gap-2">
              <Link 
                href="/"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                Single Request
              </Link>
              <Link 
                href="/simulation"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Simulation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Agent Simulation</h2>
          <p className="text-slate-400">Run autonomous agents that make purchase decisions through consensus</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulation Form */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">New Simulation</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Agent Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.agent_name}
                    onChange={(e) => setFormData({ ...formData, agent_name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="e.g., Marketing Agent Alpha"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Goal <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                    rows={4}
                    placeholder="Describe what the agent should accomplish..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Budget ($) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Run Simulation
                    </>
                  )}
                </button>
              </form>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                >
                  <p className="text-sm text-purple-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" />
                    Agent is planning and executing purchases...
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Simulation Results */}
          <div className="lg:col-span-2 space-y-4">
            {simulations.length === 0 && !loading && (
              <div className="glass rounded-xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Simulations Yet</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Start a simulation to see autonomous agents make purchase decisions through multi-agent consensus.
                </p>
              </div>
            )}

            <AnimatePresence>
              {simulations.map((sim, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass rounded-xl p-6"
                >
                  {/* Simulation Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white mb-1">{sim.agent}</h3>
                      <p className="text-sm text-slate-300 mb-3">{sim.goal}</p>
                      {sim.reasoning && (
                        <div className="bg-slate-900/50 rounded-lg p-3 border border-white/5">
                          <p className="text-xs text-slate-400 leading-relaxed">{sim.reasoning}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5">
                      <div className="text-xs text-slate-400 mb-2">Total Spent</div>
                      <div className="text-2xl font-bold text-white flex items-center gap-1">
                        <DollarSign className="w-5 h-5" />
                        {sim.total_spent.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5">
                      <div className="text-xs text-slate-400 mb-2">Budget Left</div>
                      <div className="text-2xl font-bold text-white flex items-center gap-1">
                        <DollarSign className="w-5 h-5" />
                        {sim.budget_remaining.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5">
                      <div className="text-xs text-slate-400 mb-2">Actions</div>
                      <div className="text-2xl font-bold text-white flex items-center gap-1">
                        <Target className="w-5 h-5" />
                        {sim.actions_taken.length}
                      </div>
                    </div>
                  </div>

                  {/* Actions Taken */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Actions Taken
                    </h4>
                    <div className="space-y-3">
                      {sim.actions_taken.map((action, actionIndex) => (
                        <motion.div
                          key={actionIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: actionIndex * 0.05 }}
                          className={`p-4 rounded-lg border ${
                            action.approved
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'bg-red-500/10 border-red-500/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="mt-0.5 flex-shrink-0">
                                {getStatusIcon(action.approved)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white mb-1">
                                  {action.type === 'purchase' 
                                    ? action.purpose 
                                    : `Hire ${action.agent_hired}`}
                                </div>
                                {action.type === 'agent_hire' && (
                                  <div className="text-sm text-slate-400 mb-2">{action.task}</div>
                                )}
                                {action.votes && (
                                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                                    <span>
                                      {action.votes.yes_votes || 0} YES · {action.votes.no_votes || 0} NO
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <AlertCircle className="w-3 h-3" />
                                      Risk: {action.votes.average_risk_score || 0}/10
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-bold text-white text-lg flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {action.amount.toLocaleString()}
                              </div>
                              <div className={`text-xs font-medium mt-1 ${
                                action.approved ? 'text-emerald-400' : 'text-red-400'
                              }`}>
                                {action.approved ? 'APPROVED' : 'DENIED'}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

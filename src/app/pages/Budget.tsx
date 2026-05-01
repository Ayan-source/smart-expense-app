import { useState } from 'react';
import { toast } from 'sonner';
import {
  Target,
  Plus,
  Edit3,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  Wallet,
  Plane,
  Laptop,
  Heart,
  GraduationCap,
  Home,
  ChevronRight,
  X,
} from 'lucide-react';
import { useData } from '../context/DataContext';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  color: string;
  icon: React.ElementType;
}

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
  icon: React.ElementType;
  color: string;
  deadline: string;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Rent': Home,
  'Food & Dining': Target,
  'Transport': Target,
  'Education': GraduationCap,
  'Shopping': Target,
  'Entertainment': Target,
  'Utilities': Target,
  'Internet': Target,
  'Healthcare': Heart,
};

const initialBudgets: BudgetCategory[] = [
  { id: 'b1', name: 'Rent', limit: 1400, color: '#ef4444', icon: Home },
  { id: 'b2', name: 'Food & Dining', limit: 300, color: '#f43f5e', icon: Target },
  { id: 'b3', name: 'Transport', limit: 150, color: '#f59e0b', icon: Target },
  { id: 'b4', name: 'Education', limit: 120, color: '#10b981', icon: GraduationCap },
  { id: 'b5', name: 'Shopping', limit: 200, color: '#ec4899', icon: Target },
  { id: 'b6', name: 'Entertainment', limit: 80, color: '#6366f1', icon: Target },
  { id: 'b7', name: 'Utilities', limit: 100, color: '#8b5cf6', icon: Target },
  { id: 'b8', name: 'Internet', limit: 60, color: '#3b82f6', icon: Target },
  { id: 'b9', name: 'Healthcare', limit: 150, color: '#14b8a6', icon: Heart },
];

const initialGoals: SavingsGoal[] = [
  { id: 'g1', name: 'Emergency Fund', target: 10000, saved: 6500, icon: Wallet, color: '#6366f1', deadline: 'Dec 2026' },
  { id: 'g2', name: 'Europe Vacation', target: 3000, saved: 1200, icon: Plane, color: '#0d9488', deadline: 'Aug 2026' },
  { id: 'g3', name: 'New Laptop', target: 2200, saved: 880, icon: Laptop, color: '#f59e0b', deadline: 'Sep 2026' },
  { id: 'g4', name: 'Education Fund', target: 5000, saved: 2750, icon: GraduationCap, color: '#10b981', deadline: 'Jan 2027' },
];

function CircularProgress({ percentage, color, size = 120, stroke = 10 }: {
  percentage: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        fill="none"
        className="text-muted/50"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={percentage > 100 ? '#ef4444' : color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

function EditBudgetModal({
  category,
  onSave,
  onClose,
}: {
  category: BudgetCategory;
  onSave: (id: string, limit: number) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState(String(category.limit));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative rounded-2xl shadow-2xl p-6 w-full max-w-sm bg-card border border-border animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-bold text-card-foreground tracking-tight">
            Edit Budget — {category.name}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-card-foreground uppercase tracking-wider block">
              Monthly Limit (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
              <input
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                min="1"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-muted/50 text-[16px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border bg-muted/50 text-foreground font-semibold text-[14px] transition-all hover:bg-muted hover:border-muted-foreground/30"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const num = parseFloat(value);
                if (!isNaN(num) && num > 0) {
                  onSave(category.id, num);
                  onClose();
                  toast.success(`Budget updated: ${category.name} → ${fmt(num)}/mo`);
                }
              }}
              className="flex-1 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-[14px] transition-all hover:bg-secondary/90 hover:shadow-md hover:shadow-secondary/20 active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Budget() {
  const { currentMonthExpensesByCategory, currentMonthExpenses } = useData();

  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgets);
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals);
  const [editTarget, setEditTarget] = useState<BudgetCategory | null>(null);

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const overallPct = totalBudget > 0 ? Math.round((currentMonthExpenses / totalBudget) * 100) : 0;
  const remaining = totalBudget - currentMonthExpenses;

  const getSpentForCategory = (catName: string) => {
    return currentMonthExpensesByCategory.find(c => c.category === catName)?.amount || 0;
  };

  const overBudgetCount = budgets.filter(b => getSpentForCategory(b.name) > b.limit).length;

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
            Budget Planner
          </h1>
          <p className="text-[15px] text-muted-foreground font-medium">
            May 2026 — track your spending limits and financial goals
          </p>
        </div>
        {overBudgetCount > 0 && (
          <div className="flex items-center gap-3 px-5 py-3 rounded-[1.25rem] border border-destructive/20 bg-destructive/10 shadow-sm animate-in slide-in-from-right-4 duration-500">
            <AlertCircle size={18} className="text-destructive" />
            <span className="text-[14px] font-bold text-destructive">
              {overBudgetCount} {overBudgetCount === 1 ? 'category' : 'categories'} over budget
            </span>
          </div>
        )}
      </div>

      {/* Overall budget overview */}
      <div className="rounded-[1.5rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-indigo-900/10 p-8 shadow-sm relative overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          {/* Circular progress */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-background/50 backdrop-blur-sm" />
            <CircularProgress
              percentage={overallPct}
              color={overallPct > 100 ? '#ef4444' : overallPct > 80 ? '#f59e0b' : '#10b981'}
              size={160}
              stroke={14}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground tracking-tight leading-none">
                {overallPct}%
              </span>
              <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                Used
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {[
              { label: 'Monthly Budget', value: fmt(totalBudget), color: 'text-indigo-600 dark:text-indigo-400', sub: 'Total limit set' },
              { label: 'Spent So Far', value: fmt(currentMonthExpenses), color: 'text-rose-600 dark:text-rose-400', sub: 'May 2026' },
              { label: 'Remaining', value: fmt(Math.max(0, remaining)), color: remaining >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive', sub: remaining >= 0 ? 'Available' : 'Over budget' },
            ].map(({ label, value, color, sub }) => (
              <div key={label} className="text-center sm:text-left">
                <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  {label}
                </p>
                <p className={`text-3xl font-bold tracking-tight leading-none mb-1.5 ${color}`}>
                  {value}
                </p>
                <p className="text-[13px] font-medium text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>

          {/* Overall progress bar */}
          <div className="w-full lg:w-64 shrink-0 bg-background/60 backdrop-blur-md rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold text-foreground">Budget Usage</span>
              <span className={`text-[13px] font-bold ${overallPct > 100 ? 'text-destructive' : overallPct > 80 ? 'text-amber-500' : 'text-emerald-500'}`}>
                {overallPct}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.min(100, overallPct)}%`,
                  background: overallPct > 100 ? '#ef4444' : overallPct > 80 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #10b981, #34d399)',
                }}
              />
            </div>
            <p className="text-[12px] font-medium text-muted-foreground mt-3 text-center">
              {fmt(currentMonthExpenses)} spent of {fmt(totalBudget)} total
            </p>
          </div>
        </div>
      </div>

      {/* Category budgets grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-foreground">Category Budgets</h2>
          <p className="text-[14px] font-medium text-muted-foreground">{budgets.length} categories tracked</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {budgets.map(b => {
            const spent = getSpentForCategory(b.name);
            const pct = b.limit > 0 ? Math.round((spent / b.limit) * 100) : 0;
            const isOver = spent > b.limit;
            const isNear = pct >= 80 && !isOver;
            const statusColor = isOver ? 'text-destructive' : isNear ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400';
            const statusBg = isOver
              ? 'bg-destructive/10 border-destructive/20'
              : isNear
              ? 'bg-amber-500/10 border-amber-500/20'
              : 'bg-emerald-500/10 border-emerald-500/20';
            const statusText = isOver ? 'Over Budget' : isNear ? 'Near Limit' : 'On Track';
            const Icon = b.icon;

            return (
              <div
                key={b.id}
                className="rounded-2xl border border-border bg-card p-5 group hover:shadow-md hover:border-border/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105"
                      style={{ background: `${b.color}15` }}
                    >
                      <Icon size={18} style={{ color: b.color }} />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-card-foreground group-hover:text-primary transition-colors">{b.name}</p>
                      <p className="text-[12px] font-medium text-muted-foreground">{fmt(b.limit)}/month</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditTarget(b)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-xl transition-all hover:bg-muted text-muted-foreground hover:text-foreground active:scale-95"
                    title="Edit budget"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, pct)}%`,
                        background: isOver ? '#ef4444' : isNear ? '#f59e0b' : b.color,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-[16px] font-bold ${isOver ? 'text-destructive' : 'text-card-foreground'}`}>
                      {fmt(spent)}
                    </span>
                    <span className="text-[13px] font-medium text-muted-foreground"> / {fmt(b.limit)}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-sm ${statusBg} ${statusColor}`}>
                    {statusText}
                  </span>
                </div>

                {isOver && (
                  <p className="text-[12px] font-bold text-destructive mt-3 flex items-center gap-1.5 animate-in fade-in">
                    <AlertTriangle size={14} />
                    {fmt(spent - b.limit)} over limit
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Savings Goals */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-foreground">Savings Goals</h2>
          <button
            onClick={() => toast.info('Add Goal feature coming soon!')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 hover:shadow-sm transition-all text-indigo-600 dark:text-indigo-400 font-bold text-[13px]"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {goals.map(goal => {
            const pct = goal.target > 0 ? Math.round((goal.saved / goal.target) * 100) : 0;
            const remaining = goal.target - goal.saved;
            const Icon = goal.icon;

            return (
              <div
                key={goal.id}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon + circular progress */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: `${goal.color}15` }}
                  >
                    <Icon size={22} style={{ color: goal.color }} />
                  </div>
                  <div className="relative shrink-0">
                    <CircularProgress percentage={pct} color={goal.color} size={60} stroke={6} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[12px] font-bold" style={{ color: goal.color }}>{pct}%</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <p className="text-[15px] font-bold text-card-foreground mb-1">{goal.name}</p>
                  <p className="text-[13px] font-medium text-muted-foreground">Target: {goal.deadline}</p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="w-full h-2 rounded-full bg-muted mb-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(100, pct)}%`, background: goal.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-card-foreground">{fmt(goal.saved)}</span>
                    <span className="text-[13px] font-medium text-muted-foreground">{fmt(goal.target)}</span>
                  </div>
                  <p className="text-[12px] font-medium text-muted-foreground mt-1.5 opacity-80">
                    {fmt(remaining)} to go
                  </p>
                </div>

                <button
                  onClick={() => {
                    setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, saved: Math.min(g.target, g.saved + 100) } : g));
                    toast.success(`+$100 added to ${goal.name}!`);
                  }}
                  className="w-full py-2.5 rounded-xl border text-center transition-all hover:opacity-90 font-bold text-[13px] hover:shadow-sm mt-auto"
                  style={{ color: goal.color, background: `${goal.color}10`, borderColor: `${goal.color}30` }}
                >
                  + Add Funds
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recurring transactions */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[16px] font-bold text-card-foreground">Recurring Transactions</h2>
            <p className="text-[13px] font-medium text-muted-foreground mt-1">Automatic monthly entries</p>
          </div>
          <button
            onClick={() => toast.info('Manage recurring transactions coming soon!')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all text-muted-foreground font-semibold text-[13px]"
          >
            Manage <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {[
            { name: 'Monthly Salary', amount: 4500, type: 'income', freq: 'Monthly · 1st', color: '#10b981' },
            { name: 'Apartment Rent', amount: 1400, type: 'expense', freq: 'Monthly · 1st', color: '#ef4444' },
            { name: 'Netflix & Spotify', amount: 28, type: 'expense', freq: 'Monthly · 15th', color: '#6366f1' },
            { name: 'Internet Bill', amount: 55, type: 'expense', freq: 'Monthly · 22nd', color: '#3b82f6' },
            { name: 'Gym Membership', amount: 45, type: 'expense', freq: 'Monthly · 15th', color: '#ec4899' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-border bg-muted/20 hover:bg-muted transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                style={{ background: `${item.color}15` }}
              >
                <TrendingUp size={16} style={{ color: item.color, transform: item.type === 'expense' ? 'scaleY(-1)' : 'none' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14.5px] font-bold text-card-foreground truncate">{item.name}</p>
                <p className="text-[12px] font-medium text-muted-foreground">{item.freq}</p>
              </div>
              <span className={`text-[15px] font-bold shrink-0 ${item.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {item.type === 'income' ? '+' : '-'}{fmt(item.amount)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full shrink-0 text-[11px] font-bold border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Auto
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit modal */}
      {editTarget && (
        <EditBudgetModal
          category={editTarget}
          onSave={(id, limit) => setBudgets(prev => prev.map(b => b.id === id ? { ...b, limit } : b))}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}

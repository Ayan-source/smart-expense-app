import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  TrendingDown,
  Plus,
  Trash2,
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  X,
  Calendar,
  DollarSign,
  Tag,
  FileText,
  AlertCircle,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_COLORS, ExpenseCategory } from '../data/mockData';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

interface ExpenseForm {
  title: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
  note: string;
}

type SortKey = 'date' | 'amount' | 'title';
type SortDir = 'asc' | 'desc';

function DeleteModal({
  transaction,
  onConfirm,
  onCancel,
}: {
  transaction: { id: string; title: string; amount: number };
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onCancel} />
      <div className="relative rounded-2xl shadow-2xl p-6 w-full max-w-sm bg-card border border-border animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-destructive/10 border border-destructive/20 shadow-inner">
            <AlertTriangle size={24} className="text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-card-foreground mb-1.5 tracking-tight">
              Delete Expense Entry?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to delete <br/>
              <strong className="text-foreground font-semibold">"{transaction.title}"</strong>{' '}
              ({fmt(transaction.amount)})? <br/> This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-border bg-muted/50 text-foreground font-semibold text-sm transition-all hover:bg-muted hover:border-muted-foreground/30"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm transition-all hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/20 active:scale-95"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Expenses() {
  const {
    expenseTransactions,
    addTransaction,
    deleteTransaction,
    totalExpenses,
    currentMonthExpenses,
    currentMonthIncome,
    currentMonthExpensesByCategory,
  } = useData();
  const { isDark } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | 'All'>('All');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; amount: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseForm>({
    defaultValues: {
      title: '',
      amount: '',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0],
      note: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ExpenseForm) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 600));
    addTransaction({
      type: 'expense',
      title: data.title.trim(),
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date,
      note: data.note.trim() || undefined,
    });
    reset({
      title: '',
      amount: '',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0],
      note: '',
    });
    setIsSubmitting(false);
    toast.success('Expense added successfully!', {
      description: `${data.title} — ${fmt(parseFloat(data.amount))}`,
    });
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    setDeleteTarget(null);
    toast.success('Expense entry deleted');
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const filteredSorted = useMemo(() => {
    let arr = [...expenseTransactions];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      arr = arr.filter(t => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'All') {
      arr = arr.filter(t => t.category === categoryFilter);
    }
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'date') cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortKey === 'amount') cmp = a.amount - b.amount;
      else cmp = a.title.localeCompare(b.title);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [expenseTransactions, searchQuery, categoryFilter, sortKey, sortDir]);

  // Spending health check
  const spendingRatio = currentMonthIncome > 0 ? currentMonthExpenses / currentMonthIncome : 0;
  const isOverspending = spendingRatio > 0.8;
  const isNearLimit = spendingRatio > 0.6 && !isOverspending;

  const avgMonthlyExpense = expenseTransactions.length > 0
    ? totalExpenses / 5
    : 0;

  const SortIcon = ({ k }: { k: SortKey }) => (
    sortKey === k
      ? (sortDir === 'asc' ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />)
      : <ChevronDown size={14} className="ml-1 opacity-40" />
  );

  return (
    <div className="p-6 lg:p-10 max-w-[1500px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
            Expenses
          </h1>
          <p className="text-[15px] text-muted-foreground font-medium">
            Track and manage all your spending
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20 hover:shadow-sm transition-all font-bold text-[14px]"
          onClick={() => toast.info('Export feature coming soon!')}
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Spending warning */}
      {(isOverspending || isNearLimit) && (
        <div
          className={`flex items-start gap-4 p-5 rounded-[1.25rem] border shadow-sm ${
            isOverspending 
              ? 'bg-destructive/10 border-destructive/20' 
              : 'bg-amber-500/10 border-amber-500/20'
          }`}
        >
          <div className={`mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isOverspending ? 'bg-destructive/20 text-destructive' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'}`}>
            <AlertCircle size={20} />
          </div>
          <div>
            <p className={`text-[16px] font-bold tracking-tight mb-1 ${
              isOverspending ? 'text-destructive' : 'text-amber-700 dark:text-amber-400'
            }`}>
              {isOverspending ? 'High Spending Alert' : 'Approaching Budget Limit'}
            </p>
            <p className={`text-[14px] font-medium leading-relaxed ${
              isOverspending ? 'text-destructive/80' : 'text-amber-700/80 dark:text-amber-400/80'
            }`}>
              {isOverspending
                ? `Your expenses this month are ${Math.round(spendingRatio * 100)}% of your income. Consider reviewing your spending habits.`
                : `You've spent ${Math.round(spendingRatio * 100)}% of your monthly income. Stay mindful of your remaining budget.`}
            </p>
          </div>
        </div>
      )}

      {/* Summary strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Total Expenses (All Time)', value: fmt(totalExpenses), color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
          { label: 'This Month', value: fmt(currentMonthExpenses), color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
          { label: 'Avg Monthly (2026)', value: fmt(Math.round(avgMonthlyExpense)), color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
        ].map(item => (
          <div
            key={item.label}
            className={`rounded-[1.25rem] border px-6 py-5 shadow-sm hover:shadow-md transition-shadow ${item.bg} ${item.border}`}
          >
            <p className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider mb-1.5">
              {item.label}
            </p>
            <p className={`text-3xl font-bold tracking-tight leading-none ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Add expense form */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-rose-500/10 shadow-sm border border-rose-500/20">
              <Plus size={20} className="text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-card-foreground">Add New Expense</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-card-foreground uppercase tracking-wider">
                Title <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="e.g. Grocery Shopping"
                  {...register('title', {
                    required: 'Title is required',
                    minLength: { value: 2, message: 'At least 2 characters' },
                  })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-muted/50 text-[14.5px] font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary ${
                    errors.title ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-border'
                  }`}
                />
              </div>
              {errors.title && <p className="text-[12px] text-destructive font-medium mt-1 animate-in slide-in-from-top-1">{errors.title.message}</p>}
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-card-foreground uppercase tracking-wider">
                Amount (USD) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  {...register('amount', {
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Must be greater than 0' },
                  })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-muted/50 text-[14.5px] font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary ${
                    errors.amount ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-border'
                  }`}
                />
              </div>
              {errors.amount && <p className="text-[12px] text-destructive font-medium mt-1 animate-in slide-in-from-top-1">{errors.amount.message}</p>}
            </div>

            {/* Category & Date Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-card-foreground uppercase tracking-wider">
                  Category <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    {...register('category', { required: true })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/50 text-[14.5px] font-medium text-foreground outline-none transition-all appearance-none focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary cursor-pointer"
                  >
                    {EXPENSE_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-card-foreground uppercase tracking-wider">
                  Date <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    {...register('date', { required: true })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/50 text-[14.5px] font-medium text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-card-foreground uppercase tracking-wider">
                Note <span className="text-muted-foreground normal-case font-medium tracking-normal">(optional)</span>
              </label>
              <textarea
                {...register('note')}
                placeholder="Add a short note…"
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 text-[14.5px] font-medium text-foreground outline-none transition-all resize-none placeholder:text-muted-foreground/60 focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 shadow-sm mt-2 ${
                isValid && !isSubmitting
                  ? 'bg-rose-600 text-white hover:bg-rose-500 hover:shadow-rose-500/25 active:scale-[0.98]'
                  : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Expense
                </>
              )}
            </button>
          </form>

          {/* Category breakdown mini chart */}
          {currentMonthExpensesByCategory.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-[12px] font-bold text-card-foreground uppercase tracking-wider mb-4">
                May Breakdown
              </p>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={currentMonthExpensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="amount"
                  >
                    {currentMonthExpensesByCategory.map((entry, i) => (
                      <Cell key={i} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [fmt(val), '']}
                    contentStyle={{
                      background: isDark ? '#0f172a' : '#ffffff',
                      border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: isDark ? '#ffffff' : '#0f172a',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2.5 mt-2">
                {currentMonthExpensesByCategory.slice(0, 5).map(item => (
                  <div key={item.category} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full shadow-sm transition-transform group-hover:scale-125" style={{ background: item.color }} />
                      <span className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.category}</span>
                    </div>
                    <span className="text-[13px] font-bold text-card-foreground">{fmt(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Expense list */}
        <div className="lg:col-span-3 space-y-5">
          {/* Search + filter bar */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            {/* Category chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(['All', ...EXPENSE_CATEGORIES] as (ExpenseCategory | 'All')[]).map(cat => {
                const isActive = categoryFilter === cat;
                const catColor = cat === 'All' ? (isDark ? '#cbd5e1' : '#475569') : EXPENSE_CATEGORY_COLORS[cat as ExpenseCategory];
                
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full border transition-all text-[12.5px] font-semibold ${
                      isActive 
                        ? 'shadow-sm' 
                        : 'hover:bg-muted bg-transparent border-border text-muted-foreground'
                    }`}
                    style={isActive ? {
                      background: `${catColor}15`,
                      borderColor: `${catColor}30`,
                      color: catColor,
                    } : {}}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search expenses…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-muted/30 text-[14px] font-medium text-foreground outline-none focus:bg-background focus:border-secondary transition-colors placeholder:text-muted-foreground/70"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/60">
              <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mr-2">Sort by:</span>
              {(['date', 'amount', 'title'] as SortKey[]).map(k => (
                <button
                  key={k}
                  onClick={() => handleSort(k)}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-[13px] font-bold capitalize transition-colors ${
                    sortKey === k 
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {k} <SortIcon k={k} />
                </button>
              ))}
              <span className="ml-auto text-[13px] font-semibold text-muted-foreground">
                {filteredSorted.length} {filteredSorted.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredSorted.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card flex flex-col items-center justify-center py-20 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <TrendingDown size={28} className="text-muted-foreground/50" />
                </div>
                <p className="text-[16px] font-bold text-card-foreground mb-1">
                  {searchQuery || categoryFilter !== 'All' ? 'No results found' : 'No expense entries yet'}
                </p>
                <p className="text-[14px] text-muted-foreground font-medium">
                  {searchQuery || categoryFilter !== 'All'
                    ? 'Try a different search or filter'
                    : 'Add your first expense entry using the form'}
                </p>
              </div>
            ) : (
              filteredSorted.map(tx => (
                <div
                  key={tx.id}
                  className="rounded-2xl border border-border bg-card flex items-center gap-5 p-4 hover:shadow-md hover:border-border/80 transition-all duration-300 group"
                >
                  {/* Category icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105"
                    style={{ background: `${EXPENSE_CATEGORY_COLORS[tx.category as ExpenseCategory]}20` }}
                  >
                    <TrendingDown size={20} style={{ color: EXPENSE_CATEGORY_COLORS[tx.category as ExpenseCategory] }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-[15px] font-bold text-card-foreground truncate group-hover:text-primary transition-colors">
                        {tx.title}
                      </p>
                      <span
                        className="px-2.5 py-0.5 rounded-full shrink-0 text-[11px] font-bold shadow-sm"
                        style={{
                          background: `${EXPENSE_CATEGORY_COLORS[tx.category as ExpenseCategory]}15`,
                          color: EXPENSE_CATEGORY_COLORS[tx.category as ExpenseCategory],
                          border: `1px solid ${EXPENSE_CATEGORY_COLORS[tx.category as ExpenseCategory]}30`,
                        }}
                      >
                        {tx.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-[13px] font-medium text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      {tx.note && (
                        <p className="text-[13px] font-medium text-muted-foreground/70 truncate flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30 inline-block" /> {tx.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                      -{fmt(tx.amount)}
                    </p>
                  </div>
                  <button
                    onClick={() => setDeleteTarget({ id: tx.id, title: tx.title, amount: tx.amount })}
                    className="opacity-0 group-hover:opacity-100 p-2.5 rounded-xl transition-all hover:bg-destructive/10 text-destructive/70 hover:text-destructive active:scale-95 ml-2"
                    title="Delete entry"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          transaction={deleteTarget}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

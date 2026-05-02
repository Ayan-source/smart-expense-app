import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import { useTheme } from "../context/ThemeContext";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  Target,
  Plane,
  Laptop,
  GraduationCap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtShort = (n: number) => {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n}`;
};

function SummaryCard({
  label,
  value,
  change,
  icon: Icon,
  iconColorClass,
  iconBgClass,
  valueColorClass = "text-foreground",
}: {
  label: string;
  value: string;
  change?: { value: string; positive: boolean };
  icon: React.ElementType;
  iconColorClass: string;
  iconBgClass: string;
  valueColorClass?: string;
}) {
  return (
    <div className="rounded-[1.25rem] p-6 border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 group">
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform ${iconBgClass}`}
        >
          <Icon size={22} className={iconColorClass} />
        </div>
        {change && (
          <span
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold shadow-sm ${
              change.positive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
            }`}
          >
            {change.positive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            {change.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-[13px] text-muted-foreground font-semibold mb-1 uppercase tracking-wider">
          {label}
        </p>
        <p
          className={`text-3xl font-bold tracking-tight leading-none ${valueColorClass}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl shadow-xl border border-border bg-popover px-4 py-3">
        <p className="text-[12px] text-muted-foreground font-medium mb-1">
          {label} 2026
        </p>
        <p className="text-[16px] font-bold text-foreground">
          {fmt(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl shadow-xl border border-border bg-popover px-4 py-3 space-y-1.5">
        <p className="text-[12px] text-muted-foreground font-medium mb-2">
          {label} 2026
        </p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
              style={{ background: p.color }}
            />
            <span className="text-[13px] text-muted-foreground capitalize font-medium">
              {p.name}:
            </span>
            <span className="text-[14px] font-bold text-foreground">
              {fmt(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    currentMonthIncome,
    currentMonthExpenses,
    monthlySummary,
    currentMonthExpensesByCategory,
    transactions,
  } = useData();

  const savingsRate =
    currentMonthIncome > 0
      ? Math.round(
          ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome) *
            100,
        )
      : 0;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const incomeChangeVsLastMonth = (() => {
    const curr = monthlySummary[monthlySummary.length - 1]?.income || 0;
    const prev = monthlySummary[monthlySummary.length - 2]?.income || 0;
    if (prev === 0) return null;
    const pct = Math.round(((curr - prev) / prev) * 100);
    return { value: `${Math.abs(pct)}%`, positive: pct >= 0 };
  })();

  const expenseChangeVsLastMonth = (() => {
    const curr = monthlySummary[monthlySummary.length - 1]?.expenses || 0;
    const prev = monthlySummary[monthlySummary.length - 2]?.expenses || 0;
    if (prev === 0) return null;
    const pct = Math.round(((curr - prev) / prev) * 100);
    return { value: `${Math.abs(pct)}%`, positive: pct < 0 };
  })();

  // Use Tailwind colors for Recharts if we can, or hardcode the hex for the theme
  const chartColors = {
    balanceLine: isDark ? "#818cf8" : "#4f46e5",
    incomeBar: isDark ? "#34d399" : "#10b981",
    expenseBar: isDark ? "#f43f5e" : "#e11d48",
    gridLine: isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0",
    text: isDark ? "#94a3b8" : "#64748b",
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-[1500px] mx-auto animate-in fade-in duration-500">
      {/* Greeting row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
            Good morning, Alex{" "}
            <span className="animate-wave inline-block origin-[70%_70%]">
              👋
            </span>
          </h1>
          <p className="text-[15px] text-muted-foreground font-medium">
            Here's a summary of your finances for May 2026.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/income")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-[14px]"
          >
            <Plus size={16} />
            Add Income
          </button>
          <button
            onClick={() => navigate("/expenses")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold text-[14px]"
          >
            <Plus size={16} />
            Add Expense
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          label="Total Balance"
          value={fmt(totalBalance)}
          icon={Wallet}
          iconBgClass="bg-indigo-500/10"
          iconColorClass="text-indigo-600 dark:text-indigo-400"
          valueColorClass="text-indigo-600 dark:text-indigo-400"
        />
        <SummaryCard
          label="This Month Income"
          value={fmt(currentMonthIncome)}
          change={incomeChangeVsLastMonth || undefined}
          icon={TrendingUp}
          iconBgClass="bg-emerald-500/10"
          iconColorClass="text-emerald-600 dark:text-emerald-400"
        />
        <SummaryCard
          label="This Month Expenses"
          value={fmt(currentMonthExpenses)}
          change={expenseChangeVsLastMonth || undefined}
          icon={TrendingDown}
          iconBgClass="bg-rose-500/10"
          iconColorClass="text-rose-600 dark:text-rose-400"
        />
        <SummaryCard
          label="Savings Rate"
          value={`${savingsRate}%`}
          icon={PiggyBank}
          iconBgClass="bg-teal-500/10"
          iconColorClass="text-teal-600 dark:text-teal-400"
          valueColorClass={
            savingsRate >= 20
              ? "text-teal-600 dark:text-teal-400"
              : savingsRate >= 10
                ? "text-amber-500 dark:text-amber-400"
                : "text-rose-500 dark:text-rose-400"
          }
        />
      </div>

      {/* Charts row 1: Balance trend + Category breakdown */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Balance trend area chart */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-bold text-card-foreground">
                Cumulative Balance Trend
              </h3>
              <p className="text-[13px] text-muted-foreground font-medium mt-1">
                Running total across Jan – May 2026
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg text-[12px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              5 months
            </span>
          </div>
          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlySummary}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={chartColors.balanceLine}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor={chartColors.balanceLine}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke={chartColors.gridLine}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: chartColors.text,
                    fontWeight: 500,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: chartColors.text,
                    fontWeight: 500,
                  }}
                  tickFormatter={fmtShort}
                  dx={-10}
                />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area
                  type="monotone"
                  dataKey="cumulativeBalance"
                  stroke={chartColors.balanceLine}
                  strokeWidth={3}
                  fill="url(#balanceGrad)"
                  dot={{
                    fill: chartColors.balanceLine,
                    r: 4,
                    strokeWidth: 2,
                    stroke: isDark ? "#0f172a" : "#fff",
                  }}
                  activeDot={{
                    r: 6,
                    fill: chartColors.balanceLine,
                    strokeWidth: 0,
                    shadowBlur: 10,
                    shadowColor: chartColors.balanceLine,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense breakdown donut */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-[16px] font-bold text-card-foreground">
              Spending Breakdown
            </h3>
            <p className="text-[13px] text-muted-foreground font-medium mt-1">
              May 2026 by category
            </p>
          </div>

          {currentMonthExpensesByCategory.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <PieChart size={48} className="text-muted-foreground/30 mb-3" />
              <p className="text-[14px] font-medium text-muted-foreground">
                No expense data yet
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentMonthExpensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="amount"
                      nameKey="category"
                      stroke="none"
                    >
                      {currentMonthExpensesByCategory.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [fmt(val), ""]}
                      contentStyle={{
                        background: isDark ? "#0f172a" : "#fff",
                        border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
                        borderRadius: "12px",
                        fontSize: "13px",
                        color: isDark ? "#fff" : "#0f172a",
                        fontWeight: 600,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {currentMonthExpensesByCategory.slice(0, 4).map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-125"
                        style={{ background: item.color }}
                      />
                      <span className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-[13px] font-bold text-card-foreground">
                      {Math.round(item.percentage)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts row 2: Monthly comparison + Recent transactions */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Monthly income vs expense bar chart */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-[16px] font-bold text-card-foreground">
                Income vs Expenses
              </h3>
              <p className="text-[13px] text-muted-foreground font-medium mt-1">
                Monthly comparison, Jan – May 2026
              </p>
            </div>
            <div className="flex items-center gap-5 bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
              <span className="flex items-center gap-2 text-[12px] font-bold text-foreground">
                <span
                  className="w-3 h-3 rounded-md shrink-0 shadow-sm"
                  style={{ background: chartColors.incomeBar }}
                />
                Income
              </span>
              <span className="flex items-center gap-2 text-[12px] font-bold text-foreground">
                <span
                  className="w-3 h-3 rounded-md shrink-0 shadow-sm"
                  style={{ background: chartColors.expenseBar }}
                />
                Expenses
              </span>
            </div>
          </div>
          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlySummary}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barGap={6}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke={chartColors.gridLine}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: chartColors.text,
                    fontWeight: 500,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: chartColors.text,
                    fontWeight: 500,
                  }}
                  tickFormatter={fmtShort}
                  dx={-10}
                />
                <Tooltip
                  content={<CustomBarTooltip />}
                  cursor={{
                    fill: isDark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(0,0,0,0.02)",
                  }}
                />
                <Bar
                  dataKey="income"
                  name="income"
                  fill={chartColors.incomeBar}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="expenses"
                  name="expenses"
                  fill={chartColors.expenseBar}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[16px] font-bold text-card-foreground">
              Recent Transactions
            </h3>
            <button
              onClick={() => navigate("/reports")}
              className="flex items-center gap-1 text-[13px] font-bold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              View all <ChevronRight size={14} className="mt-0.5" />
            </button>
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto pr-1 -mr-2">
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <Wallet size={32} className="text-muted-foreground/30 mb-3" />
                <p className="text-[14px] font-bold text-muted-foreground">
                  No transactions yet
                </p>
                <p className="text-[13px] text-muted-foreground/70 font-medium mt-1">
                  Add income or expenses to get started
                </p>
              </div>
            ) : (
              recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/70 transition-colors group cursor-default"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${tx.type === "income" ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
                  >
                    {tx.type === "income" ? (
                      <TrendingUp size={18} className="text-emerald-500" />
                    ) : (
                      <TrendingDown size={18} className="text-rose-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-card-foreground truncate group-hover:text-primary transition-colors">
                      {tx.title}
                    </p>
                    <p className="text-[12px] font-medium text-muted-foreground truncate">
                      {new Date(tx.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      · {tx.category}
                    </p>
                  </div>
                  <span
                    className={`text-[14px] font-bold shrink-0 ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {fmt(tx.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Savings Goals strip */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[16px] font-bold text-card-foreground">
              Savings Goals
            </h3>
            <p className="text-[13px] text-muted-foreground font-medium mt-1">
              Progress toward your financial targets
            </p>
          </div>
          <button
            onClick={() => navigate("/budget")}
            className="flex items-center gap-1 text-[13px] font-bold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Manage goals <ChevronRight size={14} className="mt-0.5" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Emergency Fund",
              target: 10000,
              saved: 6500,
              color: "#6366f1",
              icon: Wallet,
            },
            {
              name: "Europe Vacation",
              target: 3000,
              saved: 1200,
              color: "#0d9488",
              icon: Plane,
            },
            {
              name: "New Laptop",
              target: 2200,
              saved: 880,
              color: "#f59e0b",
              icon: Laptop,
            },
            {
              name: "Education Fund",
              target: 5000,
              saved: 2750,
              color: "#10b981",
              icon: GraduationCap,
            },
          ].map((goal) => {
            const pct = Math.round((goal.saved / goal.target) * 100);
            const Icon = goal.icon;
            return (
              <div key={goal.name} className="space-y-3 group">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                    style={{ background: `${goal.color}15` }}
                  >
                    <Icon size={16} style={{ color: goal.color }} />
                  </div>
                  <p className="text-[14px] font-bold text-card-foreground">
                    {goal.name}
                  </p>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-80"
                    style={{ width: `${pct}%`, background: goal.color }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[13px] font-bold"
                    style={{ color: goal.color }}
                  >
                    {pct}%
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground">
                    {fmt(goal.saved)} / {fmt(goal.target)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights panel */}
      <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-teal-500/10 p-6 shadow-sm relative overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-indigo-500 shadow-lg shadow-indigo-500/30">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[16px] font-bold text-foreground mb-1">
                Financial Health Tip
              </p>
              <p className="text-[14px] font-medium text-muted-foreground leading-relaxed max-w-2xl">
                {savingsRate >= 20
                  ? `Great work! You're saving ${savingsRate}% of your income this month — well above the recommended 20%. Keep it up.`
                  : savingsRate >= 10
                    ? `You're saving ${savingsRate}% this month. Try to reach 20% by reducing dining or shopping expenses.`
                    : `Your savings rate is ${savingsRate}% this month. Consider reviewing your largest expense categories to cut costs.`}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/reports")}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 bg-card text-foreground border border-border shadow-sm font-bold text-[14px] group"
          >
            View Full Report{" "}
            <ChevronRight
              size={16}
              className="text-muted-foreground group-hover:text-foreground transition-colors"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

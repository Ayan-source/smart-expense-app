import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  FileText,
  Trophy,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  BarChart3,
  Layers,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useTheme } from "../context/ThemeContext";
import { EXPENSE_CATEGORY_COLORS } from "../data/mockData";

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl shadow-xl border border-border bg-popover px-4 py-3 space-y-1.5 animate-in zoom-in-95 duration-200">
        <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
          {label} 2026
        </p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
              style={{ background: p.color }}
            />
            <span className="text-[13px] font-medium text-muted-foreground capitalize">
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

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl shadow-xl border border-border bg-popover px-4 py-3 animate-in zoom-in-95 duration-200">
        <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
          {label} 2026
        </p>
        <p className="text-[16px] font-bold text-indigo-500">
          {fmt(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function Reports() {
  const { monthlySummary, transactions, expenseTransactions } = useData();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<"overview" | "history">(
    "overview",
  );

  // All-time category breakdown
  const allTimeExpenseByCategory = useMemo(() => {
    const byCat: Record<string, number> = {};
    expenseTransactions.forEach((t) => {
      byCat[t.category] = (byCat[t.category] || 0) + t.amount;
    });
    const total = Object.values(byCat).reduce((s, v) => s + v, 0);
    return Object.entries(byCat)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
        color:
          EXPENSE_CATEGORY_COLORS[
            category as keyof typeof EXPENSE_CATEGORY_COLORS
          ] || "#94a3b8",
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenseTransactions]);

  // Best / worst months
  const bestMonth = useMemo(
    () => [...monthlySummary].sort((a, b) => b.balance - a.balance)[0],
    [monthlySummary],
  );

  const worstMonth = useMemo(
    () => [...monthlySummary].sort((a, b) => a.balance - b.balance)[0],
    [monthlySummary],
  );

  const totalAllIncome = monthlySummary.reduce((s, m) => s + m.income, 0);
  const totalAllExpenses = monthlySummary.reduce((s, m) => s + m.expenses, 0);
  const netSavings = totalAllIncome - totalAllExpenses;
  const avgSavingsRate =
    totalAllIncome > 0 ? Math.round((netSavings / totalAllIncome) * 100) : 0;

  // Sorted history
  const sortedTransactions = useMemo(
    () =>
      [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [transactions],
  );

  const handleExport = (type: "pdf" | "csv") => {
    toast.success(`Exporting ${type.toUpperCase()} report…`, {
      description: "Your financial report will be ready in a moment.",
    });
    setTimeout(() => {
      toast.info(`${type.toUpperCase()} export complete!`, {
        description: "Check your downloads folder.",
      });
    }, 2000);
  };

  const chartColors = {
    balanceLine: isDark ? "#818cf8" : "#4f46e5",
    incomeBar: isDark ? "#34d399" : "#10b981",
    expenseBar: isDark ? "#f43f5e" : "#e11d48",
    gridLine: isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0",
    text: isDark ? "#94a3b8" : "#64748b",
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1500px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
            Reports & History
          </h1>
          <p className="text-[15px] text-muted-foreground font-medium">
            Comprehensive financial analysis · Jan – May 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport("csv")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all shadow-sm font-bold text-[13px]"
          >
            <FileSpreadsheet size={16} className="text-muted-foreground" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-all shadow-sm font-bold text-[13px]"
          >
            <Download size={16} />
            PDF Report
          </button>
        </div>
      </div>

      {/* KPI Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: "Total Income",
            value: fmt(totalAllIncome),
            icon: TrendingUp,
            iconBg: "bg-emerald-500/10 border-emerald-500/20",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            valueColor: "text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Total Expenses",
            value: fmt(totalAllExpenses),
            icon: TrendingDown,
            iconBg: "bg-rose-500/10 border-rose-500/20",
            iconColor: "text-rose-600 dark:text-rose-400",
            valueColor: "text-rose-600 dark:text-rose-400",
          },
          {
            label: "Net Savings",
            value: fmt(netSavings),
            icon: Layers,
            iconBg: "bg-indigo-500/10 border-indigo-500/20",
            iconColor: "text-indigo-600 dark:text-indigo-400",
            valueColor: "text-indigo-600 dark:text-indigo-400",
          },
          {
            label: "Avg Savings Rate",
            value: `${avgSavingsRate}%`,
            icon: BarChart3,
            iconBg: "bg-teal-500/10 border-teal-500/20",
            iconColor: "text-teal-600 dark:text-teal-400",
            valueColor:
              avgSavingsRate >= 20
                ? "text-teal-600 dark:text-teal-400"
                : avgSavingsRate >= 10
                  ? "text-amber-500 dark:text-amber-400"
                  : "text-destructive",
          },
        ].map(({ label, value, icon: Icon, iconBg, iconColor, valueColor }) => (
          <div
            key={label}
            className="rounded-[1.25rem] p-6 border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 group"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner group-hover:scale-105 transition-transform ${iconBg}`}
            >
              <Icon size={22} className={iconColor} />
            </div>
            <div>
              <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                {label}
              </p>
              <p
                className={`text-3xl font-bold tracking-tight leading-none ${valueColor}`}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Best / Worst Month highlight */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
            <Trophy
              size={24}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div>
            <p className="text-[12px] font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-wider mb-1">
              Best Month
            </p>
            <p className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-1 tracking-tight">
              {bestMonth?.month} 2026 · {fmt(bestMonth?.balance || 0)} saved
            </p>
            <p className="text-[13px] font-medium text-emerald-600 dark:text-emerald-500/80">
              Income {fmt(bestMonth?.income || 0)} — Expenses{" "}
              {fmt(bestMonth?.expenses || 0)}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-rose-500/10 border border-rose-500/20 shadow-sm">
            <ArrowDownRight
              size={24}
              className="text-rose-600 dark:text-rose-400"
            />
          </div>
          <div>
            <p className="text-[12px] font-bold text-rose-700 dark:text-rose-500 uppercase tracking-wider mb-1">
              Highest Spend Month
            </p>
            <p className="text-xl font-bold text-rose-800 dark:text-rose-400 mb-1 tracking-tight">
              {worstMonth?.month} 2026 · {fmt(worstMonth?.expenses || 0)} spent
            </p>
            <p className="text-[13px] font-medium text-rose-600 dark:text-rose-500/80">
              Net balance: {fmt(worstMonth?.balance || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-xl w-fit bg-muted/50 border border-border">
        {(["overview", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg capitalize transition-all font-bold text-[13px] ${
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "overview" ? "Analytics Overview" : "Transaction History"}
          </button>
        ))}
      </div>

      {activeTab === "overview" ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Income vs Expenses bar chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-[16px] font-bold text-card-foreground">
                  Monthly Income vs Expenses
                </h3>
                <p className="text-[13px] text-muted-foreground font-medium mt-1">
                  Comparison across all months · Jan – May 2026
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
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlySummary}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
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
                    content={<CustomTooltip />}
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
                    maxBarSize={48}
                  />
                  <Bar
                    dataKey="expenses"
                    name="expenses"
                    fill={chartColors.expenseBar}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Balance trend + Category breakdown */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Balance trend */}
            <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[16px] font-bold text-card-foreground">
                    Cumulative Balance Trend
                  </h3>
                  <p className="text-[13px] text-muted-foreground font-medium mt-1">
                    Running net savings growth over time
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-[13px]">
                  <ArrowUpRight size={14} />
                  {fmt(
                    monthlySummary[monthlySummary.length - 1]
                      ?.cumulativeBalance || 0,
                  )}
                </div>
              </div>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlySummary}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="balanceGradReport"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
                      fill="url(#balanceGradReport)"
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

            {/* All-time category breakdown */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="text-[16px] font-bold text-card-foreground">
                  Spending by Category
                </h3>
                <p className="text-[13px] text-muted-foreground font-medium mt-1">
                  All-time expense distribution
                </p>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allTimeExpenseByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="amount"
                        stroke="none"
                      >
                        {allTimeExpenseByCategory.map((entry, i) => (
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
                  {allTimeExpenseByCategory.slice(0, 5).map((item) => (
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
                      <div className="flex items-center gap-4">
                        <span className="text-[12px] font-bold text-muted-foreground">
                          {Math.round(item.percentage)}%
                        </span>
                        <span className="text-[13px] font-bold text-card-foreground">
                          {fmt(item.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Monthly breakdown table */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-border bg-muted/20">
              <h3 className="text-[16px] font-bold text-card-foreground">
                Monthly Performance Summary
              </h3>
              <p className="text-[13px] font-medium text-muted-foreground mt-1">
                Detailed breakdown by month
              </p>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/40">
                    {[
                      "Month",
                      "Income",
                      "Expenses",
                      "Net Balance",
                      "Savings Rate",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {[...monthlySummary].reverse().map((m, i) => {
                    const rate =
                      m.income > 0
                        ? Math.round((m.balance / m.income) * 100)
                        : 0;
                    const isBest = m.month === bestMonth?.month;
                    const isWorst = m.month === worstMonth?.month;
                    return (
                      <tr
                        key={m.month}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <span className="text-[14px] font-bold text-card-foreground group-hover:text-primary transition-colors">
                              {m.month} 2026
                            </span>
                            {isBest && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                                BEST
                              </span>
                            )}
                            {isWorst && !isBest && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shadow-sm">
                                HIGH SPEND
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-bold text-emerald-600 dark:text-emerald-400">
                          +{fmt(m.income)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-bold text-rose-600 dark:text-rose-400">
                          -{fmt(m.expenses)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-[15px] font-bold ${m.balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                          >
                            {m.balance >= 0 ? "+" : ""}
                            {fmt(m.balance)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${Math.max(0, Math.min(100, rate))}%`,
                                  background:
                                    rate >= 20
                                      ? "#10b981"
                                      : rate >= 10
                                        ? "#f59e0b"
                                        : "#ef4444",
                                }}
                              />
                            </div>
                            <span
                              className={`text-[13px] font-bold ${rate >= 20 ? "text-emerald-600 dark:text-emerald-400" : rate >= 10 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}
                            >
                              {rate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold border shadow-sm ${
                              rate >= 20
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : rate >= 10
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                            }`}
                          >
                            {rate >= 20
                              ? "On Track"
                              : rate >= 10
                                ? "Moderate"
                                : "Review"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export section */}
          <div className="rounded-[1.5rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-indigo-900/10 p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div>
                <p className="text-[18px] font-bold text-foreground mb-1.5">
                  Download Full Report
                </p>
                <p className="text-[14px] font-medium text-muted-foreground leading-relaxed max-w-md">
                  Export your complete financial history as a PDF summary or CSV
                  spreadsheet for personal records or accounting.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleExport("csv")}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 border border-border bg-card text-foreground font-bold text-[14px] shadow-sm"
                >
                  <FileSpreadsheet
                    size={16}
                    className="text-muted-foreground"
                  />
                  CSV Export
                </button>
                <button
                  onClick={() => handleExport("pdf")}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground shadow-md shadow-primary/25 font-bold text-[14px]"
                >
                  <FileText size={16} />
                  PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Transaction History */
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="px-6 py-5 border-b border-border bg-muted/20 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-card-foreground">
                All Transactions
              </h3>
              <p className="text-[13px] font-medium text-muted-foreground mt-1">
                {sortedTransactions.length} total entries
              </p>
            </div>
            <button
              onClick={() => handleExport("csv")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all text-indigo-600 dark:text-indigo-400 font-bold text-[13px]"
            >
              <Download size={14} />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40">
                  {["Date", "Title", "Category", "Type", "Amount"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sortedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-[14.5px] font-bold text-card-foreground group-hover:text-primary transition-colors">
                          {tx.title}
                        </p>
                        {tx.note && (
                          <p className="text-[12px] font-medium text-muted-foreground mt-0.5">
                            {tx.note}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm"
                        style={{
                          background:
                            tx.type === "income"
                              ? "rgba(16,185,129,0.1)"
                              : "rgba(244,63,94,0.1)",
                          color: tx.type === "income" ? "#10b981" : "#f43f5e",
                          borderColor:
                            tx.type === "income"
                              ? "rgba(16,185,129,0.2)"
                              : "rgba(244,63,94,0.2)",
                        }}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {tx.type === "income" ? (
                          <TrendingUp size={16} className="text-emerald-500" />
                        ) : (
                          <TrendingDown size={16} className="text-rose-500" />
                        )}
                        <span
                          className={`capitalize text-[13px] font-bold ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                        >
                          {tx.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-[15px] font-bold ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {fmt(tx.amount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

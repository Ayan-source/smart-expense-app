import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  BarChart3,
  UserCircle,
  LogOut,
  Menu,
  X,
  Wallet,
  Bell,
  ChevronRight,
  Sun,
  Moon,
  Search,
  Target,
  AlertCircle,
  CheckCircle2,
  Info,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandEmpty,
} from "./ui/command";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/income", label: "Income", icon: TrendingUp },
  { path: "/expenses", label: "Expenses", icon: TrendingDown },
  { path: "/budget", label: "Budget", icon: Target },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/support", label: "Help", icon: Info },
  { path: "/profile", label: "Profile", icon: UserCircle },
];

const NOTIFICATIONS = [
  {
    id: "n1",
    type: "warning",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    title: "Food & Dining at limit",
    desc: "You've used 100% of your Food & Dining budget for May.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "n2",
    type: "success",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    title: "Income added",
    desc: "Freelance – Web Design (+$850) was recorded successfully.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "n3",
    type: "info",
    icon: BarChart3,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    title: "April report ready",
    desc: "Your April 2026 financial summary is available to view.",
    time: "3 hr ago",
    unread: true,
  },
  {
    id: "n4",
    type: "tip",
    icon: Lightbulb,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10",
    title: "Savings tip",
    desc: "You're on track to save $1,246 this month — great work!",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "n5",
    type: "expense",
    icon: ArrowDownRight,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    title: "Expense logged",
    desc: "Metro Monthly Pass (–$95) was added to Transport.",
    time: "Yesterday",
    unread: false,
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    if (onClose) onClose();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-border shadow-sm">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-indigo-500 to-teal-500 shadow-sm">
          <Wallet size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sidebar-foreground font-bold tracking-tight text-[17px] leading-tight">
            SpendSmart
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            Finance Manager
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase px-2 mb-3">
          Navigation
        </p>
        {NAV_ITEMS.map(({ path, label, icon: Icon, end }) => {
          const isActive = end
            ? location.pathname === path
            : location.pathname.startsWith(path);

          return (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative font-medium ${
                isActive
                  ? "bg-secondary/10 text-secondary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-secondary" />
              )}
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${isActive ? "text-secondary" : "text-muted-foreground group-hover:text-foreground"}`}
              />
              <span className="text-[14.5px] tracking-tight">{label}</span>
              {isActive && (
                <ChevronRight size={16} className="ml-auto text-secondary" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 pb-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-muted-foreground hover:bg-muted hover:text-foreground font-medium text-[14.5px]"
        >
          <div className="w-9 h-5 rounded-full relative transition-all shrink-0 bg-secondary/20">
            <span
              className={`absolute top-[2px] w-4 h-4 rounded-full bg-secondary shadow-sm transition-all duration-300 ${isDark ? "left-[18px]" : "left-[2px]"}`}
            />
          </div>
          <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
          {isDark ? (
            <Moon size={16} className="ml-auto" />
          ) : (
            <Sun size={16} className="ml-auto" />
          )}
        </button>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-muted/50 mb-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-indigo-500 to-teal-500 shadow-inner">
            <span className="text-white font-bold text-sm tracking-tight">
              AJ
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground text-[14px] font-bold tracking-tight truncate">
              Alex Johnson
            </p>
            <p className="text-xs text-muted-foreground truncate font-medium">
              alex@example.com
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive font-medium text-[14px]"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

function NotificationCenter({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div
      ref={ref}
      className="absolute top-14 right-0 w-[400px] rounded-2xl shadow-2xl border border-border bg-popover z-50 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-bold text-popover-foreground tracking-tight">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary text-primary-foreground shadow-sm">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[420px]">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div
              key={notif.id}
              className={`flex gap-4 px-5 py-4 cursor-pointer transition-colors border-b border-border last:border-0 ${
                notif.unread
                  ? "bg-secondary/5 hover:bg-secondary/10"
                  : "hover:bg-muted"
              }`}
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) =>
                    n.id === notif.id ? { ...n, unread: false } : n,
                  ),
                )
              }
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${notif.iconBg}`}
              >
                <Icon size={18} className={notif.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-[14px] leading-tight tracking-tight ${notif.unread ? "font-bold text-popover-foreground" : "font-semibold text-popover-foreground/80"}`}
                  >
                    {notif.title}
                  </p>
                  {notif.unread && (
                    <span className="w-2 h-2 rounded-full shrink-0 mt-1.5 bg-secondary shadow-sm shadow-secondary/50" />
                  )}
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed mt-1">
                  {notif.desc}
                </p>
                <p className="text-[11px] font-medium text-muted-foreground mt-2 flex items-center gap-1.5 opacity-80">
                  <Clock size={12} />
                  {notif.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 border-t border-border bg-muted/30 rounded-b-2xl">
        <button className="text-[13px] font-semibold text-secondary w-full text-center hover:text-secondary/80 transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const { transactions } = useData();
  const navigate = useNavigate();

  const results =
    query.trim().length > 1
      ? transactions
          .filter(
            (t) =>
              t.title.toLowerCase().includes(query.toLowerCase()) ||
              t.category.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 8)
      : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl rounded-2xl shadow-2xl border border-border bg-card overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-200">
        <div className="flex items-center gap-4 px-5 py-4 border-b border-border bg-card">
          <Search size={20} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            aria-label="Search transactions"
            placeholder="Search transactions, categories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 outline-none bg-transparent text-[16px] font-medium text-card-foreground placeholder:text-muted-foreground/60"
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <kbd className="px-2 py-1 rounded-md text-[11px] font-bold text-muted-foreground bg-muted border border-border uppercase tracking-widest shadow-sm">
            Esc
          </kbd>
        </div>

        {query.trim().length > 1 ? (
          results.length > 0 ? (
            <div className="py-2">
              <p className="px-5 pt-2 pb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              {results.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => {
                    navigate(tx.type === "income" ? "/income" : "/expenses");
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 px-5 py-3 border-t border-border hover:bg-muted transition-colors text-left"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${tx.type === "income" ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
                  >
                    {tx.type === "income" ? (
                      <ArrowUpRight size={18} className="text-emerald-500" />
                    ) : (
                      <ArrowDownRight size={18} className="text-rose-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-card-foreground truncate">
                      {tx.title}
                    </p>
                    <p className="text-[12px] font-medium text-muted-foreground truncate">
                      {tx.category} ·{" "}
                      {new Date(tx.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-[14px] font-bold shrink-0 ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {fmt(tx.amount)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search size={32} className="text-muted-foreground/50 mb-4" />
              <p className="text-[15px] font-bold text-card-foreground">
                No results for "{query}"
              </p>
              <p className="text-[13px] font-medium text-muted-foreground mt-1">
                Try a different search term
              </p>
            </div>
          )
        ) : (
          <div className="px-5 py-5 bg-muted/20">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 gap-3">
              {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => {
                    navigate(path);
                    onClose();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-secondary/50 hover:shadow-sm transition-all text-left group"
                >
                  <Icon size={18} className="text-secondary shrink-0" />
                  <span className="text-[13px] font-semibold text-card-foreground group-hover:text-secondary transition-colors">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAddModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addTransaction, recentCategories, exportCSV, exportJSON } = useData();
  const [step, setStep] = useState<"details" | "review">("details");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & Dining");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions =
    type === "expense"
      ? [
          "Food & Dining",
          "Rent",
          "Transport",
          "Utilities",
          "Internet",
          "Shopping",
          "Education",
          "Entertainment",
          "Healthcare",
          "Other",
        ]
      : [
          "Salary",
          "Freelance",
          "Investment",
          "Bonus",
          "Gift",
          "Dividends",
          "Other",
        ];

  const isValid =
    title.trim().length > 1 && parseFloat(amount) > 0 && category.length > 0;

  useEffect(() => {
    if (!open) {
      setStep("details");
      setIsSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (!categoryOptions.includes(category)) {
      setCategory(type === "expense" ? "Food & Dining" : "Salary");
    }
  }, [type]);

  if (!open) return null;

  const handleSave = () => {
    if (!isValid) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      addTransaction({
        type,
        title: title.trim(),
        amount: parseFloat(amount),
        category: category as any,
        date,
        note: note.trim() || undefined,
      });
      setIsSubmitting(false);
      setTitle("");
      setAmount("");
      setNote("");
      setCategory(type === "expense" ? "Food & Dining" : "Salary");
      setDate(new Date().toISOString().split("T")[0]);
      setStep("details");
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Quick Add
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">
              Add a transaction in seconds
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close quick add"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-border bg-background p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl grid place-items-center bg-secondary/10 text-secondary">
                  <PlusCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Smart quick add
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Capture income or expenses with minimal effort and instant
                    suggestions.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["expense", "income"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setType(option as "expense" | "income")}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                      type === option
                        ? "bg-secondary/10 border-secondary text-secondary"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {option === "expense" ? "Money Out" : "Money In"}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm font-semibold text-foreground">
                  Recent categories
                </p>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Suggested
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="rounded-full border border-border bg-muted/70 px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-5 space-y-4">
              <p className="text-sm font-semibold text-foreground">
                Backup tools
              </p>
              <div className="grid gap-3">
                <button
                  onClick={exportCSV}
                  className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
                >
                  Export transactions as CSV
                </button>
                <button
                  onClick={exportJSON}
                  className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
                >
                  Download JSON backup
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
            {step === "details" ? (
              <div className="space-y-5">
                <div className="grid gap-4">
                  <label className="text-[13px] font-semibold text-foreground">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Grocery Shopping"
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-foreground">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-2xl border border-border bg-background px-12 py-3 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-foreground">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-foreground">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-foreground">
                    Note (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="Add a note about this transaction"
                    className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep("review")}
                  disabled={!isValid}
                  className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isValid
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Continue to review
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.25em]">
                    Review entry
                  </p>
                  <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        Transaction
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {title || "Untitled"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        Category
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        Amount
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        ${parseFloat(amount || "0").toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        Date
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {new Date(date).toLocaleDateString()}
                      </span>
                    </div>
                    {note && (
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm text-muted-foreground">
                          Note
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {note}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("details")}
                    className="flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!isValid || isSubmitting}
                    className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                      isValid
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? "Saving…" : "Save transaction"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { isDark } = useTheme();
  const { isSyncing } = useData();

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    const updateOnline = () => setIsOnline(navigator.onLine);
    updateOnline();
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCommandOpen(false);
        setQuickAddOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const statusText = isOnline
    ? isSyncing
      ? "Syncing changes"
      : "Live sync"
    : "Offline mode";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden lg:flex flex-col w-[260px] shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-[280px] flex flex-col h-full z-10 animate-in slide-in-from-left">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="flex flex-col gap-3 px-6 lg:px-10 py-4 shrink-0 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2.5 rounded-xl text-muted-foreground hover:bg-muted transition-colors border border-transparent hover:border-border"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <div>
                <p className="text-[13px] font-semibold text-muted-foreground tracking-tight">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-[12px] text-muted-foreground">
                  {statusText}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold ${isOnline ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}
              >
                {isOnline ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <AlertCircle size={14} />
                )}
                {statusText}
              </span>
              <button
                onClick={() => setQuickAddOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-muted/50 hover:bg-muted text-muted-foreground transition-all text-[14px]"
              >
                <PlusCircle size={16} />
                Quick Add
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-muted/50 hover:bg-muted hover:border-muted-foreground/30 transition-all text-muted-foreground"
              >
                <Search size={16} className="text-foreground/70" />
                <span className="hidden sm:inline text-[13.5px] font-medium">
                  Search
                </span>
                <kbd className="hidden sm:inline px-2 py-0.5 rounded text-[11px] font-bold bg-background shadow-sm border border-border">
                  ⌘K
                </kbd>
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotifOpen((o) => !o)}
                  className={`relative p-2.5 rounded-xl transition-all border ${notifOpen ? "bg-secondary/10 border-secondary/30 text-secondary" : "border-transparent text-muted-foreground hover:bg-muted hover:border-border"}`}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-destructive text-[10px] font-bold text-white border-2 border-background">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <NotificationCenter onClose={() => setNotifOpen(false)} />
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_max-content] items-center">
            <div className="rounded-3xl border border-border bg-card p-4 shadow-sm flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Command palette
                </p>
                <p className="text-xs text-muted-foreground">
                  Open with Cmd/Ctrl + K for instant navigation.
                </p>
              </div>
              <button
                onClick={() => setCommandOpen(true)}
                className="rounded-2xl border border-border bg-muted/50 px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                Open
              </button>
            </div>
            <div className="rounded-3xl border border-border bg-card p-4 shadow-sm flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Live sync
                </p>
                <p className="text-xs text-muted-foreground">
                  Your data updates instantly as you work.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 px-3 py-2 text-[12px] font-semibold text-muted-foreground">
                <RefreshCw size={16} />
                {isSyncing ? "Syncing" : "Up to date"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {quickAddOpen && (
        <QuickAddModal
          open={quickAddOpen}
          onClose={() => setQuickAddOpen(false)}
        />
      )}

      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        title="Command Palette"
        description="Quickly navigate or add a transaction."
      >
        <CommandInput placeholder="Type a command or page name…" />
        <CommandList>
          <CommandGroup heading="Navigate">
            {NAV_ITEMS.map(({ path, label }) => (
              <CommandItem
                key={path}
                onSelect={() => {
                  setCommandOpen(false);
                  setSearchOpen(false);
                  setQuickAddOpen(false);
                  window.location.pathname = path;
                }}
              >
                {label}
                <CommandShortcut>Go</CommandShortcut>
              </CommandItem>
            ))}
            <CommandItem
              onSelect={() => {
                setCommandOpen(false);
                setQuickAddOpen(true);
              }}
            >
              Quick add transaction
              <CommandShortcut>↵</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setCommandOpen(false);
                setSearchOpen(true);
              }}
            >
              Search transactions
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandEmpty>No command found.</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

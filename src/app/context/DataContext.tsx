import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { toast } from "sonner";
import { Transaction, initialTransactions } from "../data/mockData";

interface DataContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  recoverTransaction: (id: string) => void;
  trashTransactions: Transaction[];
  clearTrash: () => void;
  exportJSON: () => void;
  exportCSV: () => void;
  importData: (file: File) => Promise<void>;
  isLoading: boolean;
  isSyncing: boolean;
  recentCategories: string[];
  recentMerchants: string[];
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  currentMonthIncome: number;
  currentMonthExpenses: number;
  currentMonthBalance: number;
  incomeTransactions: Transaction[];
  expenseTransactions: Transaction[];
  // Monthly summaries for charts
  monthlySummary: MonthSummary[];
  currentMonthExpensesByCategory: CategorySummary[];
  currentMonthIncomeByCategory: CategorySummary[];
  cashFlowScore: number;
  monthlyHealthScore: number;
  subscriptionAlerts: string[];
  spendingInsights: string[];
}

export interface MonthSummary {
  month: string;
  monthNum: number;
  year: number;
  income: number;
  expenses: number;
  balance: number;
  cumulativeBalance: number;
}

export interface CategorySummary {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const DataContext = createContext<DataContextType | null>(null);

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [trashTransactions, setTrashTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, []);

  const startSync = () => {
    setIsSyncing(true);
    window.setTimeout(() => setIsSyncing(false), 700);
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const isBeforeOrToday = (dateStr: string) => {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    return d.getTime() <= now.getTime();
  };

  const visibleTransactions = transactions.filter((tx) =>
    isBeforeOrToday(tx.date),
  );

  const importData = async (file: File) => {
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      if (!Array.isArray(payload.transactions))
        throw new Error("Invalid backup format");

      const imported = payload.transactions
        .filter(
          (item: any) =>
            item && item.type && item.title && item.amount && item.date,
        )
        .map((item: any) => ({
          id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          type: item.type,
          title: String(item.title),
          category: String(item.category || "Other"),
          amount: Number(item.amount),
          date: String(item.date),
          note: item.note ? String(item.note) : undefined,
        })) as Transaction[];

      if (imported.length === 0) {
        toast.error("Import failed", {
          description:
            "The uploaded file does not contain valid transaction data.",
        });
        return;
      }

      setTransactions((prev) => [...imported, ...prev]);
      startSync();
      toast.success("Backup imported", {
        description: `${imported.length} transactions recovered from file.`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Import failed", {
        description: "Upload a valid SpendSmart backup file in JSON format.",
      });
    }
  };

  const exportJSON = () => {
    downloadFile(
      JSON.stringify(
        { transactions, exportedAt: new Date().toISOString() },
        null,
        2,
      ),
      `spendsmart-backup-${new Date().toISOString().slice(0, 10)}.json`,
      "application/json",
    );
    toast.success("Backup download started", {
      description: "Your data export is ready in your downloads folder.",
    });
  };

  const exportCSV = () => {
    const header = [
      "id",
      "type",
      "title",
      "category",
      "amount",
      "date",
      "note",
    ];
    const rows = transactions.map((tx) =>
      [
        tx.id,
        tx.type,
        tx.title.replace(/"/g, '""'),
        tx.category.replace(/"/g, '""'),
        tx.amount,
        tx.date,
        tx.note ? tx.note.replace(/"/g, '""') : "",
      ]
        .map((value) => `"${value}"`)
        .join(","),
    );
    downloadFile(
      [header.join(","), ...rows].join("\r\n"),
      `spendsmart-data-${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv",
    );
    toast.success("CSV export ready", {
      description: "Download has started for your transaction CSV.",
    });
  };

  const recoverTransaction = (id: string) => {
    setTrashTransactions((prevTrash) => {
      const recovered = prevTrash.find((item) => item.id === id);
      if (!recovered) return prevTrash;
      setTransactions((prev) => [recovered, ...prev]);
      startSync();
      toast.success("Transaction restored", {
        description: `${recovered.title} was moved back to your register.`,
      });
      return prevTrash.filter((item) => item.id !== id);
    });
  };

  const clearTrash = () => {
    setTrashTransactions([]);
    toast.success("Trash cleared", {
      description: "Deleted transactions have been permanently removed.",
    });
  };

  const addTransaction = (t: Omit<Transaction, "id">) => {
    const normalizedTitle = t.title.trim().toLowerCase();
    const duplicate = transactions.some(
      (tx) =>
        tx.type === t.type &&
        tx.amount === t.amount &&
        tx.category === t.category &&
        tx.date === t.date &&
        tx.title.trim().toLowerCase() === normalizedTitle,
    );

    if (duplicate) {
      toast.error("Duplicate transaction detected", {
        description:
          "This entry looks like one you already recorded. Try a different description or adjust the date.",
      });
      return;
    }

    const newTransaction: Transaction = {
      ...t,
      id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    startSync();
    toast.success("Transaction recorded", {
      description: `${newTransaction.title} was added successfully.`,
      action: {
        label: "Undo",
        onClick: () => recoverTransaction(newTransaction.id),
      },
    });
  };

  const deleteTransaction = (id: string) => {
    const item = transactions.find((tx) => tx.id === id);
    if (!item) return;
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    setTrashTransactions((prev) => [item, ...prev]);
    startSync();
    toast.success("Transaction deleted", {
      description: `${item.title} was moved to trash.`,
      action: {
        label: "Restore",
        onClick: () => recoverTransaction(item.id),
      },
    });
  };

  const computed = useMemo(() => {
    const incomeTransactions = visibleTransactions.filter(
      (t) => t.type === "income",
    );
    const expenseTransactions = visibleTransactions.filter(
      (t) => t.type === "expense",
    );

    const totalIncome = incomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );
    const totalExpenses = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );
    const totalBalance = totalIncome - totalExpenses;

    const isCurrentMonth = (dateStr: string) => {
      const d = new Date(dateStr);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    };

    const currentMonthIncome = incomeTransactions
      .filter((t) => isCurrentMonth(t.date))
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthExpenses = expenseTransactions
      .filter((t) => isCurrentMonth(t.date))
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthBalance = currentMonthIncome - currentMonthExpenses;

    const monthWindow = 5;
    const monthlySummary: MonthSummary[] = Array.from({
      length: monthWindow,
    }).map((_, index) => {
      const date = new Date(
        currentYear,
        currentMonth - monthWindow + 1 + index,
        1,
      );
      const month = date.toLocaleString("en-US", { month: "short" });
      const monthNum = date.getMonth();
      const year = date.getFullYear();

      const monthIncome = transactions
        .filter((t) => {
          const d = new Date(t.date);
          return (
            t.type === "income" &&
            d.getMonth() === monthNum &&
            d.getFullYear() === year
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const monthExpenses = transactions
        .filter((t) => {
          const d = new Date(t.date);
          return (
            t.type === "expense" &&
            d.getMonth() === monthNum &&
            d.getFullYear() === year
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month,
        monthNum,
        year,
        income: monthIncome,
        expenses: monthExpenses,
        balance: monthIncome - monthExpenses,
        cumulativeBalance: 0,
      };
    });

    let cumulative = 0;
    const monthlySummaryWithTrend = monthlySummary.map((item) => {
      cumulative += item.balance;
      return { ...item, cumulativeBalance: cumulative };
    });

    const currentMonthExpensesList = expenseTransactions.filter((t) =>
      isCurrentMonth(t.date),
    );
    const expenseByCat: Record<string, number> = {};
    currentMonthExpensesList.forEach((t) => {
      expenseByCat[t.category] = (expenseByCat[t.category] || 0) + t.amount;
    });
    const totalExpCat = Object.values(expenseByCat).reduce((s, v) => s + v, 0);

    const EXPENSE_CAT_COLORS: Record<string, string> = {
      "Food & Dining": "#f43f5e",
      Rent: "#ef4444",
      Transport: "#f59e0b",
      Utilities: "#8b5cf6",
      Internet: "#3b82f6",
      Shopping: "#ec4899",
      Education: "#10b981",
      Entertainment: "#6366f1",
      Healthcare: "#14b8a6",
      Other: "#94a3b8",
    };

    const currentMonthExpensesByCategory: CategorySummary[] = Object.entries(
      expenseByCat,
    )
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpCat > 0 ? (amount / totalExpCat) * 100 : 0,
        color: EXPENSE_CAT_COLORS[category] || "#94a3b8",
      }))
      .sort((a, b) => b.amount - a.amount);

    const currentMonthIncomeList = incomeTransactions.filter((t) =>
      isCurrentMonth(t.date),
    );
    const incomeByCat: Record<string, number> = {};
    currentMonthIncomeList.forEach((t) => {
      incomeByCat[t.category] = (incomeByCat[t.category] || 0) + t.amount;
    });
    const totalIncCat = Object.values(incomeByCat).reduce((s, v) => s + v, 0);

    const INCOME_CAT_COLORS: Record<string, string> = {
      Salary: "#4f46e5",
      Freelance: "#0d9488",
      Investment: "#f59e0b",
      Bonus: "#10b981",
      Gift: "#ec4899",
      Dividends: "#6366f1",
      Other: "#94a3b8",
    };

    const currentMonthIncomeByCategory: CategorySummary[] = Object.entries(
      incomeByCat,
    )
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalIncCat > 0 ? (amount / totalIncCat) * 100 : 0,
        color: INCOME_CAT_COLORS[category] || "#94a3b8",
      }))
      .sort((a, b) => b.amount - a.amount);

    const spendingRatio =
      currentMonthIncome > 0 ? currentMonthExpenses / currentMonthIncome : 0;
    const cashFlowScore = Math.max(
      10,
      Math.min(
        100,
        Math.round(
          ((currentMonthIncome - currentMonthExpenses) /
            Math.max(currentMonthIncome, 1)) *
            100 +
            30,
        ),
      ),
    );
    const monthlyHealthScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          100 -
            spendingRatio * 60 +
            Math.min(
              20,
              Math.max(
                0,
                ((currentMonthIncome - currentMonthExpenses) /
                  Math.max(currentMonthIncome, 1)) *
                  100,
              ),
            ),
        ),
      ),
    );

    const recurringCategories = expenseTransactions.reduce<
      Record<string, number>
    >((acc, tx) => {
      if (
        [
          "Internet",
          "Utilities",
          "Entertainment",
          "Transport",
          "Rent",
        ].includes(tx.category)
      ) {
        acc[tx.category] = (acc[tx.category] || 0) + 1;
      }
      return acc;
    }, {});

    const subscriptionAlerts = Object.entries(recurringCategories)
      .filter(([, count]) => count > 1)
      .map(
        ([category, count]) =>
          `${category} appears ${count} times this quarter, check for recurring savings.`,
      )
      .slice(0, 3);

    const spendingInsights: string[] = [];
    if (spendingRatio >= 0.9) {
      spendingInsights.push(
        "You are spending 90% or more of your income this month — consider a savings buffer.",
      );
    } else if (spendingRatio <= 0.5) {
      spendingInsights.push(
        "Excellent work! Your spending is under 50% of monthly income.",
      );
    } else {
      spendingInsights.push(
        "Review your top expense categories for quick savings opportunities.",
      );
    }
    if (currentMonthExpensesByCategory.length > 0) {
      const highest = currentMonthExpensesByCategory[0];
      spendingInsights.push(
        `Highest spend category this month: ${highest.category} (${Math.round(highest.percentage)}%).`,
      );
    }
    if (currentMonthIncome - currentMonthExpenses > 1000) {
      spendingInsights.push(
        "Cash flow is strong — a good time to increase your emergency fund.",
      );
    }

    return {
      incomeTransactions,
      expenseTransactions,
      totalIncome,
      totalExpenses,
      totalBalance,
      currentMonthIncome,
      currentMonthExpenses,
      currentMonthBalance,
      monthlySummary: monthlySummaryWithTrend,
      currentMonthExpensesByCategory,
      currentMonthIncomeByCategory,
      cashFlowScore,
      monthlyHealthScore,
      subscriptionAlerts,
      spendingInsights,
    };
  }, [transactions, currentMonth, currentYear]);

  const recentCategories = useMemo(() => {
    const seen = new Set<string>();
    const categories: string[] = [];
    for (const tx of visibleTransactions) {
      if (!seen.has(tx.category)) {
        seen.add(tx.category);
        categories.push(tx.category);
      }
      if (categories.length >= 6) break;
    }
    return categories;
  }, [visibleTransactions]);

  const recentMerchants = useMemo(() => {
    const merchants = visibleTransactions
      .map((tx) => tx.title)
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 6);
    return merchants;
  }, [visibleTransactions]);

  return (
    <DataContext.Provider
      value={{
        transactions: visibleTransactions,
        addTransaction,
        deleteTransaction,
        recoverTransaction,
        trashTransactions,
        clearTrash,
        exportJSON,
        exportCSV,
        importData,
        isLoading,
        isSyncing,
        recentCategories,
        recentMerchants,
        ...computed,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

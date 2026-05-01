import React, { createContext, useContext, useState, useMemo } from 'react';
import { Transaction, initialTransactions } from '../data/mockData';

interface DataContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  // Computed
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

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const computed = useMemo(() => {
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const expenseTransactions = transactions.filter(t => t.type === 'expense');

    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    // Current month: May 2026
    const currentMonth = 4; // 0-indexed (May = 4)
    const currentYear = 2026;

    const isCurrentMonth = (dateStr: string) => {
      const d = new Date(dateStr);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    };

    const currentMonthIncome = incomeTransactions
      .filter(t => isCurrentMonth(t.date))
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthExpenses = expenseTransactions
      .filter(t => isCurrentMonth(t.date))
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthBalance = currentMonthIncome - currentMonthExpenses;

    // Monthly summary for last 5 months (Jan-May 2026)
    const months = [
      { month: 'Jan', monthNum: 0, year: 2026 },
      { month: 'Feb', monthNum: 1, year: 2026 },
      { month: 'Mar', monthNum: 2, year: 2026 },
      { month: 'Apr', monthNum: 3, year: 2026 },
      { month: 'May', monthNum: 4, year: 2026 },
    ];

    let cumulative = 0;
    const monthlySummary: MonthSummary[] = months.map(({ month, monthNum, year }) => {
      const monthIncome = transactions
        .filter(t => {
          const d = new Date(t.date);
          return t.type === 'income' && d.getMonth() === monthNum && d.getFullYear() === year;
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const monthExpenses = transactions
        .filter(t => {
          const d = new Date(t.date);
          return t.type === 'expense' && d.getMonth() === monthNum && d.getFullYear() === year;
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const balance = monthIncome - monthExpenses;
      cumulative += balance;

      return { month, monthNum, year, income: monthIncome, expenses: monthExpenses, balance, cumulativeBalance: cumulative };
    });

    // Current month expense breakdown by category
    const currentMonthExpensesList = expenseTransactions.filter(t => isCurrentMonth(t.date));
    const expenseByCat: Record<string, number> = {};
    currentMonthExpensesList.forEach(t => {
      expenseByCat[t.category] = (expenseByCat[t.category] || 0) + t.amount;
    });
    const totalExpCat = Object.values(expenseByCat).reduce((s, v) => s + v, 0);

    const EXPENSE_CAT_COLORS: Record<string, string> = {
      'Food & Dining': '#f43f5e',
      Rent: '#ef4444',
      Transport: '#f59e0b',
      Utilities: '#8b5cf6',
      Internet: '#3b82f6',
      Shopping: '#ec4899',
      Education: '#10b981',
      Entertainment: '#6366f1',
      Healthcare: '#14b8a6',
      Other: '#94a3b8',
    };

    const currentMonthExpensesByCategory: CategorySummary[] = Object.entries(expenseByCat)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpCat > 0 ? (amount / totalExpCat) * 100 : 0,
        color: EXPENSE_CAT_COLORS[category] || '#94a3b8',
      }))
      .sort((a, b) => b.amount - a.amount);

    // Current month income breakdown by category
    const currentMonthIncomeList = incomeTransactions.filter(t => isCurrentMonth(t.date));
    const incomeByCat: Record<string, number> = {};
    currentMonthIncomeList.forEach(t => {
      incomeByCat[t.category] = (incomeByCat[t.category] || 0) + t.amount;
    });
    const totalIncCat = Object.values(incomeByCat).reduce((s, v) => s + v, 0);

    const INCOME_CAT_COLORS: Record<string, string> = {
      Salary: '#4f46e5',
      Freelance: '#0d9488',
      Investment: '#f59e0b',
      Bonus: '#10b981',
      Gift: '#ec4899',
      Dividends: '#6366f1',
      Other: '#94a3b8',
    };

    const currentMonthIncomeByCategory: CategorySummary[] = Object.entries(incomeByCat)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalIncCat > 0 ? (amount / totalIncCat) * 100 : 0,
        color: INCOME_CAT_COLORS[category] || '#94a3b8',
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      incomeTransactions,
      expenseTransactions,
      totalIncome,
      totalExpenses,
      totalBalance,
      currentMonthIncome,
      currentMonthExpenses,
      currentMonthBalance,
      monthlySummary,
      currentMonthExpensesByCategory,
      currentMonthIncomeByCategory,
    };
  }, [transactions]);

  return (
    <DataContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        ...computed,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

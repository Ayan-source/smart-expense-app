export type IncomeCategory = 'Salary' | 'Freelance' | 'Investment' | 'Bonus' | 'Gift' | 'Dividends' | 'Other';
export type ExpenseCategory =
  | 'Food & Dining'
  | 'Rent'
  | 'Transport'
  | 'Utilities'
  | 'Internet'
  | 'Shopping'
  | 'Education'
  | 'Entertainment'
  | 'Healthcare'
  | 'Other';

export type TransactionCategory = IncomeCategory | ExpenseCategory;

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  category: TransactionCategory;
  amount: number;
  date: string; // YYYY-MM-DD
  note?: string;
}

export const INCOME_CATEGORIES: IncomeCategory[] = [
  'Salary',
  'Freelance',
  'Investment',
  'Bonus',
  'Gift',
  'Dividends',
  'Other',
];

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food & Dining',
  'Rent',
  'Transport',
  'Utilities',
  'Internet',
  'Shopping',
  'Education',
  'Entertainment',
  'Healthcare',
  'Other',
];

export const INCOME_CATEGORY_COLORS: Record<IncomeCategory, string> = {
  Salary: '#4f46e5',
  Freelance: '#0d9488',
  Investment: '#f59e0b',
  Bonus: '#10b981',
  Gift: '#ec4899',
  Dividends: '#6366f1',
  Other: '#94a3b8',
};

export const EXPENSE_CATEGORY_COLORS: Record<ExpenseCategory, string> = {
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

export const initialTransactions: Transaction[] = [
  // === MAY 2026 ===
  { id: 'i1', type: 'income', title: 'Monthly Salary', category: 'Salary', amount: 4500, date: '2026-05-01', note: 'May paycheck' },
  { id: 'i2', type: 'income', title: 'Freelance – Web Design', category: 'Freelance', amount: 850, date: '2026-05-03', note: 'E-commerce redesign project' },
  { id: 'i3', type: 'income', title: 'Stock Dividends', category: 'Dividends', amount: 320, date: '2026-05-05' },
  { id: 'e1', type: 'expense', title: 'Apartment Rent', category: 'Rent', amount: 1400, date: '2026-05-01', note: 'Monthly rent' },
  { id: 'e2', type: 'expense', title: 'Grocery Shopping', category: 'Food & Dining', amount: 185, date: '2026-05-02' },
  { id: 'e3', type: 'expense', title: 'Metro Monthly Pass', category: 'Transport', amount: 95, date: '2026-05-03' },
  { id: 'e4', type: 'expense', title: 'Online Course – React Advanced', category: 'Education', amount: 79, date: '2026-05-04' },
  { id: 'e5', type: 'expense', title: 'Restaurant – Dinner with friends', category: 'Food & Dining', amount: 65, date: '2026-05-05' },

  // === APRIL 2026 ===
  { id: 'i4', type: 'income', title: 'Monthly Salary', category: 'Salary', amount: 4500, date: '2026-04-01' },
  { id: 'i5', type: 'income', title: 'Performance Bonus', category: 'Bonus', amount: 1200, date: '2026-04-10', note: 'Q1 performance reward' },
  { id: 'i6', type: 'income', title: 'Freelance – Logo Design', category: 'Freelance', amount: 450, date: '2026-04-15' },
  { id: 'i7', type: 'income', title: 'Investment Return', category: 'Investment', amount: 380, date: '2026-04-22' },
  { id: 'e6', type: 'expense', title: 'Apartment Rent', category: 'Rent', amount: 1400, date: '2026-04-01' },
  { id: 'e7', type: 'expense', title: 'Grocery Shopping', category: 'Food & Dining', amount: 210, date: '2026-04-05' },
  { id: 'e8', type: 'expense', title: 'New Running Sneakers', category: 'Shopping', amount: 140, date: '2026-04-10' },
  { id: 'e9', type: 'expense', title: 'Internet & Broadband Bill', category: 'Internet', amount: 55, date: '2026-04-12' },
  { id: 'e10', type: 'expense', title: 'Coffee Subscription', category: 'Food & Dining', amount: 42, date: '2026-04-14' },
  { id: 'e11', type: 'expense', title: 'Electricity Bill', category: 'Utilities', amount: 88, date: '2026-04-18' },
  { id: 'e12', type: 'expense', title: 'Netflix & Spotify', category: 'Entertainment', amount: 28, date: '2026-04-22' },

  // === MARCH 2026 ===
  { id: 'i8', type: 'income', title: 'Monthly Salary', category: 'Salary', amount: 4500, date: '2026-03-01' },
  { id: 'i9', type: 'income', title: 'Investment Return', category: 'Investment', amount: 680, date: '2026-03-12', note: 'Portfolio rebalancing' },
  { id: 'i10', type: 'income', title: 'Birthday Gift', category: 'Gift', amount: 200, date: '2026-03-20' },
  { id: 'e13', type: 'expense', title: 'Apartment Rent', category: 'Rent', amount: 1400, date: '2026-03-01' },
  { id: 'e14', type: 'expense', title: 'Grocery Shopping', category: 'Food & Dining', amount: 195, date: '2026-03-04' },
  { id: 'e15', type: 'expense', title: 'Taxi & Rideshare', category: 'Transport', amount: 78, date: '2026-03-10' },
  { id: 'e16', type: 'expense', title: 'Gym Membership', category: 'Entertainment', amount: 45, date: '2026-03-15' },
  { id: 'e17', type: 'expense', title: 'Medical Checkup', category: 'Healthcare', amount: 120, date: '2026-03-18' },
  { id: 'e18', type: 'expense', title: 'Internet & Broadband Bill', category: 'Internet', amount: 55, date: '2026-03-22' },

  // === FEBRUARY 2026 ===
  { id: 'i11', type: 'income', title: 'Monthly Salary', category: 'Salary', amount: 4500, date: '2026-02-01' },
  { id: 'i12', type: 'income', title: 'Freelance – App Development', category: 'Freelance', amount: 1500, date: '2026-02-08', note: 'Mobile app for retail client' },
  { id: 'i13', type: 'income', title: 'Dividends Payout', category: 'Dividends', amount: 290, date: '2026-02-20' },
  { id: 'e19', type: 'expense', title: 'Apartment Rent', category: 'Rent', amount: 1400, date: '2026-02-01' },
  { id: 'e20', type: 'expense', title: 'Grocery Shopping', category: 'Food & Dining', amount: 175, date: '2026-02-06' },
  { id: 'e21', type: 'expense', title: 'Books & Stationery', category: 'Education', amount: 65, date: '2026-02-10' },
  { id: 'e22', type: 'expense', title: 'Electricity Bill', category: 'Utilities', amount: 95, date: '2026-02-14' },
  { id: 'e23', type: 'expense', title: 'Clothing & Accessories', category: 'Shopping', amount: 175, date: '2026-02-20' },

  // === JANUARY 2026 ===
  { id: 'i14', type: 'income', title: 'Monthly Salary', category: 'Salary', amount: 4500, date: '2026-01-01' },
  { id: 'i15', type: 'income', title: 'Year-End Performance Bonus', category: 'Bonus', amount: 2000, date: '2026-01-15', note: 'Annual review bonus' },
  { id: 'i16', type: 'income', title: 'Freelance – UI Design', category: 'Freelance', amount: 650, date: '2026-01-25' },
  { id: 'e24', type: 'expense', title: 'Apartment Rent', category: 'Rent', amount: 1400, date: '2026-01-01' },
  { id: 'e25', type: 'expense', title: 'New Year Dinner', category: 'Food & Dining', amount: 120, date: '2026-01-01' },
  { id: 'e26', type: 'expense', title: 'Laptop Accessories', category: 'Shopping', amount: 250, date: '2026-01-08' },
  { id: 'e27', type: 'expense', title: 'Grocery Shopping', category: 'Food & Dining', amount: 220, date: '2026-01-10' },
  { id: 'e28', type: 'expense', title: 'Streaming Services Bundle', category: 'Entertainment', amount: 38, date: '2026-01-15' },
  { id: 'e29', type: 'expense', title: 'Dentist Appointment', category: 'Healthcare', amount: 90, date: '2026-01-20' },
  { id: 'e30', type: 'expense', title: 'Internet & Broadband Bill', category: 'Internet', amount: 55, date: '2026-01-22' },
];

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

# SpendSmart

Smart Expense App is a modern, responsive personal finance dashboard built with React and Vite. The app is branded internally as `SpendSmart` and provides an interactive finance workspace for tracking income, expenses, and monthly trends.

## 🚀 Key Features

- **Dashboard Overview**: View total balance, monthly income and expenses, savings rate, and recent transactions.
- **Income & Expense Management**: Add new income or expense records, delete transactions, and restore items from trash.
- **Analytics & Reports**: Review monthly summaries, cash flow trends, category breakdowns, and spending insights.
- **Budget, Profile & Support Pages**: Navigate through dedicated pages for budgeting, user profile, and support content.
- **Theme Persistence**: Toggle dark/light mode and save the preference in local storage.
- **Data Export/Import**: Export transactions as JSON or CSV and import backup data in JSON format.
- **Responsive UI**: Adapted for desktop and mobile screen sizes.

## 🧠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: React Context API
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + MUI icons
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```text
smart-expense-app/
├── src/
│   ├── app/
│   │   ├── components/   # Layout, navigation, shared UI components
│   │   ├── context/      # Theme and data providers
│   │   ├── data/         # Mock data, transaction types, category definitions
│   │   ├── pages/        # Route pages: Dashboard, Income, Expenses, etc.
│   │   ├── routes.tsx    # Browser router configuration
│   │   └── App.tsx       # Root application component
│   ├── assets/           # Static assets imported by Vite
│   ├── styles/           # Global CSS and Tailwind setup
│   └── main.tsx          # Entry point
├── index.html            # HTML shell
├── package.json          # Scripts and dependency metadata
├── vite.config.ts        # Vite configuration and plugins
└── README.md             # Project documentation
```

## ⚙️ Installation & Setup

1. Open the project directory:

```bash
cd smart-expense-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in the browser at the URL shown by Vite (typically `http://localhost:5173`).

## 🚢 Build & Deployment

Build the production bundle with:

```bash
npm run build
```

This generates the production output in the `dist/` directory.

## 🧩 Application Architecture

- **Routing**: `src/app/routes.tsx` defines public and protected routes with lazy-loaded pages.
- **Theme**: `src/app/context/ThemeContext.tsx` handles dark/light mode and persists the selection in localStorage.
- **Data Management**: `src/app/context/DataContext.tsx` manages transactions, soft delete/trash state, exports/imports, and analytics calculations.
- **Mock Data**: `src/app/data/mockData.ts` provides seeded multi-month income and expense transactions for demo and analytics.
- **Dashboard**: `src/app/pages/Dashboard.tsx` displays charts, summary cards, and activity insights.
- **Login**: `src/app/pages/Login.tsx` provides a demo login experience with form validation.

## 🧪 Notes

- No automated test framework is configured in the repository.
- The current implementation uses client-side mock data and local state only.

## 🤝 Contributing

If you'd like to improve the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

_Built for clearer finance tracking with fast, client-side analytics and modern UI._

import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Income } from './pages/Income';
import { Expenses } from './pages/Expenses';
import { Budget } from './pages/Budget';
import { Reports } from './pages/Reports';
import { Profile } from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'income', Component: Income },
      { path: 'expenses', Component: Expenses },
      { path: 'budget', Component: Budget },
      { path: 'reports', Component: Reports },
      { path: 'profile', Component: Profile },
    ],
  },
]);

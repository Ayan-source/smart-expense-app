import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
          }}
        />
      </DataProvider>
    </ThemeProvider>
  );
}

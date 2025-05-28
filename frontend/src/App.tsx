import { ThemeProvider } from '@/components/theme-provider';
import { createBrowserRouter, Link, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import ErrorPage from '@/pages/error/page';
import { authRoutes } from '@/routes/auth.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="flex flex-col gap-10">
        Hello world!
        <Link to="/auth/login">Login</Link>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  ...authRoutes,
  // crmRoutes,
  // accountRoutes,
  // dashboardRoutes
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        richColors
        // closeButton
      />
    </ThemeProvider>
  );
}

export default App;

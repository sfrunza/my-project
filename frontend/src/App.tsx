import { ThemeProvider } from '@/components/theme-provider';
import ErrorPage from '@/pages/error/page';
import { authRoutes } from '@/routes/auth.routes';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, Link, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import AccountPage from '@/pages/account/page';
import CrmPage from '@/pages/crm/page';
import { verifyAuthLoader } from './loaders';
import { GlobalFallback } from '@/components/global-fallback';
import PrivateRoute from '@/components/private-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="flex flex-col gap-10">
        Hello world!
        <Link to="/auth/login">Login</Link>
        <Link to="/account">Account</Link>
        <Link to="/crm">CRM</Link>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/account',
    loader: verifyAuthLoader,
    element: (
      <PrivateRoute allowedRoles={['customer', 'admin']}>
        <AccountPage />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <GlobalFallback />,
  },
  {
    path: '/crm',
    loader: verifyAuthLoader,
    element: (
      <PrivateRoute allowedRoles={['admin', 'manager']}>
        <CrmPage />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <GlobalFallback />,
  },
  ...authRoutes,
  // crmRoutes,
  // accountRoutes,
  // dashboardRoutes
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          richColors
          // closeButton
        />
      </Provider>
    </ThemeProvider>
  );
}

export default App;

import { useAuth } from '@/hooks/use-auth';

export default function AccountPage() {
  const { user } = useAuth();

  return <div>AccountPage {user?.email_address}</div>;
}

import { useAuth } from '@/hooks/use-auth';

export default function CrmPage() {
  const { user } = useAuth();

  return <div>CrmPage {user?.email_address}</div>;
}

import { getMainNavigation } from '@/src/lib/navigation/utils';
import MainLayout from '@/components/layout/MainLayout';
import { clientNavigationBottom } from '@/src/lib/navigation/client';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout navigation={getMainNavigation('client')} section="client" bottomNavigation={clientNavigationBottom}>
      {children}
    </MainLayout>
  );
} 
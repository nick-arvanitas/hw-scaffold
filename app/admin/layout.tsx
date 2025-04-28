"use client";

import { getMainNavigation } from '../../lib/navigation/utils';
import MainLayout from '../../components/layout/MainLayout';
import { adminNavigationBottom } from '../../lib/navigation/admin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout navigation={getMainNavigation('admin')} bottomNavigation={adminNavigationBottom} section="admin">
            {children}
        </MainLayout>
    );
}

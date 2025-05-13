import { TopNav } from './TopNav';
import { NavItem } from '@/src/lib/navigation/types';

interface HeaderBarProps {
  title: string;
  subnavigation?: NavItem[];
}

export default function HeaderBar({ title, subnavigation }: HeaderBarProps) {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 pt-5 pb-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
        {subnavigation && subnavigation.length > 0 && <TopNav tabs={subnavigation} />}
      </div>
    </div>
  );
}

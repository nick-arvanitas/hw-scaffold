import { faCalendar, faChartBar, faClipboardCheck, faCog, faEnvelope, faFileExport, faHome, faSliders, faUser, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from './types';
export const adminNavigation: NavItem[] = [
  {
    name: 'Contractors',
    icon: faUserTie,
    href: '/admin',
    current: false,
  },
  {
    name: 'Clients',
    icon: faUser,
    href: '/admin/clients',
    current: false,
  },
  {
    name: 'Users',
    icon: faUsers,
    href: '/admin/users',
    current: false,
  },
  {
    name: 'View Contractors',
    icon: faUserTie,
    href: '/admin/view-contractors',
    current: false,
  },
  {
    name: 'Outreach',
    icon: faEnvelope,
    href: 'admin/outreach',
    current: false,
    subpages: [
      {
        name: 'Queue',
        icon: faEnvelope,
        href: '/admin/outreach/queue',
        current: false,
      },
      {
        name: 'Campaigns',
        icon: faEnvelope,
        href: '/admin/outreach/campaigns',
        current: false,
      },
      {
        name: 'Legacy Campaigns',
        icon: faEnvelope,
        href: '/admin/outreach/legacy-campaigns',
        current: false,
      },
      {
        name: 'All Contractors',
        icon: faEnvelope,
        href: '/admin/outreach/all-contractors',
        current: false,
      },
    ],
  },
  {
    name: 'Reports',
    icon: faChartBar,
    href: '/admin/reports',
    current: false,
    subpages: [
      {
        name: 'Bookings',
        icon: faCalendar,
        href: '/admin/reports/bookings',
        current: false,
      },
      {
        name: 'Exports',
        icon: faFileExport,
        href: '/admin/reports/exports',
        current: false,
      },
    ],
  },
  {
    name: 'Configure',
    icon: faSliders,
    href: '/admin/configure',
    current: false,
    subpages: [
      {
        name: 'Configuration',
        icon: faSliders,
        href: '/admin/configure/configuration',
        current: false,
      },
      {
        name: 'Masterlist',
        icon: faSliders,
        href: '/admin/configure/masterlist',
        current: false,
      },
      {
        name: 'Custom Questions',
        icon: faSliders,
        href: '/admin/configure/custom-questions',
        current: false,
      },
      {
        name: 'Applications',
        icon: faSliders,
        href: '/admin/configure/applications',
        current: false,
      },
      {
        name: 'Project Type',
        icon: faSliders,
        href: '/admin/configure/project-type',
        current: false,
      },
      {
        name: 'Add Contractor',
        icon: faSliders,
        href: '/admin/configure/add-contractor',
        current: false,
      },
    ],
  },
  {
    name: 'Review',
    icon: faClipboardCheck,
    href: '/admin/review',
    current: false,
  },
  {
    name: 'System',
    icon: faCog,
    href: '/admin/system',
    current: false,
  },
];

export const adminNavigationBottom: NavItem[] = [
  {
    name: 'Settings',
    icon: faCog,
    href: '/admin/settings',
    current: false,
  },
];
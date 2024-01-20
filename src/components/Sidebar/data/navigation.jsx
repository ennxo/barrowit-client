import {
    DocumentCheckIcon,
    UserIcon,
    HomeIcon,
    CalendarDaysIcon,
    CubeIcon,
    TagIcon,
    ArchiveBoxIcon,
    FlagIcon, 
    DocumentTextIcon
} from '@heroicons/react/24/outline'

export const navigation = [
    { name: 'Dashboard', to: '/', icon: HomeIcon, current: true, permission: "user.read" },
    { name: 'Categories', to: '/categories', icon: TagIcon, current: false, permission: "user.read" },
    { name: 'Events', to: '/events', icon: TagIcon, current: false, permission: "user.read" },
    { name: 'Assets', to: '/assets', icon: CubeIcon, current: false, permission: "user.read" },
    { name: 'User Profile', to: '/accounts', icon: UserIcon, current: false, permission: "user.read" },
    { name: "Borrow Request", to: '/reservations', icon: DocumentCheckIcon, current: false, permission: "user.edit" },
    { name: "Returned Assets", to: '/transactions', icon: DocumentCheckIcon, current: false, permission: "user.read" },
    { name: 'Reservation Schedule', to: '/schedules', icon: CalendarDaysIcon, current: false, permission: "user.read" },
    { name: 'Archived Data', to: '/archived', icon: ArchiveBoxIcon, current: false, permission: "user.edit" },
    { name: 'Damage Reports', to: '/reports', icon: FlagIcon, current: false, permission: "user.read" },
    { name: 'Audit Trail', to: '/audits', icon: DocumentTextIcon, current: false, permission: "user.audit"}
]
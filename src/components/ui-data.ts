export interface Menu {
  href: string;
  name: string;
  icon: string;
  as: string;
}

export interface MenuList {
  [key: string]: Menu;
}

export const clientMenu: MenuList = {
  home: {
    href: '/',
    as: '/',
    name: 'Home',
    icon: '',
  },
  about: {
    href: '/about',
    as: '/about',
    name: 'About Us',
    icon: '',
  },
  grid: {
    href: '/grid',
    as: '/grid',
    name: 'Grid',
    icon: '',
  },
  contact: {
    href: '/contact',
    as: '/contact',
    name: 'Contact Us',
    icon: '',
  },
  register: {
    href: '/register',
    as: '/register',
    name: 'Register',
    icon: '',
  },
  admin: {
    href: '/admin',
    as: '/admin',
    name: 'Admin',
    icon: '',
  },
};

export const adminMenu: MenuList = {
  home: {
    href: '/admin',
    as: '/admin',
    name: 'Admin Home',
    icon: '',
  },
  manage: {
    href: '/admin/manage',
    as: '/admin/manage',
    name: 'Manage',
    icon: '',
  },
  back: {
    href: '/',
    as: '/',
    name: 'Back to Client',
    icon: '',
  },
};

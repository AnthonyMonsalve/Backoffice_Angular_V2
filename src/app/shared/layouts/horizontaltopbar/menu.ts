import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'HEADER.REPORTS.TEXT',
    icon: 'trending-up',
    subItems: [
      {
        id: 10001,
        label: 'HEADER.REPORTS.LIST.PAGE',
        link: '/',
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    label: 'HEADER.INSTAPOS.TEXT',
    icon: 'smartphone',
    subItems: [
      {
        id: 20001,
        label: 'HEADER.INSTAPOS.LIST.PAGE',
        link: '/pos/summary',
        parentId: 2,
      },
    ],
  },
  {
    id: 3,
    label: 'HEADER.INSTAWEB.TEXT',
    icon: 'monitor',
    subItems: [
      {
        id: 30001,
        label: 'HEADER.INSTAWEB.LIST.PAGE',
        link: '/web/summary',
        parentId: 3,
      },
    ],
  },
  {
    id: 4,
    label: 'HEADER.INSTACOMERCIO.TEXT',
    icon: 'shopping-cart',
    subItems: [
      {
        id: 40001,
        label: 'HEADER.INSTACOMERCIO.LIST.PAGE',
        link: '/commerce/summary',
        parentId: 4,
      },
    ],
  },
];

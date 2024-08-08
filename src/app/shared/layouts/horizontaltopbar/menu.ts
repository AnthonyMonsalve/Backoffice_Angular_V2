import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'HEADER.REPORTS.TEXT',
    icon: 'trending-up',
    subItems: [
      {
        id: 10001,
        label: 'HEADER.REPORTS.LIST.SUMMARY',
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
        label: 'HEADER.INSTAPOS.LIST.SUMMARY',
        link: '/pos/summary',
        parentId: 2,
      },
      {
        id: 20002,
        label: 'HEADER.INSTAWEB.LIST.COMMERCES',
        link: '/pos/commerces-list',
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
        label: 'HEADER.INSTAWEB.LIST.SUMMARY',
        link: '/web/summary',
        parentId: 3,
      },
      {
        id: 30002,
        label: 'HEADER.INSTAWEB.LIST.COMMERCES',
        link: '/web/commerces-list',
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
        label: 'HEADER.INSTACOMERCIO.LIST.SUMMARY',
        link: '/commerce/summary',
        parentId: 4,
      },
      {
        id: 40002,
        label: 'HEADER.INSTACOMERCIO.LIST.COMMERCES',
        link: '/commerce/commerces-list',
        parentId: 4,
      },
      {
        id: 40003,
        label: 'HEADER.INSTACOMERCIO.LIST.AFFILIATES',
        link: '/commerce/affiliates-list',
        parentId: 4,
      },
    ],
  },
];

import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'HEADER.REPORTS.TEXT',
    isTitle: true,
  },
  {
    id: 2,
    label: 'HEADER.REPORTS.LIST.SUMMARY',
    icon: 'trending-up',
    link: '/',
  },
  {
    id: 3,
    label: 'HEADER.INSTAPRODUCTS.TEXT',
    isTitle: true,
  },
  {
    id: 4,
    label: 'HEADER.INSTAPOS.TEXT',
    icon: 'smartphone',
    subItems: [
      {
        id: 40001,
        label: 'HEADER.INSTAPOS.LIST.SUMMARY',
        link: '/pos/summary',
        parentId: 4,
      },
    ],
  },
  {
    id: 5,
    label: 'HEADER.INSTAWEB.TEXT',
    icon: 'monitor',
    subItems: [
      {
        id: 50001,
        label: 'HEADER.INSTAWEB.LIST.SUMMARY',
        link: '/web/summary',
        parentId: 5,
      },
      {
        id: 50002,
        label: 'HEADER.INSTAWEB.LIST.COMMERCES',
        link: '/web/commerces-list',
        parentId: 5,
      },
    ],
  },
  {
    id: 6,
    label: 'HEADER.INSTACOMERCIO.TEXT',
    icon: 'shopping-cart',
    subItems: [
      {
        id: 60001,
        label: 'HEADER.INSTACOMERCIO.LIST.SUMMARY',
        link: '/commerce/summary',
        parentId: 6,
      },
      {
        id: 60002,
        label: 'HEADER.INSTACOMERCIO.LIST.COMMERCES',
        link: '/commerce/commerces-list',
        parentId: 6,
      },
      {
        id: 60003,
        label: 'HEADER.INSTACOMERCIO.LIST.AFFILIATES',
        link: '/commerce/affiliates-list',
        parentId: 6,
      },
    ],
  },
];

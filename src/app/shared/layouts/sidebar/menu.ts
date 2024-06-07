import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'HEADER.REPORTS.TEXT',
    isTitle: true,
  },
  {
    id: 2,
    label: 'HEADER.REPORTS.LIST.PAGE',
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
    // badge: {
    //   variant: 'orange-instapago',
    //   text: 'MENUITEMS.AUTHENTICATION.BADGE',
    // },
    subItems: [
      {
        id: 40001,
        label: 'HEADER.INSTAPOS.LIST.PAGE',
        link: '/pos/summary',
        parentId: 4,
      },
    ],
  },
  {
    id: 5,
    label: 'HEADER.INSTAWEB.TEXT',
    icon: 'monitor',
    // badge: {
    //   variant: 'orange-instapago',
    //   text: 'MENUITEMS.AUTHENTICATION.BADGE',
    // },
    subItems: [
      {
        id: 50001,
        label: 'HEADER.INSTAWEB.LIST.PAGE',
        link: '/web/summary',
        parentId: 5,
      },
    ],
  },
  {
    id: 6,
    label: 'HEADER.INSTACOMERCIO.TEXT',
    icon: 'shopping-cart',
    // badge: {
    //   variant: 'orange-instapago',
    //   text: 'MENUITEMS.AUTHENTICATION.BADGE',
    // },
    subItems: [
      {
        id: 60001,
        label: 'HEADER.INSTACOMERCIO.LIST.PAGE',
        link: '/commerce/summary',
        parentId: 6,
      },
    ],
  },
];

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
  // {
  //   id: 83,
  //   label: 'HEADER.EXTRAPAGES.TEXT',
  //   icon: 'file',
  //   subItems: [
  //     {
  //       id: 94,
  //       label: 'HEADER.AUTHENTICATION.TEXT',
  //       icon: 'alert-circle',
  //       subItems: [
  //         {
  //           id: 98,
  //           label: 'HEADER.AUTHENTICATION.LIST.SIGNOUT',
  //           link: '/account/signout/basic',
  //           parentId: 94,
  //         },
  //         {
  //           id: 99,
  //           label: 'HEADER.AUTHENTICATION.LIST.LOCKSCREEN',
  //           link: '/account/lockscreen/basic',
  //           parentId: 94,
  //         },
  //         {
  //           id: 100,
  //           label: 'HEADER.AUTHENTICATION.LIST.FORGOTPASSWORD',
  //           link: '/account/forgot-password/basic',
  //           parentId: 94,
  //         },
  //         {
  //           id: 101,
  //           label: 'HEADER.AUTHENTICATION.LIST.RESETPWD',
  //           link: '/account/reset-password/basic',
  //           parentId: 94,
  //         },
  //         {
  //           id: 102,
  //           label: 'HEADER.AUTHENTICATION.LIST.EMAILVERIFICATION',
  //           link: '/account/email-verification/basic',
  //           parentId: 94,
  //         },
  //         {
  //           id: 103,
  //           label: 'HEADER.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
  //           link: '/account/twostep-verification/basic',
  //           parentId: 94,
  //         },
  //         {
  //           id: 104,
  //           label: 'HEADER.AUTHENTICATION.LIST.THANKYOU',
  //           link: '/account/thankyou/basic',
  //           parentId: 94,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

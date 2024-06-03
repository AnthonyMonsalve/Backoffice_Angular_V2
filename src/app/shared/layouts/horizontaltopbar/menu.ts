import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 100,
    label: 'HEADER.REPORTS.TEXT',
    icon: 'trending-up',
    subItems: [
      {
        id: 101,
        label: 'HEADER.REPORTS.LIST.PAGE',
        link: '/',
        parentId: 100,
      },
    ],
  },
  {
    id: 83,
    label: 'HEADER.EXTRAPAGES.TEXT',
    icon: 'file',
    subItems: [
      {
        id: 94,
        label: 'HEADER.AUTHENTICATION.TEXT',
        icon: 'alert-circle',
        subItems: [
          {
            id: 96,
            label: 'HEADER.AUTHENTICATION.LIST.SIGNIN',
            link: '/account/signin/basic',
            parentId: 94,
          },
          {
            id: 97,
            label: 'HEADER.AUTHENTICATION.LIST.SIGNUP',
            link: '/account/signup/basic',
            parentId: 94,
          },
          {
            id: 98,
            label: 'HEADER.AUTHENTICATION.LIST.SIGNOUT',
            link: '/account/signout/basic',
            parentId: 94,
          },
          {
            id: 99,
            label: 'HEADER.AUTHENTICATION.LIST.LOCKSCREEN',
            link: '/account/lockscreen/basic',
            parentId: 94,
          },
          {
            id: 100,
            label: 'HEADER.AUTHENTICATION.LIST.FORGOTPASSWORD',
            link: '/account/forgot-password/basic',
            parentId: 94,
          },
          {
            id: 101,
            label: 'HEADER.AUTHENTICATION.LIST.RESETPWD',
            link: '/account/reset-password/basic',
            parentId: 94,
          },
          {
            id: 102,
            label: 'HEADER.AUTHENTICATION.LIST.EMAILVERIFICATION',
            link: '/account/email-verification/basic',
            parentId: 94,
          },
          {
            id: 103,
            label: 'HEADER.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
            link: '/account/twostep-verification/basic',
            parentId: 94,
          },
          {
            id: 104,
            label: 'HEADER.AUTHENTICATION.LIST.THANKYOU',
            link: '/account/thankyou/basic',
            parentId: 94,
          },
        ],
      },
    ],
  },
];

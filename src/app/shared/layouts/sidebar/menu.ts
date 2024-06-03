import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 100,
    label: 'HEADER.REPORTS.TEXT',
    isTitle: true,
  },
  {
    id: 101,
    label: 'HEADER.REPORTS.LIST.PAGE',
    icon: 'trending-up',
    link: '/',
  },
  {
    id: 21,
    label: 'MENUITEMS.PAGES.TEXT',
    isTitle: true,
  },
  {
    id: 22,
    label: 'MENUITEMS.AUTHENTICATION.TEXT',
    icon: 'user',
    badge: {
      variant: 'orange-instapago',
      text: 'MENUITEMS.AUTHENTICATION.BADGE',
    },
    subItems: [
      {
        id: 24,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
        link: '/account/signin/basic',
        parentId: 22,
      },
      {
        id: 27,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNUP',
        link: '/account/signup/basic',
        parentId: 22,
      },
      {
        id: 30,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNOUT',
        link: '/account/signout/basic',
        parentId: 22,
      },
      {
        id: 33,
        label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
        link: '/account/lockscreen/basic',
        parentId: 22,
      },
      {
        id: 36,
        label: 'MENUITEMS.AUTHENTICATION.LIST.FORGOTPASSWORD',
        link: '/account/forgot-password/basic',
        parentId: 22,
      },
      {
        id: 39,
        label: 'MENUITEMS.AUTHENTICATION.LIST.RESETPWD',
        link: '/account/reset-password/basic',
        parentId: 22,
      },
      {
        id: 42,
        label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
        link: '/account/email-verification/basic',
        parentId: 22,
      },
      {
        id: 45,
        label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
        link: '/account/twostep-verification/basic',
        parentId: 22,
      },
      {
        id: 48,
        label: 'MENUITEMS.AUTHENTICATION.LIST.THANKYOU',
        link: '/account/thankyou/basic',
        parentId: 22,
      },
    ],
  },
];

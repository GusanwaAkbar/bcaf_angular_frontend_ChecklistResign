import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Pengajuan Resign'
  },
  {
    name: 'Pengajuan Resign Baru',
    url: '/pengajuan-resign',
    iconComponent: { name: 'cil-pencil' },


    //bawah adalah notif
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Progress Approval',
    url: '/progress-approval',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    title: true,
    name: 'Bucket Atasan'
  },
  {
    name: 'Form Approval Atasan',
    url: '/approval-atasan',
    iconComponent: { name: 'cil-pencil' }
  },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'headings' },
  //   iconComponent: { name: 'cil-pencil' }
  // },

  {
    name: 'Form Approval Treasury',
    url: '/approval-treasury',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'Form Approval HR Payroll',
    url: '/approval-hrpayroll',
    iconComponent: { name: 'cil-pencil' },

  },


  {
    name: 'Form Approval HRIR',
    url: '/approval-hrir',
    iconComponent: { name: 'cil-pencil' },

  },


  {
    name: 'Form Approval General Services',
    url: '/approval-generalservice',
    iconComponent: { name: 'cil-pencil' },

  },


  {
    name: 'Form Approval HR Service',
    url: '/approval-hrservice',
    iconComponent: { name: 'cil-pencil' },

  },



  {
    name: 'Form Approval Security Admin',
    url: '/approval-securityadmin',
    iconComponent: { name: 'cil-pencil' },

  },


  {
    name: 'Form Approval HR Talent',
    url: '/approval-hrtalent',
    iconComponent: { name: 'cil-pencil' },

  },


  {
    name: 'Form Approval HR Learning',
    url: '/approval-hrlearning',
    iconComponent: { name: 'cil-pencil' },

  },



  {
    name: 'Form Approval Final',
    url: '/approval-finalapproval',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'User Management',
    url: '/admin-usermanagement',
    iconComponent: { name: 'cil-pencil' },

  },
  {
    name: 'Daftar Pengajuan Resign',
    url: '/admin-pengajuanresign',
    iconComponent: { name: 'cil-pencil' },

  },



  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Modal',
        url: '/notifications/modal',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Toast',
        url: '/notifications/toasts',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];

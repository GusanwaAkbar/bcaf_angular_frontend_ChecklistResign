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
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval Treasury',
    url: '/approval-treasury',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval HR Payroll',
    url: '/approval-hrpayroll',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval HRIR',
    url: '/approval-hrir',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval General Services',
    url: '/approval-generalservice',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval HR Service',
    url: '/approval-hrservice',
    iconComponent: { name: 'cil-pencil' },

  },


  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval Security Admin',
    url: '/approval-securityadmin',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval HR Talent',
    url: '/approval-hrtalent',
    iconComponent: { name: 'cil-pencil' },

  },

  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval HR Learning',
    url: '/approval-hrlearning',
    iconComponent: { name: 'cil-pencil' },

  },


  {
    name: 'Bucket Approval',
    title: true
  },
  {
    name: 'Form Approval Final',
    url: '/approval-finalapproval',
    iconComponent: { name: 'cil-pencil' },

  },



  {
    name: 'Buttons',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Select',
        url: '/forms/select',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Range',
        url: '/forms/range',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Input Group',
        url: '/forms/input-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Layout',
        url: '/forms/layout',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Validation',
        url: '/forms/validation',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Charts',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts'
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands',
        icon: 'nav-icon-bullet'
      }
    ]
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
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];

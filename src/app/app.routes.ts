import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pengjuan-resign',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pengajuan-resign',
        loadChildren: () => import('./views/pengajuanresign/pengajuanresign-create/pengajuanresign.module').then((m) => m.PengajuanResignModule)
      },
      {
        path: 'progress-approval',
        loadChildren: () => import('./views/pengajuanresign/pengajuanresign-view/view-pengajuanresign.module').then((m) => m.ViewPengajuanResignModule)
      },
      {
        path: 'approval-atasan',
        loadChildren: () => import('./views/approvalatasan-list/approvalatasan-list.module').then((m) => m.ApprovalAtasanListModule)
      },
      {
        path: 'approval-treasury',
        loadChildren: () => import('./views/approval-treasury-list/approval-treasury-list.module').then((m) => m.ApprovalTreasuryListModule)
      },
      {
        path: 'approval-hrpayroll',
        loadChildren: () => import('./views/approval-hrpayroll-list/approval-hrpayroll-list.module').then((m) => m.ApprovalHRPayrollListModule)
      },
      {
        path: 'approval-hrir',
        loadChildren: () => import('./views/approval-hrir-list/approval-hrir-list.module').then((m) => m.ApprovalHRIRListModule)
      },
      {
        path: 'approval-generalservice',
        loadChildren: () => import('./views/approval-generalservice-list/approval-generalservice-list.module').then((m) => m.ApprovalGeneralServiceListModule)
      },
      {
        path: 'approval-hrservice',
        loadChildren: () => import('./views/approval-hrservice-list/approval-hrservice-list.module').then((m) => m.ApprovalHRServiceListModule)
      },

      {
        path: 'approval-securityadmin',
        loadChildren: () => import('./views/approval-securityadmin-list/approval-securityadmin-list.module').then((m) => m.ApprovalSecurityAdminListModule)
      },

      {
        path: 'approval-hrtalent',
        loadChildren: () => import('./views/approval-hrtalent-list/approval-hrtalent-list.module').then((m) => m.ApprovalHRTalentListModule)
      },

      {
        path: 'approval-hrlearning',
        loadChildren: () => import('./views/approval-hrlearning-list/approval-hrlearning-list.module').then((m) => m.ApprovalHRLearningListModule)
      },


      {
        path: 'approval-finalapproval',
        loadChildren: () => import('./views/approval-finalapproval-list/approval-finalapproval-list.module').then((m) => m.ApprovalFinalApprovalListModule)
      },


      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/pages-routing.module').then((m) => m.PagesRoutingModule)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./views/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

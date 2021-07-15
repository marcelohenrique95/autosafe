
import { LoginComponent } from './demo/pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NewPartnerOutsiteComponent } from './demo/pages/new-partner-outsite/new-partner-outsite.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-user',
        loadChildren: () => import('./demo/pages/list-user/list-user.module').then(m => m.ListUserModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'register-user',
        loadChildren: () => import('./demo/pages/register-user/register-user.module').then(m => m.RegisterUserModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('./demo/pages/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'list-partner',
        loadChildren: () => import('./demo/pages/list-partner/list-partner.module').then(m => m.ListPartnerModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'register-partner',
        loadChildren: () => import('./demo/pages/register-partner/register-partner.module').then(m => m.RegisterPartnerModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-product',
        loadChildren: () => import('./demo/pages/list-product/list-product.module').then(m => m.ListProductModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-branch',
        loadChildren: () => import('./demo/pages/list-branch/list-branch.module').then(m => m.ListBranchModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'register-product',
        loadChildren: () => import('./demo/pages/register-product/register-product.module').then(m => m.RegisterProductModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'buy',
        loadChildren: () => import('./demo/pages/buy/buy.module').then(m => m.BuyModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'myservices',
        loadChildren: () => import('./demo/pages/myservices/myservices.module').then(m => m.MyservicesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'company',
        loadChildren: () => import('./demo/pages/company/company.module').then(m => m.CompanyModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'configuration',
        loadChildren: () => import('./demo/pages/configuration/configuration.module').then(m => m.ConfigurationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'branch',
        loadChildren: () => import('./demo/pages/branch/branch.module').then(m => m.BranchModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'register-services',
        loadChildren: () => import('./demo/pages/register-services/register-services.module').then(m => m.RegisterServicesModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: LoginComponent,
    children: [

    ]
  },

  {
    path: 'new-partner',
    component: NewPartnerOutsiteComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

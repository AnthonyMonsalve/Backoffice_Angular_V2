import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectGuard } from '../core/guards/redirect.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'signout',
    loadChildren: () =>
      import('./signout/signout.module').then((m) => m.SignoutModule),
    canActivate: [RedirectGuard],
  },
  {
    path: 'lockscreen',
    loadChildren: () =>
      import('./lock-screen/lock-screen.module').then(
        (m) => m.LockScreenModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },
  {
    path: 'email-verification',
    loadChildren: () =>
      import('./email-verification/email-verification.module').then(
        (m) => m.EmailVerificationModule
      ),
  },
  {
    path: 'twostep-verification',
    loadChildren: () =>
      import('./twostep-verification/twostep-verification.module').then(
        (m) => m.TwostepVerificationModule
      ),
  },
  {
    path: 'thankyou',
    loadChildren: () =>
      import('./thankyou/thankyou.module').then((m) => m.ThankyouModule),
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

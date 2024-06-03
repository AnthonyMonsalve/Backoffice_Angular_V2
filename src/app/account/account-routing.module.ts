import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'signout',
    loadChildren: () =>
      import('./signout/signout.module').then((m) => m.SignoutModule),
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
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

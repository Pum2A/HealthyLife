import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthGuard } from './guards/auth.guard';
import { HomeComponent } from '../home/components/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  // { path: '**', redirectTo: '/register' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard

  ],

})
export class AuthRoutingModule {}

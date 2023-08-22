import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../components/register/register.component';
import { authReducer } from '../reducers/auth.reducer';
import { AuthEffects } from '../effects/auth.effects';
import { AuthRoutingModule } from '../auth-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from '../components/login/login.component'
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,

  ]
})
export class AuthModule { }

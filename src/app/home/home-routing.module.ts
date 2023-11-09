import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OfferComponent } from './components/offer/offer.component';
import { RulesComponent } from './components/rules/rules.component';
import { AboutComponent } from './components/about/about.component';
import { TrainingDetailsComponent } from './components/training-details/training-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { LoginComponent } from '../auth/components/login/login.component';
import { RegisterComponent } from '../auth/components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'offer', component: OfferComponent
  },

  {
    path: 'rules', component: RulesComponent
  },
  {
    path: 'about', component: AboutComponent

  },

  {
    path:'details/:type', component:TrainingDetailsComponent
  },

  {
path:'payment', component:PaymentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OfferComponent } from './components/offer/offer.component';
import { RulesComponent } from './components/rules/rules.component';
import { AboutComponent } from './components/about/about.component';
import { TrainingDetailsComponent } from './components/training-details/training-details.component';


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


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

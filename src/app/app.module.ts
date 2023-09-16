import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/modules/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment.development';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './home/components/home/home.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { SidebarComponent } from './home/components/sidebar/sidebar.component';
import { OfferComponent } from './home/components/offer/offer.component';
import { PricesComponent } from './home/components/prices/prices.component';
import { RulesComponent } from './home/components/rules/rules.component';
import { AboutComponent } from './home/components/about/about.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TrainingDetailsComponent } from './home/components/training-details/training-details.component';
import { TopbarComponent } from './home/components/topbar/topbar.component';
import { NgOptimizedImage } from '@angular/common'


@NgModule({
  declarations: [AppComponent, HomeComponent, SidebarComponent, OfferComponent, PricesComponent, RulesComponent, AboutComponent, TrainingDetailsComponent, TopbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    ReactiveFormsModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

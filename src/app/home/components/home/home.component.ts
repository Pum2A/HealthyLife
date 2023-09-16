import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>
      <div class="main-container">

        <div class="h1-container">
          <h1>Healthy</h1>
        </div>

        <div class="main-about-us-container">
          <p>
            Welcome to HealthyLife! I am very excited that you are here. Our
            site is the perfect place for anyone passionate about fitness and
            healthy living. Here you will find useful information, workout plans
            and lots of inspiration to help you achieve your health and fitness
            goals.
          </p>
        </div>
        <div class="btn-container">
          <p>Check our Offer</p>
        <button>Check</button>
        </div>
        <div class="main-text-container">
          <div *ngFor="let element of data">
            <div class="img-container">
              <img
              class="block"
              [ngSrc]="element.photo"
              alt="{{ element.information }}"
              lazyLoad
              width="300"
              height="400"
              [routerLink]="['/details', element.details]"
              />
            </div>
            <div class="description-container">
              <p>{{ element.information }}</p>
              <a [routerLink]="['/details', element.details]">Check this plan!</a>
            </div>

            <div class="button-container">
            <button>Buy a workout</button>
          </div>
        </div>
      </div>
      </div>
      `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  data: any[] = [
    {
      photo: 'assets/images/legsPhoto.webp',
      information: 'Legs training plan',
      details: 'legs',
    },
    {
      photo: 'assets/images/armsPhoto.webp',
      information: 'Arms training plan',
      details: 'arms',
    },
    {
      photo: 'assets/images/bicepsPhoto.webp',
      information: 'Biceps training plan',
      details: 'biceps',
    },
    {
      photo: 'assets/images/tricepsPhoto.webp',
      information: 'Triceps training plan',
      details: 'triceps',
    },
    {
      photo: 'assets/images/backPhoto.webp',
      information: 'Back training plan',
      details: 'back',
    },
    {
      photo: 'assets/images/chestPhoto.webp',
      information: 'Chest training plan',
      details: 'chest',
    },
  ];
}

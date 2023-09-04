import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-sidebar></app-sidebar>
    <div class="shopping-card-container">
      <span class="material-symbols-outlined"> shopping_cart </span>
    </div>

    <div class="main-container">
      <div class="h1-container">
        <h1>Hello, this is HealthyLife!</h1>
      </div>
      <div class="main-text-container">
        <p>
          Welcome to HealthyLife! I am very excited that you are here. Our site
          is the perfect place for anyone passionate about fitness and healthy
          living. Here you will find useful information, workout plans and lots
          of inspiration to help you achieve your health and fitness goals.
        </p>
      </div>

      <div class="main-photo-container">
        <div class="photo-blocks" *ngFor="let element of data">
            <img
              class="block"
              [src]="element.photo"
              alt="{{ element.information }}"
            />
            <p>{{ element.information }}</p>
            <a [routerLink]="['/details', element.details]">Check this plan!</a>
          </div>

        </div>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data: any[] = [
    {
      photo: 'assets/images/legsPhoto.webp',
      information: 'Legs training plan',
      details:'legs'
    },
    {
      photo: 'assets/images/armsPhoto.webp',
      information: 'Arms training plan',
      details:'arms'

    },
    {
      photo: 'assets/images/bicepsPhoto.webp',
      information: 'Biceps training plan',
      details:'biceps'

    },
    {
      photo: 'assets/images/tricepsPhoto.webp',
      information: 'Triceps training plan',
      details:'triceps'

    },
    {
      photo: 'assets/images/backPhoto.webp',
      information: 'Back training plan',
      details:'back'

    },
    {
      photo: 'assets/images/chestPhoto.webp',
      information: 'Chest training plan',
      details:'chest'
    },
  ];
}

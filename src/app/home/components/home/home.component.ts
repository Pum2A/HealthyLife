import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.interface';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-home',
  template: `
    <app-topbar> </app-topbar>
    <!-- <app-sidebar></app-sidebar> -->
    <!-- <div class="main-container-shopping-card"> -->

      <!-- <app-shopping-card></app-shopping-card> -->
    <!-- </div> -->
    <div class="main-container">

      <div class="h1-container">
        <h1>HEALTHY</h1>
        </div>

        <div class="main-about-us-container">
          <p>
            Welcome to
            <b>

              Healthy
            </b>
             I am very excited that you are here. Our
            site is the perfect place for anyone passionate about fitness and
            healthy living. Here you will find useful information, workout plans
            and lots of inspiration to help you achieve your health and fitness
            goals.
          </p>
        </div>
        <div class="btn-container" routerLink="/offer" [routerLinkActive]="'active'" >
          <p>Check our offer</p>
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
              <button (click)="addToCart(element)">Buy a workout</button>
              </div>
            </div>
      </div>
      </div>
      <app-footer></app-footer>
      `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  constructor(private cartService: CartService, private JsonDataService: JsonDataService) {}

  isClicked = true;
  isMenuOpen = true;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }





  addToCart(product: Product): void {
    const existingItem = this.cartService.getCartItem(product.id);

    if (existingItem) {
      existingItem.quantity++;
      this.cartService.addToCart({ id: product.id, product: product, quantity: 1 });
    } else {
      // Pobierz dane z lokalnego magazynu
      const jsonData = JSON.parse(localStorage.getItem('offerData'));

      // Znajdź odpowiednią nazwę ćwiczenia na podstawie ID
      const exercise = jsonData.find(item => item.id === product.id);

      if (exercise) {
        product.name = exercise.name;
        this.cartService.addToCart({ id: product.id, product: product, quantity: 1 });
      }
    }
  }


  removeFromCart(product: Product): void {
    // Usuń produkt z koszyka
    this.cartService.removeFromCart(product);
  }






  data: any[] = [
    {
      id:1,
      photo: 'assets/images/legsPhoto.webp',
      information: 'Legs training plan',
      details: 'legs',
    },
    {
      id:2,
      photo: 'assets/images/armsPhoto.webp',
      information: 'Arms training plan',
      details: 'arms',
    },
    {
      id:3,
      photo: 'assets/images/bicepsPhoto.webp',
      information: 'Biceps training plan',
      details: 'biceps',
    },
    {
      id:4,
      photo: 'assets/images/tricepsPhoto.webp',
      information: 'Triceps training plan',
      details: 'triceps',
    },
    {
      id:5,
      photo: 'assets/images/backPhoto.webp',
      information: 'Back training plan',
      details: 'back',
    },
    {
      id:6,
      photo: 'assets/images/chestPhoto.webp',
      information: 'Chest training plan',
      details: 'chest',
    },
  ];



}

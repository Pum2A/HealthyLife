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
      <!-- <div class="h1-container">
        <h1>HEALTHY</h1>
        </div> -->
      <div class="main-description-container">
        <div class="left-site-container">
          <h2>
            <span>Biggest </span>
            <span>Fitness </span>
            <span>Community </span>
          </h2>
          <div class="btn-container">
            <button>COMMUNITY</button>
            <button>STAFF</button>
          </div>
        </div>
        <div class="right-site-container">
          <img
            class="main-image"
            src="../../../../assets/images/test.webp"
            alt=""
          />
        </div>
      </div>

      <div class="offer-container">
        <div class="left-site-container">
          <p>
            <span> Extremly </span>
            <span> Customized </span>
            <span> Workouts </span>
          </p>
          <div class="btn-container">

            <button routerLink="/offer" [routerLinkActive]="'active'">
              Check
            </button>
          </div>
        </div>
        <div class="right-site-container"></div>
      </div>
      <div class="main-text-container">
        <div *ngFor="let element of data">
          <div class="block-container">

             <div [routerLink]="['/details', element.details]">

               {{ element.block }}
               <span [innerHTML]="element.information" class="{{element.details}}"></span>
              </div>




          </div>
          <div class="description-container">
            <a [routerLink]="['/details', element.details]">


                Check


              </a>
              <p class="info-about-p">

                to get more
                <span class="span-block">

                  info about
                </span>
            </p>
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
  constructor(
    private cartService: CartService,
    private JsonDataService: JsonDataService,
  ) {}

  isClicked = true;
  isMenuOpen = true;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  addToCart(product: Product): void {
    const existingItem = this.cartService.getCartItem(product.id);

    if (existingItem) {
      existingItem.quantity++;
      this.cartService.addToCart({
        id: product.id,
        product: product,
        quantity: 1,
      });
    } else {
      // Pobierz dane z lokalnego magazynu
      const jsonData = JSON.parse(localStorage.getItem('offerData'));

      // Znajdź odpowiednią nazwę ćwiczenia na podstawie ID
      const exercise = jsonData.find((item) => item.id === product.id);

      if (exercise) {
        product.name = exercise.name;
        this.cartService.addToCart({
          id: product.id,
          product: product,
          quantity: 1,
        });
      }
    }
  }

  removeFromCart(product: Product): void {
    // Usuń produkt z koszyka
    this.cartService.removeFromCart(product);
  }




  data: any[] = [
    {
      id: 1,
      photo: 'assets/images/legsPhoto.webp',
      information: "30 days\nof\nLegs",
      details: 'legs',
      block: '',
    },
    {
      id: 2,
      photo: 'assets/images/armsPhoto.webp',
      information: 'PUSH\nPULL\nLEGS',
      details: 'arms',
      block: '',
    },
    {
      id: 3,
      photo: 'assets/images/bicepsPhoto.webp',
      information: 'flex\nDAY',
      details: 'biceps',
      block: '',
    },
    {
      id: 4,
      photo: 'assets/images/tricepsPhoto.webp',
      information: 'FBW\nPLAN',
      details: 'triceps',
      block: '',
    },
    {
      id: 5,
      photo: 'assets/images/backPhoto.webp',
      information: '7 days \nof\nARMS',
      details: 'back',
      block: '',
    },
    {
      id: 6,
      photo: 'assets/images/chestPhoto.webp',
      information: 'OLYMPIAN\nTRAINING\nSET',
      details: 'chest',
      block: '',
    },
  ];
}

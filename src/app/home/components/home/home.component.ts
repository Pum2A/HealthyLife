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
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  template: `
    <app-topbar> </app-topbar>
    <div class="primary-header">
      <div class="wrapper">
        <div class="primary-header-content">
          <div class="content-left">
            <div class="content-text">
            <p class="card-message" *ngIf="cardMessage">Added to card!
              <button (click)="closeSuccessMessage()">X</button>
            </p>
              <h2>Biggest 🤾‍♀️</h2>
              <h2>Fitness 🏋</h2>
              <h2>Community 🌍</h2>
              <div class="btn-container">
                <button class="community-btn">COMMUNITY</button>
                <button class="staff-btn">STAFF</button>
              </div>
            </div>
          </div>

          <img
            class="main-image"
            src="../../../../assets/images/test.webp"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="reviews-section">
      <div class="wrapper">
        <div class="grid-columns">

          <div class="h3-container-block">
            <img src="../../../../assets/images/./dollar.png"  alt="" class="block-icon">
            <h3>Extra price</h3>
          </div>
          <div class="h3-container-block">
            <img src="../../../../assets/images/./shield.png"  alt="" class="block-icon">
            <h3>Ultimate Protect</h3>
          </div>
          <div class="h3-container-block">
          <img src="../../../../assets/images/./support.png"  alt="" class="block-icon">

            <h3>24/7 Support</h3>
          </div>
        </div>
        </div>
      </div>
    <div class="second-header">
      <div class="wrapper">
        <h3>Extremly</h3>
        <h3>Customized</h3>
        <h3>Workouts</h3>
        <div class="btn-container-second-wrapper">
          <button
            class="offer-btn"
            routerLink="/offer"
            [routerLinkActive]="'active'"
          >
            CHECK
          </button>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="columns-title-h3">
        <h3>Our sample offer</h3>
        <div class="btn-container">
        <button (click)="filterProductsByCategory('LEGS')" [ngClass]="{'active-button': selectedCategory === 'LEGS'}">LEGS</button>
    <button (click)="filterProductsByCategory('FBW')" [ngClass]="{'active-button': selectedCategory === 'FBW'}">FBW</button>
    <button (click)="filterProductsByCategory('ARMS')" [ngClass]="{'active-button': selectedCategory === 'ARMS'}">ARMS</button>
    <button (click)="resetFilter()" [ngClass]="{'active-button': !selectedCategory}">ALL</button>
        </div>
      </div>
      <div class="grid-even-columns">
        <div class="block" *ngFor="let product of productList">
          <div class="grid-text-all-elements">
            <p
              [innerHTML]="product.name"
              class="grid-column-name"
            ></p>

          </div>
          <div class="info-about-block">
  <div class="a-grid-container">

<a class="a-grid" [routerLink]="['/details', product.details]"> Click here! </a>
</div>

  <p class="info-about-p">Price is: <b>

    {{product.price}}
    $
  </b>
  per/month
  </p>
  <div class="btn-grid-container">

    <button class="btn-grid" (click)="addToCard(product)" (click)="cardNofitication()">
      Add to card
    </button>
  </div>
  </div>
</div>
</div>

      <app-footer></app-footer>

    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  constructor(
    private cartService: CartService,
    private JsonDataService: JsonDataService,
    private product_service: ProductService,
    private router: Router,
    private http: HttpClient,

  ) {}

  isClicked = true;
  isMenuOpen = true;
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  messageTimeout: any;
  cardMessage: boolean = false;
  selectedCategory: string = '';
  productsCount: number = 0;


  filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
    this.product_service.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res.filter(product => product.category === category);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  resetFilter(): void {
    // Usuwa wybraną kategorię, przywracając wszystkie produkty
    this.selectedCategory = '';
    // Pobiera wszystkie produkty ponownie
    this.product_service.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  cardNofitication() {
    this.cardMessage = true;
    this.messageTimeout = setTimeout(() => {
      this.closeSuccessMessage();
    }, 2000);
  }

  closeSuccessMessage() {
    this.cardMessage = false;
  }



  ngOnInit(): void {
    this.product_service.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res
        this.productsCount = this.productList.length + 1;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log('Request Completed');
      },

     })



     this.product_service.loadCart();
     this.products = this.product_service.getProduct();





  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  addToCard(product: any) {
    if(!this.product_service.productInCart(product)) {
      product.quantity = 1;
      this.product_service.addToCart(product);
      this.products = [...this.product_service.getProduct()];
      this.subTotal = product.price
    }


  }

  removeFromCart(product: any) {
    this.product_service.removeProduct(product)
    this.products = this.product_service.getProduct();
  }



  changeSubTotal(product: any, index: any) {

    const qnt = product.quantity;
    const amt = product.price;

    this.subTotal = qnt * amt;

    this.product_service.saveCart();

  }

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price
      }),
      {qunatity: 1, price: 0}
      ).price

  }

  checkout() {
    localStorage.setItem('cart_total', JSON.stringify(this.total));
    this.router.navigate(['/payment'])
  }


}

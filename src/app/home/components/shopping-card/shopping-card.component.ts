import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart.interface';
import { Product } from '../../interfaces/product.interface';
import { JsonDataService } from '../../services/json-data.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-card',
  styleUrls: ['./shopping-card.component.scss'],
  template: `
    <div class="container" @sidebarTrigger>
      <div class="shopping-card-details-container">
        <div class="wrapper">
          <div class="main-content">



            <div class="content-box" *ngFor="let product of products; let i = index">
              <div class="wrapper-text">

                <p class="product-name">
                  {{product?.name}}
                </p>
              <div class="quantity-container">

                <span>Total: {{product.quantity * product?.price | number :'1.2-2'}} $</span>
                <input type="number" min="1" value="1" name="" [(ngModel)]="product.quantity" [ngModelOptions]="{standalone: true}" (change)="changeSubTotal(product, 1)">
              </div>
              <div class="buttons-container">

                <button (click)="removeFromCart(product)" class="remove-btn">Remove</button>
              </div>



            </div>
          </div>
          <p class="price-text">Total price: {{total | currency}}</p>
          <button (click)="checkout()" class="checkout-btn">Checkout</button>

          </div>
          </div>


      </div>
    </div>
  `,
  animations: [
    trigger('sidebarTrigger', [
      // To add a cool "enter" animation for the sidebar
      transition(':enter', [
        style({ transform: 'translateX(50%)' }),
        animate('300ms ease', style({ transform: 'translateY(0%)' })),
      ]),

      // To define animations based on trigger actions
      state('open', style({ transform: 'translateX(-100%)' })),
      state('close', style({ transform: 'translateX(-100%)' })),
      transition('open => close', [animate('300ms ease')]),
      transition('close => open', [animate('300ms ease')]),
    ]),
  ],
})
export class ShoppingCardComponent implements OnInit {
  cartItems: CartItem[] = [];
  offerData: any[] = [];

  constructor(
  private product_service: ProductService,
  private router: Router,

  ) {}

  public addToCartClickCount: number = 0;
  isMenuOpen = false;
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  totalPrice: number = 0;




  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }






  ngOnInit(): void {
    this.product_service.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res
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

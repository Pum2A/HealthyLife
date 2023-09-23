import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart.interface';
import { Product } from '../../interfaces/product.interface';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-shopping-card',
  styleUrls: ['./shopping-card.component.scss'],
  template: `
    <div class="container">
      <span id="cart-icon" class="material-symbols-outlined">
        shopping_cart
      </span>
      <div class="shopping-card-details-container">
        <div class="header-text-container">
          <p>YOUR ITEMS ({{ cartItems.length }})</p>
        </div>
        <div class="main-text-container" *ngFor="let item of cartItems">
          <p>{{ item.product.name }}</p>
          <p>Ilość: {{ item.quantity }}</p>
          <button (click)="removeFromCart(item)">Usuń</button>

        </div>

        <div class="footer-text-container">
          <p>YOUR PRICE IS:</p>
        </div>
      </div>
    </div>
  `,
})
export class ShoppingCardComponent implements OnInit {
  cartItems: CartItem[] = [];
  offerData: any[] = [];

  constructor(
    private cartService: CartService,
    private JsonDataService: JsonDataService,

    ) {}
    public addToCartClickCount: number = 0;

    removeFromCart(item: CartItem): void {
      // Tutaj umieść logikę usuwania elementu z koszyka
      this.cartService.removeFromCart(item.product);
    }

    addToCart(product: Product): void {
      // Dodaj produkt do koszyka
      this.cartService.addToCart({ id: product.id, product: product, quantity: 1 });
    }

    ngOnInit(): void {

      // Sprawdź, czy dane oferty są już w `localStorage`
      const storedOfferData = localStorage.getItem('offerData');
      if (storedOfferData) {
        // Jeśli są, wczytaj je
        const offerData = JSON.parse(storedOfferData);
        this.JsonDataService.setOfferData(offerData);
      } else {
        // Jeśli nie ma ich w `localStorage`, pobierz dane oferty z serwisu HTTP
        this.JsonDataService.getOfferData().subscribe((data) => {
          // Zapisz dane oferty w `JsonDataService`
          this.JsonDataService.setOfferData(data);
          // Zapisz dane oferty również w `localStorage`
          localStorage.setItem('offerData', JSON.stringify(data));
        });
      }

      // Wczytaj koszyk z `localStorage`
      this.cartService.loadCartFromLocalStorage(); // Odczytaj koszyk z localStorage
  this.cartItems = this.cartService.getCart();
    }





}

import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private offerData: any[] = [];

  constructor() {
    this.loadCartFromLocalStorage(); // Ładujemy dane z localStorage przy inicjalizacji serwisu
  }

  setOfferData(data: any[]): void {
    this.offerData = data;
    this.saveCartToLocalStorage();
  }

  getOfferData(): any[] {
    return this.offerData;
  }

  loadCartFromLocalStorage(): void {
    const cartData = localStorage.getItem('cart');
    console.log('Cart data from LocalStorage:', cartData); // Dodaj ten log
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++; // Zwiększ ilość, jeśli produkt już istnieje w koszyku
    } else {
      this.cart.push(item); // Dodaj nowy produkt do koszyka
    }

    this.saveCartToLocalStorage(); // Zapisz koszyk do localStorage po każdej zmianie
  }

  getCartItem(planId: number): CartItem | undefined {
    return this.cart.find((item) => item.id === planId);
  }

  removeFromCart(product: Product): void {
    const index = this.cart.findIndex(item => item.product.id === product.id);

    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1);
      }
    }

    this.saveCartToLocalStorage(); // Tutaj zapisujemy koszyk w localStorage po każdej zmianie
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}

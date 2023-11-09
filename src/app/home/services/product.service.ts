import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  private cartItemsCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCountSubject.asObservable();



  constructor(private http: HttpClient) {
    this.loadCart();
  }

  getAllProducts() {
    return this.http.get('../../../assets/data/offer.json')
  }

  getProduct() {
    return this.products
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.products))
  }

  addToCart(addedProduct: any){

    this.products.push(addedProduct);

    this.saveCart();

    this.cartItemsCountSubject.next(this.products.length); // Aktualizuj liczbę produktów w koszyku

  }

  getCartItemsCount(): number {
    return this.products.reduce((sum, product) => sum + product.quantity, 0);  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];

  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)
    if(index > -1) {
      this.products.splice(index, 1);
      this.saveCart()
    }

  }


  clearProducts() {
    localStorage.clear()
  }


}




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { JsonDataService } from '../../services/json-data.service';
import { Product } from '../../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-offer',
  template: `
    <app-topbar></app-topbar>
    <div class="main-background">
      <div class="h2-container">
        <h2>OUR OFFER</h2>
      </div>
      <div class="main-content-container">
        <div class="main-content">
          <div class="items-content" *ngFor="let item of offerData" >
          <h3>{{ item.name }}</h3>
  <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  trainingType: string | null = null;
  product: Product;

  offerData: Product[] = []; // Przechowuje dane oferty jako tablicę produktów

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private JsonDataService: JsonDataService,
    private JsonData: HttpClient,
  ) {}

  ngOnInit(): void {
    // Wywołaj metodę getOfferData z serwisu JsonDataService
    this.JsonDataService.getOfferData().subscribe((data) => {
      this.offerData = data; // Przypisz dane oferty do offerData
      console.log(data)
    });
  }


}

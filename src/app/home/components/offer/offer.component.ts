import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { JsonDataService } from '../../services/json-data.service';
import { Product } from '../../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { select } from '@ngrx/store';
@Component({
  selector: 'app-offer',
  template: `
    <app-topbar></app-topbar>
    <div class="wrapper">
      <div class="columns-title-h3">
        <h3>The Bestsellers</h3>
      </div>
      <div class="grid-even-columns ">
        <ng-container *ngFor="let item of offerData"  >
          <ng-container>

            <div class="test">


              <div class="block">

                <div class="offer-name-container" >

                  <h2 class="offer-name">{{ item.name }}</h2>
                </div>
      <div class="offer-description-container">

        <p class="offer-description">{{ item.description }}</p>
      </div>

      <div class="btn-grid-container">
        <button class="btn-grid" routerLink="/home">Join</button>
      </div>
    </div>
  </div>
</ng-container>
  </ng-container>
        </div>
        <div class="more-info-container">
      <button routerLink="/home">MORE INFO</button>
    </div>

      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  trainingType: string | null = null;
  product: Product;
  date = new Date();

  offerData: Product[] = []; // Przechowuje dane oferty jako tablicę produktów

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private JsonDataService: JsonDataService,
    private JsonData: HttpClient,
  ) {}
  isLegsVisible: boolean = true;
  selectedCategory: string = 'all';

  changeCategory(category: string) {
    console.log('Selected Category before change:', this.selectedCategory);
    this.selectedCategory = category;
    console.log('Selected Category after change:', this.selectedCategory);
}




  ngOnInit(): void {
    // Wywołaj metodę getOfferData z serwisu JsonDataService
    this.JsonDataService.getOfferData().subscribe((data) => {
      this.offerData = data; // Przypisz dane oferty do offerData
      console.log('Offer Data:', this.offerData);
    });
  }
}

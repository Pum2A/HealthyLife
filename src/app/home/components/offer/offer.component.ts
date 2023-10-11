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
      <div class="margin">
        <div class="head-container-second">
          <div class="h2-container">
            <h2>
              <span> Check </span>
              <span> Now </span>
              <span>Our offer!</span>
            </h2>
          </div>
          <div class="img-container">

            <img src="../../../../assets/images/armsPhoto.webp" alt="" />
          </div>
        </div>
        <div class="main-content-container">
          <div class="head-container">
            <div class="h3-container">
              <h3>
                <span>Offer List</span>
              </h3>
              <p>(offer for {{ date | date: 'dd-MM-y' }})</p>
            </div>
          </div>
          <div class="main-container">
            <div class="main-content">
              <div class="items-content" *ngFor="let item of offerData ">
                <h4 >{{ item.name }} </h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="more-info-container">

          <button routerLink="/home">MORE INFO</button>
        </div>
      </div>
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

  ngOnInit(): void {
    // Wywołaj metodę getOfferData z serwisu JsonDataService
    this.JsonDataService.getOfferData().subscribe((data) => {
      this.offerData = data; // Przypisz dane oferty do offerData
      console.log(data);
    });
  }
}

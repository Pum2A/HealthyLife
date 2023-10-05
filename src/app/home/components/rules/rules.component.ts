import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { JsonDataService } from '../../services/json-data.service';
import { Product } from '../../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rules',
  template:`
  <app-topbar></app-topbar>
  <div class="main-background">
      <div class="h2-container">
        <h2>RULES</h2>
      </div>
      <div class="main-content-container">
        <div class="main-content">
          <div class="items-content">
            <p>By accessing or using the HealthyLife website and its services, you agree to comply with and be bound by these Terms of Service.</p>
            <p>You must be 18 years or older to use our services. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You are solely responsible for any activity related to your account.</p>
            <p>HealthyLife provides training plans for informational purposes only. Consult a healthcare professional before starting any new fitness program. HealthyLife is not responsible for any injuries or health issues resulting from the use of our training plans.</p>
            <p>All content and materials available on HealthyLife, including but not limited to text, graphics, website name, code, images, and logos, are the intellectual property of HealthyLife and are protected by applicable copyright and trademark law.</p>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent {
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

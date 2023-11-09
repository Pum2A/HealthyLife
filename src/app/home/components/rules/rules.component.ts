import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { JsonDataService } from '../../services/json-data.service';
import { Product } from '../../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rules',
  template: ` <app-topbar></app-topbar>
    <div class="main-background">
      <div class="wrapper">
      <div class="grid-columns">

        <div class="header-container">

          <h2>Terms of Use</h2>

        </div>

      </div>
      <div class="wrapper">
        <div class="main-grid-column">
         <div class="main-content-block">
          <h3>Membership Responsibilities:</h3>
          <ul>
            <li>You must be at least 18 years old to become a member of FitLife.
              You are responsible for maintaining the confidentiality of your account information, including your password. Any activities that occur under your account are your responsibility.
            </li>
          </ul>
         </div>
         <div class="main-content-block">
          <h3>Respect Our Community:</h3>
          <ul>
            <li>Be respectful and supportive of fellow members.
Do not engage in any form of bullying, discrimination, or harassment.
            </li>
          </ul>
         </div>
         <div class="main-content-block">
          <h3>Content Usage:</h3>
          <ul>
            <li>You may not use our platform to upload, post, or share any content that is illegal, offensive, or violates copyright laws.
FitLife reserves the right to remove any content that violates these guidelines.
            </li>
          </ul>
         </div>
         <div class="main-content-block">
          <h3>Safety First:</h3>
          <ul>
            <li>Consult with a healthcare provider before starting any new fitness or nutrition program.
Follow all safety instructions provided by our trainers and instructors during classes and workouts.
            </li>
          </ul>
         </div>
         <div class="main-content-block">
          <h3>Payment and Refunds:</h3>
          <ul>
            <li>Membership fees are non-refundable unless otherwise specified in writing.
FitLife reserves the right to change membership fees upon a 30-day notice posted on our website.
            </li>
          </ul>
         </div>
         <div class="main-content-block">
          <h3>Termination of Membership:</h3>
          <ul>
            <li>FitLife reserves the right to terminate your membership at any time if you violate our Terms of Use.
You may cancel your membership at any time by following the instructions on our website.
            </li>
          </ul>
         </div>
      </div>
        </div>
        </div>
        </div>
    <footer>

      <app-footer></app-footer>
    </footer>
    `,
  styleUrls: ['./rules.component.scss'],
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
      console.log(data);
    });
  }
}

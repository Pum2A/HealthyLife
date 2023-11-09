import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProductService } from '../../services/product.service';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  template:`
<div class="menu-btn-container">
  <div class="logo" routerLink="/home">HEAL
    <div class="logo-second-color">


      THY

    </div>

  </div>
  <nav>
    <ul>
      <li><a routerLink="/home" [routerLinkActive]="'active'">Home</a></li>
      <li><a routerLink="/offer" [routerLinkActive]="'active'">Offer</a></li>
      <li><a routerLink="/rules" [routerLinkActive]="'active'">Rules</a></li>
      <li><a routerLink="/about" [routerLinkActive]="'active'">About</a></li>
      <li><a routerLink="/logout" [routerLinkActive]="'active' " (click)="logout()">Logout</a></li>
    </ul>
  </nav>

<!-- <span id="menu" class="material-symbols-outlined" (click)="toggleMenu()">menu</span> -->
<!-- <span id="shoppingCard" class="material-symbols-outlined" (click)="toggleShoppingCardMenu()">shopping_cart</span> -->
<i id="menu" class="fa-solid fa-bars"  (click)="toggleMenu()"></i>
<div class="shopping-card-container">

  <i id="shoppingCard" class="fa-solid fa-cart-shopping" (click)="toggleShoppingCardMenu()">

    <p class="items-count">{{productService.getCartItemsCount()}}</p>
    </i>
</div>

    </div>
    <div class="test" *ngIf="!isClickedShop">

      <app-shopping-card></app-shopping-card>
    </div>
<div class="sidebar-container"  [@slideInOut]="menuState">
<div class="close-btn-container">

</div>

<a routerLink="/home" [routerLinkActive]="'active'">
<span class="material-symbols-outlined">
home
</span>
Home

</a>
<a routerLink="/offer" [routerLinkActive]="'active'">
<span class="material-symbols-outlined">
check_box
</span>
Offer

</a>
<a routerLink="/rules" [routerLinkActive]="'active'">
<span class="material-symbols-outlined">
payments
</span>
Prices
</a>
<a routerLink="/about" [routerLinkActive]="'active'">
<span class="material-symbols-outlined">
gavel
</span>
Rules

</a>
<a (click)="logout()">
<span class="material-symbols-outlined">
logout
</span>
Logout</a>



</div>

  `,
  styleUrls: ['./topbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0%, 20%, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 20%, 0)'
      })),
      transition('in => out', animate('250ms ease-out')),
      transition('out => in', animate('250ms ease-in'))
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  constructor(public productService: ProductService, private logoutService: LogoutService, private router: Router) {}
  isClicked = true;
  isClickedShop = true;
  cartItemsCount: number = 0;

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userData');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }

  goToLogin(): void {
    // Przekieruj użytkownika na stronę logowania
    this.router.navigate(['/login']);
  }


  toggleShoppingCardMenu(){
    this.isClickedShop = !this.isClickedShop;

  }


  menuState:string = 'out';

  toggleMenu(){
    this.isClicked = !this.isClicked;

    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnInit(): void {
    this.productService.cartItemsCount$.subscribe(count => {
      this.cartItemsCount = count;
    });
  }
}

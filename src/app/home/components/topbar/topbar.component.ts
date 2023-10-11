import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-topbar',
  template:`
<div class="menu-btn-container">
  <div class="logo" routerLink="/home">HEALTHY</div>
  <nav>
    <ul>
      <li><a routerLink="/home" [routerLinkActive]="'active'">Home</a></li>
      <li><a routerLink="/offer" [routerLinkActive]="'active'">Offer</a></li>
      <li><a routerLink="/rules" [routerLinkActive]="'active'">Rules</a></li>
      <li><a routerLink="/about" [routerLinkActive]="'active'">About</a></li>
      <li><a routerLink="/logout" [routerLinkActive]="'active'">Logout</a></li>
    </ul>
  </nav>
<span id="menu" class="material-symbols-outlined" (click)="toggleMenu()">
  menu
</span>
<span id="shoppingCard" class="material-symbols-outlined" (click)="toggleShoppingCardMenu()">
        shopping_cart
      </span>

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
<a routerLink="/prices" [routerLinkActive]="'active'">
<span class="material-symbols-outlined">
payments
</span>
Prices
</a>
<a routerLink="/rules" [routerLinkActive]="'active'">
<span class="material-symbols-outlined">
gavel
</span>
Rules

</a>
<a routerLink="/about" [routerLinkActive]="'active'">
<span class="material-symbols-outlined">
info
</span>
About us

</a>
<a >
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
export class TopbarComponent {
  isClicked = true;
  isClickedShop = true;
  toggleShoppingCardMenu(){
    this.isClickedShop = !this.isClickedShop;

  }


  menuState:string = 'out';

  toggleMenu(){
    this.isClicked = !this.isClicked;

    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}

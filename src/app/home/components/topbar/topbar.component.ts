import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-topbar',
  template:`
<div class="menu-btn-container">

<span class="material-symbols-outlined" (click)="toggleMenu()">
  menu
</span>
<span id="shoppingCard" class="material-symbols-outlined">
        shopping_cart
      </span>
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
        transform: 'translate3d(0%, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('250ms ease-out')),
      transition('out => in', animate('250ms ease-in'))
    ]),
  ],
})
export class TopbarComponent {
  isClicked = true;




  menuState:string = 'out';

  toggleMenu(){
    this.isClicked = !this.isClicked;

    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}

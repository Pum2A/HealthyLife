import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-sidebar',
  template:`

    <div class="menu-btn-container">

      <div class="logo">
        <a [routerLink]="''">

          HL
        </a>

      </div>
      <span class="material-symbols-outlined" (click)="toggleMenu()">
        menu
      </span>
    </div>
  <div class="sidebar-container" *ngIf="isClicked" [@slideInOut]="menuState">
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
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('in => out', animate('250ms ease-out')),
      transition('out => in', animate('250ms ease-in'))
    ]),
  ]

})
export class SidebarComponent {


  isClicked = true;

  isClickedMenu() {
    this.isClicked = !this.isClicked;
    console.log('click');
  }


  menuState:string = 'out';

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

}

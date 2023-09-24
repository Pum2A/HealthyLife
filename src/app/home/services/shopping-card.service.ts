import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor() { }
  private isCardVisible = new BehaviorSubject<boolean>(false);

  toggleCardVisibility(): void {
    this.isCardVisible.next(!this.isCardVisible.value);
  }

  getCardVisibility(): Observable<boolean> {
    return this.isCardVisible.asObservable();
  }


}

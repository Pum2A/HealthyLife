import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class JsonDataService {
  private offerData: any[] = []; // Prywatna zmienna do przechowywania danych oferty

  private offerUrl = '../../../assets/data/offer.json'; // Ścieżka do pliku JSON z danymi oferty

  constructor(private http: HttpClient) {} // Wstrzykuj HttpClient do komunikacji HTTP

  getOfferData(): Observable<any[]> {
    // Wykonaj zapytanie HTTP do pliku JSON i zwróć dane jako Observable
    return this.http.get<any[]>(this.offerUrl);
  }

  setOfferData(data: any[]): void {
    // Ustaw dane oferty w usłudze
    this.offerData = data;
  }

  getStoredOfferData(): any[] {
    // Pobierz dane oferty z usługi
    return this.offerData;
  }

}

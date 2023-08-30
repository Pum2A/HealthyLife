import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Użyj klucza 'user' zamiast 'token'

    console.log('Stored user:', storedUser);
    console.log('returnUrl:', state.url);

    if (storedUser) { // Sprawdź, czy storedUser istnieje
      return true;
    } else {
      console.log('Redirecting to login');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}

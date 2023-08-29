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
    const isAuthenticated = !!localStorage.getItem('token'); // Sprawdź, czy istnieje token w localStorage

    if (isAuthenticated) {
      return true; // Pozwól na dostęp, jeśli użytkownik jest zalogowany
    } else {
      // Przekieruj użytkownika do strony logowania z zachowaniem URL, który próbował odwiedzić
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}

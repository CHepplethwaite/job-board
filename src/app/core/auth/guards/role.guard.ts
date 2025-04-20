import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = next.data['role'];
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user && user.role === expectedRole) {
          return true;
        }
        if (user) {
          // Redirect to dashboard or appropriate page based on role
          return this.router.createUrlTree([`/${user.role}/dashboard`]);
        }
        return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
      })
    );
  }
}
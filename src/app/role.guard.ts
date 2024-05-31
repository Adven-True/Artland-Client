import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDataString = localStorage.getItem("userdata");
    if (userDataString) {

      const userData = JSON.parse(userDataString);
      const requiredRole = route.data['meta'].auth; // obtain roles defined in routing metadata
      if (userData.username === 'admin' && requiredRole === 'user') {
        // if the user is an administrator, but the permissions is not
        this.router.navigate(['/404']);
        return false;
      } else if (userData.username != 'admin' && requiredRole === 'admin') {
        // if the user is not an administrator, but the permissions is administrator
        this.router.navigate(['/404']);
        return false;
      } else {
        return true;
      }
    } else {
      // if has not logined in and there is data value, redirected to the login page or an error message will be displayed
      console.log(route.data)
      return false;
      if (route.data) {
        this.router.navigate(['/account/login']);
        return false;
      } else {
        return true
      }

    }
  }
}
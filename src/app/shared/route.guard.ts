import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard {
  constructor(private router: Router) {     
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      debugger
      if(localStorage.getItem('authToken') === null){
        return true;
      }else{
        this.router.navigate(['/'])
        return false;
      }
  }
  
}

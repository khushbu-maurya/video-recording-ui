import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CameraAuthGuard {
  constructor(private router: Router) {     
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('link') !== null){
        return true;
      }else{
        this.router.navigate(['/'])
        return false;
      }
  }
  
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GuardpasarGuard implements CanActivate {

  constructor(private afauth : AngularFireAuth,
              private router : Router ){ 

  }

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.afauth.authState.pipe(map( auth => {

        if(auth === null){
          return true;
        } else {
          this.router.navigate(['/myaccount']);
          return false;
        }
          
        } ))

    
  }
  
}

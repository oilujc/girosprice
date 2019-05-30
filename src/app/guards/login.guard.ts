import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
   public response: boolean;
   
   constructor(private storage: Storage, private router: Router) { }

   canActivate(){
    this.storage.get("user").then((response) => {
     if (response == null) {
       this.router.navigate(['/login']);
     }
       this.response = true;
     }).catch( err => {
       console.log(err.message);
     });
  	return this.response;
  }
}

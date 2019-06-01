import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ApiGirosappService } from '../services/api-girosapp.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
   
   constructor(private apiService: ApiGirosappService, private router: Router) { }

   canActivate(){
    let userAuthenticated = this.apiService.isAuthenticated();
    if (userAuthenticated) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}

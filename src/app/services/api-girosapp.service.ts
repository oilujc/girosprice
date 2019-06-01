import { Injectable } from '@angular/core';
import { apiGirosApp } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ToastController, Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGirosappService {


  authState = new BehaviorSubject(false);

  constructor(private http: HttpClient, 
              private storage: Storage, 
              private router: Router,
              private platform: Platform,
              ) { 
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('user').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(username: string, password: string) {
  	this.http.post<any>(`${apiGirosApp.url}token/`, 
  		{ "username": username, "password": password},
  		{headers: {"Content-Type": "application/json"}})
  	.subscribe((data) => {

      this.storage.set("user", {"token": data.token}).then(()=>{
      	this.router.navigate(["/tabs/home"]);
        this.authState.next(true);
      });

    }, error => {
      console.log(error.error);
   });
  }

  logout() {
  	this.storage.remove("user")
  	.then(()=>{
  		console.log("logout success!");
  		this.router.navigate(['/login']);
      this.authState.next(false);
  	});
  }

  getBtcPrices(user, action) {
  	return this.http.get<any>(`${apiGirosApp.url}btc-list/${action}`,
  		{headers: { 'Authorization': "JWT "+ user}});
  }

  getBtcPricesDetail(user, action, id) {
    return this.http.get<any>(`${apiGirosApp.url}btc-list/${action}/${id}`,
      {headers: { 'Authorization': "JWT "+ user}});
  }

  isAuthenticated() {
    return this.authState.value;
  }
}

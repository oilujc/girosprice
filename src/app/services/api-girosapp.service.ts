import { Injectable } from '@angular/core';
import { apiGirosApp } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ApiGirosappService {

  private user:any;


  constructor(private http: HttpClient, private storage: Storage, private router: Router) { }

  userIsAuthenticated() {
    this.user = this.storage.get("user").then((response) => {
      console.log(response);
      return response.token;
    }).catch(err => console.log(err.message));
    return this.user;
  }

  login(username: string, password: string) {
  	this.http.post<any>(`${apiGirosApp.url}token/`, 
  		{ "username": username, "password": password},
  		{headers: {"Content-Type": "application/json"}})
  	.subscribe((data) => {

      this.storage.set("user", {"token": data.token}).then(()=>{
      	this.router.navigate(["/tabs/home"]);
      }).catch(err=>console.log(err.message));

    }, error => {
      console.log(error.error);
   });
  }

  logout() {
  	this.storage.remove("user")
  	.then(()=>{
  		console.log("logout success!");
  		this.router.navigate(['/login']);
  	})
  	.catch((err)=>console.log(err.message));
  }

  getBtcPrices(user, action) {
  	return this.http.get<any>(`${apiGirosApp.url}btc-list/${action}`,
  		{headers: { 'Authorization': "JWT "+ user}});
  }

  getBtcPricesDetail(user, action, id) {
    return this.http.get<any>(`${apiGirosApp.url}btc-list/${action}/${id}`,
      {headers: { 'Authorization': "JWT "+ user}});
  }
}

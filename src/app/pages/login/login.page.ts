import { Component, OnInit } from '@angular/core';

import { ApiGirosappService } from '../../services/api-girosapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username:string;
  private password:string;

  constructor(private apiService: ApiGirosappService) { }

  ngOnInit() {
  }

  loginUser(){
  	this.apiService.login(this.username, this.password);
  }

}

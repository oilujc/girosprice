import { Component, OnInit } from '@angular/core';
import { ApiGirosappService } from '../../services/api-girosapp.service';
import { Storage } from '@ionic/storage';
import { BtcPrices } from '../../interfaces/btc-prices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   public prices: BtcPrices[];
   private activeAction: string;
   private user:any;
  constructor(private apiService: ApiGirosappService, private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.user = this.apiService.userIsAuthenticated();
   console.log(this.user);
  }

  getBtcPrices(event) {

    this.storage.get("user").then( user => {
      if (user != null) {
        this.apiService.getBtcPrices(user.token, event.detail.value).subscribe( (data) => {
          this.activeAction = event.detail.value;
          this.prices = data;
        });
      }
    }).catch(err => console.log(err));
  }

  redirectPage(idParam) {
    this.router.navigateByUrl(`/btc-detail/${this.activeAction}/${idParam}`);
  }

  logout(){
  	this.apiService.logout();
  }
}

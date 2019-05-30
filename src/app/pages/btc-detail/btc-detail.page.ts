import { Component, OnInit } from '@angular/core';
import { ApiGirosappService } from '../../services/api-girosapp.service';
import { Storage } from '@ionic/storage';
import { BtcPrices } from '../../interfaces/btc-prices'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-btc-detail',
  templateUrl: './btc-detail.page.html',
  styleUrls: ['./btc-detail.page.scss'],
})
export class BtcDetailPage implements OnInit {
	private action: string = "";
	private id: string = "";
	private price: BtcPrices;
	private btcDetailQuantity: number = 1;

  constructor(private apiService: ApiGirosappService, private storage: Storage, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.action = this.activatedRoute.snapshot.paramMap.get('action');
  	this.id = this.activatedRoute.snapshot.paramMap.get('id');
  	this.getPrice();
  }

  getPrice() {
  	this.storage.get("user").then( user => {
      if (user != null) {
        this.apiService.getBtcPricesDetail(user.token, this.action, this.id).subscribe( (data) => {
          this.price = data;
        });
      }
    }).catch(err => console.log(err));
  }

}

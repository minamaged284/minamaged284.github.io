import { Component } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { PaymentServiceService } from '../payment-service.service';
import { AllOrdersInterface, CartItem } from '../all-orders-interface';
import { CartItemInterface } from '../cart-item-interface';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {

  _cartitems:CartItemInterface[]=[];
  _orders:AllOrdersInterface[]=[];
  userId:any='';
  constructor(private _CartServiceService:CartServiceService, private _PaymentServiceService:PaymentServiceService){}

  ngOnInit(): void {

    this.userId=localStorage.getItem('userId');

    this._PaymentServiceService.allOrdersAPI(this.userId).subscribe({
      next:(res)=>{this._orders=res;
        
      },
      error:(err)=>{console.log(err)},
      complete:()=>{}
    })




  }

}

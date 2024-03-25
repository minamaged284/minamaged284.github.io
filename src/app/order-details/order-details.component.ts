import { Component } from '@angular/core';
import { PaymentServiceService } from '../payment-service.service';
import { ActivatedRoute } from '@angular/router';
import { CartItemInterface } from '../cart-item-interface';
import { CartItem, AllOrdersInterface } from '../all-orders-interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  
  _orders:AllOrdersInterface={
    taxPrice:0,
    shippingPrice:0,
    totalOrderPrice:0,
    paymentMethodType:'',
    isPaid:false,
    isDelivered:false,
    _id:'',
    paidAt:'',
    createdAt:'',
    updatedAt:'',
    id:'',
    __v:0,
  };

id:string='';
userId:string=''
constructor(private _PaymentServiceService:PaymentServiceService,private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((par)=>{this.id=par['id'];})
    this._ActivatedRoute.params.subscribe((par)=>{this.userId=par['userId'];})

  


    this._PaymentServiceService.allOrdersAPI(this.userId).subscribe({
      next:(res)=>{
        this._orders=res.filter((par:AllOrdersInterface)=>{return par.id==(this.id)})[0];
        console.log(this._orders)
        

      },
      error:(err)=>{console.log(err)},
      complete:()=>{}
    })
}



}
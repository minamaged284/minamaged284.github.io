import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddress } from './shipping-address';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PaymentServiceService {
  baseURL : string = `https://ecommerce.routemisr.com`;

  constructor(private _HttpClient:HttpClient) { }

  allOrdersAPI(userId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${userId}?url=https://minamaged284.github.io`)
  }
  onlinePaymentAPI(cartId:string,_shippingAddress:ShippingAddress):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=https://minamaged284.github.io`,_shippingAddress)
  }


}

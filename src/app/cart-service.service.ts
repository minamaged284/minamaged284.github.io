import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
totalItems:BehaviorSubject<any>=new BehaviorSubject(localStorage?.getItem('numInCart'));
  cartToken:any={
    token:localStorage.getItem('uToken')
  }

  baseURL : string = `https://ecommerce.routemisr.com`;

  constructor(private _HttpClient:HttpClient) { }

addProductAPI(pId:string):Observable<any>{
  return this._HttpClient.post(`${this.baseURL}/api/v1/cart`,{productId:pId})
}

updateCartAPI(productCount:string|number,pid:string):Observable<any>{
  return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${pid}`,{count:productCount})
}

getCartAPI():Observable<any>{
  return this._HttpClient.get(`${this.baseURL}/api/v1/cart`)
}

removeProductAPI(pId:string):Observable<any>{
  return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${pId}`)
}

clearCartAPI():Observable<any>{
  return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`)
}

}

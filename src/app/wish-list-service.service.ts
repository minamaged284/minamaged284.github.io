import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListServiceService {
  
  wishToken:any={
    token:localStorage.getItem('uToken')
  }
  baseURL : string = `https://ecommerce.routemisr.com`;

  constructor(private _HttpClient:HttpClient) { }


  addProductAPI(pId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`,{productId:pId})
  }
  

  getWishListAPI():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`)
  }
  
  removeProductAPI(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${pId}`)
  }

}

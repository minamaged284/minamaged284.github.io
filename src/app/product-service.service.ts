import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private _HttpClient:HttpClient)
   {    }


   baseURL :string = `https://ecommerce.routemisr.com`;


  allProductsAPI(pageNum:number=1):Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?page=${pageNum}`)
  }

  oneProductsAPI(par:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products/${par}`)
  }

  allCategoriesAPI():Observable<any>
  {

    return this._HttpClient.get(`${this.baseURL}/api/v1/categories`)


  }

  speceficCategory(par:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories/${par}`)


  }

  allBrandsAPI():Observable<any>
  {

    return this._HttpClient.get(`${this.baseURL}/api/v1/brands`)


  }

  speceficBrand(par:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands/${par}`)


  }

}

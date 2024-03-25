import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';



interface userDataINterface{
  name?: string
  email: string
  password?: string
  rePassword?: string
  phone?: string
}
interface forgotPasswordInterface{
  
  email?: string
  password?: string
  rePassword?: string
  resetCode?:string
  newPassword?:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl : string = `https://ecommerce.routemisr.com`;

  constructor(private _HttpClient:HttpClient,private _router:Router) { 
    if(localStorage.getItem('lastPage')){
      _router.navigate([localStorage.getItem('lastPage')])
    }
  }

  userToken:BehaviorSubject<any>=new BehaviorSubject(null);
decodedToken!:any; 
  signUpAPI(uData:userDataINterface):Observable<any>{

    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , uData);
   }

   loginApi(uData:userDataINterface):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/auth/signin`,uData);
   }

   

   forgotPasswordAPI(uData:userDataINterface):Observable<any> {
   return  this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',uData);
    

   }

   varifyCodeApi(uData:forgotPasswordInterface):Observable<any> {
    return this._HttpClient.post(`${this.baseurl}/api/v1/auth/verifyResetCode`,uData)
   }

resetPasswordAPI(uData:forgotPasswordInterface){
  return this._HttpClient.put(`${this.baseurl}/api/v1/auth/resetPassword`,uData)

}

saveUserData(){
  if(localStorage.getItem('uToken')!=null){
    this.userToken.next(localStorage.getItem('uToken')); 
    this.userToken.next(jwtDecode(this.userToken.getValue())) ;
  }
}

}



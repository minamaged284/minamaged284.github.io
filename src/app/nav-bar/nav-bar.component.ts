import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {
userId:string='';

  constructor(private _AuthService:AuthService,private _router:Router,private _CartServiceService:CartServiceService) {  
  }
  totalItemsNav:any=0;
logged:boolean=true;
ngOnInit(): void {
  this._CartServiceService.totalItems.subscribe(()=>{
      this.totalItemsNav=this._CartServiceService.totalItems.getValue();
    
   })
  
  this._AuthService.saveUserData();
   
  this._AuthService.userToken.subscribe(()=>{
    if(this._AuthService.userToken.getValue()==null){
      this.logged=false;
    }
    else{this.logged=true}
  })

  this._CartServiceService.getCartAPI().subscribe({
    next:(res)=>{this.userId=res.data.cartOwner;
      localStorage.setItem('userId',this.userId)

    },
    error:(err)=>{err.error.message
      this.userId=err.error.message;
       this.userId=  this.userId.split(' ').splice(-1).toString();
      if(!localStorage.getItem('userId')){
        localStorage.setItem('userId',this.userId);
      }


    }
  })



}

logOut(){
 localStorage.clear();
 this._AuthService.userToken.next(null);
 this._router.navigate(['login'])
}



}

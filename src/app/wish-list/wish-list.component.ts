import { Component } from '@angular/core';
import { WishListServiceService } from '../wish-list-service.service';

import { ToastrService } from 'ngx-toastr';
import { WishListProducts } from '../wish-list-products';
import { CartServiceService } from '../cart-service.service';
import { Product } from '../product';
import { filter } from 'rxjs';


WishListServiceService
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {

  constructor(private _WishListServiceService:WishListServiceService , private toastr:ToastrService,private _CartServiceService:CartServiceService){}
  _wishListProducts:WishListProducts[]=[];
  wishLisIdArray:string[]=[];


  ngOnInit(): void {
    this._WishListServiceService.getWishListAPI().subscribe({

      next:(res)=>{

      this._wishListProducts=res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  removeItem(pId:string){
    this._WishListServiceService.removeProductAPI(pId).subscribe({
      next:(res)=>{
        this.wishLisIdArray=res.data;
        
       this._wishListProducts = this._wishListProducts.filter((item)=>{
           return this.wishLisIdArray.includes(item._id)});

    this.toastr.success('Item successfully removed from your wish list',res.status);

      },
      error:(err)=>{console.log(err);
    this.toastr.error(err.message,err.status);
  }
    })

  }

  addToCart(pId:string){
    console.log(pId);
  this._CartServiceService.addProductAPI(pId).subscribe({
  
    next:(res)=>{
  
      this.toastr.success(res.message,res.status);
      this._CartServiceService.totalItems.next(res.numOfCartItems);
      localStorage.setItem('numInCart',res.numOfCartItems);
      console.log(this._CartServiceService.totalItems.getValue())
    },
    error:(err)=>{console.log(err);
      this.toastr.error(err.message,err.status);
    }
  })
  
  }
 


}

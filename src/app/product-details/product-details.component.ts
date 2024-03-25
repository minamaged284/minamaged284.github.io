import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartServiceService } from '../cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { WishListServiceService } from '../wish-list-service.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
constructor(private _ActivatedRoute:ActivatedRoute, private _ProductServiceService:ProductServiceService,private _CartServiceService:CartServiceService,private _ToastrService:ToastrService,private _WishListServiceService:WishListServiceService){}
id:string='';
_Product!:Product|null;
wishLisIdArray:string[]=[];


customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    
  },
  nav: true
}

ngOnInit(): void {
  this._ActivatedRoute.params.subscribe((par)=>{this.id=par['id'];
console.log(this.id)
})

this._ProductServiceService.oneProductsAPI(this.id).subscribe({
  next:(res)=>{
  this._Product=res.data;
  },
  error:(err)=>{console.log(err)}
})
this._WishListServiceService.getWishListAPI().subscribe({
  next:(res)=>{
    this.wishLisIdArray=res.data.map((item:any)=>item._id);
    console.log(this.wishLisIdArray);

  },
  error:(err)=>{console.log(err)}
})
  
}
addToCart(pId:string){
  console.log(pId);
this._CartServiceService.addProductAPI(pId).subscribe({

  next:(res)=>{

    this._ToastrService.success(res.message,res.status);
    this._CartServiceService.totalItems.next(res.numOfCartItems);
    localStorage.setItem('numInCart',res.numOfCartItems);
    console.log(this._CartServiceService.totalItems.getValue())
  },
  error:(err)=>{console.log(err);
    this._ToastrService.error(err.message,err.status);
  }
})

}

addRemoveToWishList(pId:string){
  console.log(pId);

  if(this.wishLisIdArray.includes(pId)){
    this._WishListServiceService.removeProductAPI(pId).subscribe({
      next:(res)=>{
        this.wishLisIdArray=res.data
        this._ToastrService.success('Product removed successfully from your wish list',res.status);
      },
      error:(err)=>{console.log(err);
        this._ToastrService.error(err.message,err.status);
      }
    })
  }else
{this._WishListServiceService.addProductAPI(pId).subscribe({


  next:(res)=>{
    this.wishLisIdArray=res.data
    this._ToastrService.success(res.message,res.status);
  },
  error:(err)=>{console.log(err);
    this._ToastrService.error(err.message,err.status);
  }
})
}
}


}

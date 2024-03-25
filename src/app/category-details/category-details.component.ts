import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { CategoryInterface } from '../category-interface';
import { CartServiceService } from '../cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { WishListServiceService } from '../wish-list-service.service';



@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent {

  wishLisIdArray:string[]=[];

_CategoryProducts :Product[]=[];
_category:CategoryInterface={
  name:"",
  image:"",
};
id:string='';
  constructor(private _product : ProductServiceService,private _ActivatedRoute:ActivatedRoute,private _CartServiceService:CartServiceService,private toastr:ToastrService,private _WishListServiceService:WishListServiceService){}
ngOnInit(): void {

  this._ActivatedRoute.params.subscribe((par)=>{this.id=par['id'];
  console.log(this.id)
  })

  this._product.allProductsAPI().subscribe({
    next:(res)=>{
      this._CategoryProducts=res.data;
      
    },
    error:(err)=>{console.log(err)}
  })


this._product.speceficCategory(this.id).subscribe({
  next:(res)=>{
    this._category=res.data;

  }
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

addRemoveToWishList(pId:string){
  console.log(pId);

  if(this.wishLisIdArray.includes(pId)){
    this._WishListServiceService.removeProductAPI(pId).subscribe({
      next:(res)=>{
        this.wishLisIdArray=res.data
        this.toastr.success('Product removed successfully from your wish list',res.status);
      },
      error:(err)=>{console.log(err);
        this.toastr.error(err.message,err.status);
      }
    })
  }else
{this._WishListServiceService.addProductAPI(pId).subscribe({


  next:(res)=>{
    this.wishLisIdArray=res.data
    this.toastr.success(res.message,res.status);
  },
  error:(err)=>{console.log(err);
    this.toastr.error(err.message,err.status);
  }
})
}
}

}

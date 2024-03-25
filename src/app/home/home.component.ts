import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { AllProducts } from '../all-products';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryInterface } from '../category-interface';
import { CartServiceService } from '../cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { CartProducts } from '../cart-products';
import { WishListServiceService } from '../wish-list-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(private _ProductService:ProductServiceService, private _CartServiceService:CartServiceService,private toastr: ToastrService,private _WishListServiceService:WishListServiceService){};
  _category:CategoryInterface[]=[];
  _Product:Product[]=[];
  wishLisIdArray:string[]=[];
  CartProducts:CartProducts={
    status:'',
    numOfCartItems:0,
    
  }

  ngOnInit(): void {

    this._ProductService.allProductsAPI().subscribe({
      next:(res)=>{;
        this._Product=res.data;

      
      },
      error: (err)=>{console.log(err)}

    })

    this._ProductService.allCategoriesAPI().subscribe({
      next:(res)=>{
        this._category=res.data;
        },
        
      error:(err)=>{console.log(err)}
    })

    this._CartServiceService.getCartAPI().subscribe({
      next:(res)=>{
        localStorage.setItem('numInCart',res.numOfCartItems)
        this._CartServiceService.totalItems.next(res.numOfCartItems);
      },
      error:(err)=>{console.log(err)}
    })

    this._WishListServiceService.getWishListAPI().subscribe({
      next:(res)=>{
        this.wishLisIdArray=res.data.map((item:any)=>item._id);

      },
      error:(err)=>{console.log(err)}
    })
  }

searchINput:string='';


customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:5000,
  autoplaySpeed:800,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    
  },
  nav: true
}
newOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:5000,
  autoplaySpeed:800,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
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
  



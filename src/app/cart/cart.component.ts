import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { CartProducts } from '../cart-products';

import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private _CartServiceService:CartServiceService , private toastr:ToastrService){}
  _CartProducts:CartProducts|null={
    status:'',
    numOfCartItems:0,
    
  }


  ngOnInit(): void {
    this._CartServiceService.getCartAPI().subscribe({

      next:(res)=>{

      this._CartProducts=res;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  removeItem(pId:string){
    this._CartServiceService.removeProductAPI(pId).subscribe({
      next:(res)=>{
    this.toastr.success('Item successfully removed from your cart',res.status);

        this._CartProducts=res;
        this._CartServiceService.totalItems.next(res.numOfCartItems);
    localStorage.setItem('numInCart',res.numOfCartItems);


      },
      error:(err)=>{console.log(err);
    this.toastr.error(err.message,err.status);
  }
    })

  }

  update(operation:string,productCOunt:string|number,pId:string){

    if(operation=='plus'){
     productCOunt=(Number(productCOunt)+1).toString();
    }

    else if(operation=='minus'){
      productCOunt=(Number(productCOunt)-1).toString( );

      if(Number(productCOunt)==0){
        this.removeItem(pId);
      }
     }
     this._CartServiceService.updateCartAPI(productCOunt,pId).subscribe({
      next:(res)=>{
        this._CartProducts=res
        console.log(res);
      },

      error:(err)=>{
        console.log(err);
      }
     })

  }
clearCart(){
  this._CartServiceService.clearCartAPI().subscribe({
    next:(res)=>{
      if(res.message=='success'){
        this._CartProducts={
          status:'',
          numOfCartItems:0,
          
        }
        this._CartServiceService.totalItems.next(res.numOfCartItems);
    localStorage.setItem('numInCart',this._CartProducts.numOfCartItems.toString())
      }
      console.log(this._CartProducts?.numOfCartItems)
    },
    error:(err)=>console.log(err)
  })
}
}

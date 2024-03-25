import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { CategoryInterface } from '../category-interface';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  _brandsInterface:CategoryInterface[]=[];
  constructor(private _ProductServiceService:ProductServiceService  ){}
  
  ngOnInit(): void {
  this._ProductServiceService.allBrandsAPI().subscribe({
  
    next:(res)=>{
      this._brandsInterface=res.data;
    },
    error:(err)=>{console.log(err)}
  })
  }

}

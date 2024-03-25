import { Component, OnInit } from '@angular/core';
import { CategoryInterface } from '../category-interface';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
_caCategoryInterface:CategoryInterface[]=[];
constructor(private _ProductServiceService:ProductServiceService  ){}

ngOnInit(): void {
this._ProductServiceService.allCategoriesAPI().subscribe({

  next:(res)=>{
    this._caCategoryInterface=res.data;
  },
  error:(err)=>{console.log(err)}
})
}

}

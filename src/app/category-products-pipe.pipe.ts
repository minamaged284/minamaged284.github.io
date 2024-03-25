import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';
import { filter } from 'rxjs';
@Pipe({
  name: 'categoryProductsPipe'
})
export class CategoryProductsPipePipe implements PipeTransform {

  transform(AllProducts:Product[],catId:string):Product[] {
    return AllProducts.filter((par)=>par.category._id.toLowerCase().includes(catId.toLocaleLowerCase()))
  }

}

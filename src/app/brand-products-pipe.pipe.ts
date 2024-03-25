import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'brandProductsPipe'
})
export class BrandProductsPipePipe implements PipeTransform {

  transform(AllProducts:Product[],brandId:string):Product[] {
    return AllProducts.filter((par)=>par.brand._id.toLowerCase().includes(brandId.toLocaleLowerCase()))
  }

}

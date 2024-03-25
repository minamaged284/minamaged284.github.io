import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';
import { filter } from 'rxjs';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(AllProducts:Product[],userWord:string):Product[] {
    return AllProducts.filter((par)=>par.title.toLowerCase().includes(userWord.toLocaleLowerCase()))
  }

}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchpipe'
})

export class SearchpipePipe implements PipeTransform {
     // pretraga preko kvadrature ili broja kreveta
  transform(value: Object[], vrednost: number, vrednost2: number): Object[] {
    if (value == null) {
      return null;

    }

    if (vrednost !== undefined || vrednost2 !== undefined) {

      if (vrednost2 == undefined) {
        return value.filter((item: Object) => item['kvadrati'] >= vrednost);
      }
      
        return value.filter((item: Object) => item['kvadrati'] >= vrednost && item['kreveti'] >= vrednost2);

       // if (vrednost != undefined || vrednost2 != undefined ) {
       //   return value.filter((item: Object) => item['kvadrati'] >= vrednost && item['kreveti'] >= vrednost2 );
       // }
       
      }else{
         return value;
      }
          
  }

  

}
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchroompipe'
})

export class SearchroomPipe implements PipeTransform {

  transform(value: Object[], vrednost5: number, vrednost6: string): Object[] {
    if (value == null) {
      return null;

    }

   // if (vrednost5 !== undefined || vrednost6 !== undefined) {

      if (vrednost5 != undefined) {
        return value.filter((item: Object) => item['broj'] == vrednost5);
      }
      if (vrednost6 != undefined) {
        return value.filter((item: Object) => item['naziv'].match(vrednost6));
      }

     //   return value.filter((item: Object) => item['broj'] == vrednost5 && item['naziv'].match(vrednost6));
         
    //  }else{
         return value;
      //}
          
  }



}
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchuserpipe'
})

export class SearchuserPipe implements PipeTransform {
    
 transform(value: Object[], vrednost3: any, vrednost4: any): Object[] {
   if (value == null) {
     return null;

   }

   if (vrednost3 !== undefined || vrednost4 !== undefined) {

     if (vrednost4 == undefined) {
       return value.filter((item: Object) => item['firstname'].match(vrednost3));
     }
     
        return value.filter((item: Object) => item['firstname'].match(vrednost3) && item['lastname'].match(vrednost4));
        
     }else{
        return value;
     }
         
 }



}
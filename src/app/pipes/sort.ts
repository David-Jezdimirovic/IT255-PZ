import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortpipe'
})

export class SortPipe {
    transform(array: Array<any>): Array<any> {
      if(array)
      array.sort((a: number, b: number) => {
        if (a['broj'] < b['broj']) {
          return -1;
        } else if (a['broj'] > b['broj']) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderby',
})
export class OrderbyPipe implements PipeTransform {
  transform(array: any[], sortBy: string): any[] {
    if (!Array.isArray(array) || !sortBy) {
      return array;
    }
    return orderBy(array, [sortBy]);
  }
}

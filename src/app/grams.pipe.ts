import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gramspipe'
})
export class GramsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value + ' g';
  }

}

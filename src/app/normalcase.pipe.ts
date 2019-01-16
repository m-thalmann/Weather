import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalcase'
})
export class NormalcasePipe implements PipeTransform {

  transform(value: string): string {
    let ret = "";

    value.split("-").forEach(function(el){
      ret += el.substr(0, 1).toUpperCase() + el.substr(1).toLowerCase() + " ";
    });

    return ret.substr(0, ret.length - 1);
  }

}

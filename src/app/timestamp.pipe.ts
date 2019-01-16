import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: any): string {
    let timestamp = value.toString();
    let ret: string = null;

    // TODO

    return ret;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'direction'
})
export class DirectionPipe implements PipeTransform {
  private position = [
    "N",
    "NNO",
    "NO",
    "NOO",
    "O",
    "SOO",
    "SO",
    "SSO",
    "S",
    "SSW",
    "SW",
    "SWW",
    "W",
    "NWW",
    "NW",
    "NWW"
  ]

  transform(value: string): string {
    try{
      var val = Math.floor((parseInt(value) / 22.5) + 0.5);

      return this.position[(val % 16)];
    }catch(e){
      return value;
    }
  }

  private parseDeg(deg: number){
    return ((deg%360)+360)%360;
  }

}

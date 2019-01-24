import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {
  icons = {
    "water-level": "water",
    "water-temperature": "temperature-low",
    "atmospheric-pressure-reduced": "tachometer-alt",
    "sunshine-duration": "sun",
    "global-radiation": "",
    "wind-gust-speed": "wind",
    "precipitation": "tint",
    "wind-direction": "compass",
    "air-temperature": "thermometer-half",
    "wind-speed": "wind",
    "air-humidity": "smog",
    "hydrometric-level": "cloud-meatball",
    "snow-level": "snowflake",
    "flow-rate": "water",
    "atmospheric-pressure": "tachometer-alt",
    "rainfall-duration": "cloud-rain",
    "dew-point-temperature": "temperature-low",
  }

  transform(value: any): string {
    if(this.icons[value]){
      return "fas fa-" + this.icons[value];
    }else{
      return "fas fa-dot-circle";
    }
  }

}

import { Component } from '@angular/core';
import { ApiService, Station } from '../api.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {
  random_stations: Station[] = null;
  loading_error: boolean = false;

  constructor(private api: ApiService, private settings: SettingsService) {
    this.load_random(this.settings.home_amount);
  }

  async load_random(amount: number){
    try{
      this.random_stations = null;
  
      let stations = await this.api.station_details();
  
      let ret: Station[] = [];
  
      for(let i = 0; i < amount; i++){
        let pos = Math.floor(Math.random() * stations.length);
        
        ret.push(stations.splice(pos, 1)[0]);
      }
  
      this.random_stations = ret;
      this.loading_error = false;
    }catch(e){
      this.loading_error = true;
    }
  }

}

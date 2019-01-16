import { Component } from '@angular/core';
import { ApiService, Station } from '../api.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {
  random_stations: Station[] = null;

  constructor(private api: ApiService) {
    this.load_random(2);
  }

  async load_random(amount: number){
    this.random_stations = null;

    let stations = await this.api.station_details();

    let ret: Station[] = [];

    for(let i = 0; i < amount; i++){
      let pos = Math.floor(Math.random() * stations.length);
      
      ret.push(stations.splice(pos, 1)[0]);
    }

    this.random_stations = ret;
  }

}

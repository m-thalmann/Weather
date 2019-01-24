import { Component } from '@angular/core';
import { Station, ApiService } from '../api.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-page-favorites',
  templateUrl: './page-favorites.component.html',
  styleUrls: ['./page-favorites.component.scss']
})
export class PageFavoritesComponent {

  favorites_stations: Station[] = null;

  constructor(private api: ApiService, private favorites: FavoritesService) {
    this.load_favorites();
  }

  async load_favorites(){
    this.favorites_stations = null;

    let stations = this.favorites.load();

    if(stations.length == 0){
      this.favorites_stations = [];
      return;
    }

    let stations_loaded = await this.api.station_details();

    let ret: Station[] = [];

    for(let i = 0; i < stations.length; i++){
      let pos = stations_loaded.map(el => el.id).indexOf(stations[i]);
      
      if(pos >= 0){
        ret.push(stations_loaded[pos]);
      }else{
        this.favorites.remove(stations[i]);
      }
    }

    this.favorites_stations = ret;
  }

  favoration_changed(f : { status: boolean, id: string }){
    if(!f.status){
      this.favorites_stations.splice(this.favorites_stations.map(station => station.id).indexOf(f.id), 1);
    }
  }
}

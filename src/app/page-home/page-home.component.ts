import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {

  favorites_loaded = [];

  constructor(private api: ApiService, private favorites: FavoritesService) { 
    // favorites.load().forEach(el => {
    //   api.newest_record({ station: el,  }).subscribe(val => {
    //     console.log(val);
        
    //   },
    //   err => {
    //     console.error(err);
        
    //   });
    // });
    this.load();
  }

  async load(){
    // let stations = await this.api.station_details().toPromise();
    
    // let data_types = [];

    // stations.forEach(el => {
    //   data_types.push(this.api.data_types(el.id).toPromise().then(val => {
    //     console.log(val);
        
    //   }));
    // });

    // await Promise.all(data_types);
    let stations = await this.api.station_details();
    console.log(stations);
    
  }

}

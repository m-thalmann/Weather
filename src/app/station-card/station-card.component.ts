import { Component, Input } from '@angular/core';
import { Station, ApiService, RecordExtended } from '../api.service';
import { FavoritesService } from '../favorites.service';
import { DirectionPipe } from '../direction.pipe';

@Component({
  selector: 'station-card',
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.scss']
})
export class StationCardComponent{
  private _station: Station = null;
  records: RecordExtended[] = null;

  @Input()
  set station(_station: Station){
    this._station = _station;

    this.loadRecords()
  }

  get station(){
    return this._station;
  }

  private async loadRecords(){
    this.records = null;

    let ret: RecordExtended[] = [];

    let data_types = await this.api.data_types(this._station.id);
    
    for(let i = 0; i < data_types.length; i++){
      let record = await this.api.newest_record({
        station: this._station.id,
        type: data_types[i][0]
      });

      ret.push({
        name: data_types[i][0],
        unit: data_types[i][1],
        value: record.value,
        timestamp: record.timestamp,
        period: record.period
      });
    }

    this.records = ret;
  }

  constructor(private api: ApiService, private favorites: FavoritesService){
  }
}

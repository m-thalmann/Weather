import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Station, ApiService, RecordExtended } from '../api.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'station-card',
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.scss']
})
export class StationCardComponent implements OnInit{
  private _station: Station = null;
  private opened: boolean = false;
  records: RecordExtended[] = null;

  @Output() favorationStatus = new EventEmitter<{
    status: boolean,
    id: string
  }>();

  @Input()
  set preload(_preload){
    this.opened = (_preload.toLowerCase() == "true" ? true : false);
  }

  @Input()
  set station(_station: Station){
    this._station = _station;
  }

  get station(){
    return this._station;
  }

  toggleFavorite(){
    this.favorationStatus.emit({
      status: this.favorites.toggle(this.station.id),
      id: this.station.id
    });
  }

  toggleOpen(){
    if(this.records == null){
      this.loadRecords();
    }

    this.opened = !this.opened;
  }

  private async loadRecords(){
    this.records = null;

    let ret: RecordExtended[] = [];

    let data_types = await this.api.data_types(this.station.id);

    await Promise.all(
      data_types.map(async el => {
        let record = await this.api.newest_record({
          station: this._station.id,
          type: el[0]
        });

        ret.push({
          name: el[0],
          unit: el[1],
          value: record.value,
          timestamp: record.timestamp,
          period: record.period
        });
      })
    );

    this.records = ret;
  }

  constructor(private api: ApiService, private favorites: FavoritesService){
  }

  ngOnInit() {
    if(this.opened){
      this.loadRecords();
    }
  }
}

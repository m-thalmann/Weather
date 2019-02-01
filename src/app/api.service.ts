import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

const URL: string = "http://ipchannels.integreen-life.bz.it/meteorology/rest/";

export interface Station{
  _t: string,
  id: string,
  name: string,
  latitude: number,
  longitude: number,
  municipality: string,
  area: string
}

export interface Record{
  timestamp: string,
  value: number,
  period: number
}

export interface RecordExtended extends Record{
  name: string,
  unit: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cache: {
    values: Station[],
    timestamp: string
  } = null;

  constructor(private http: HttpClient, private settings: SettingsService) {}

  async stations(){
    let ret = await this.http.get<string[]>(URL + "get-stations").toPromise();
    return ret;
  }

  async station_details(use_cache: boolean = null){
    if((use_cache == undefined && (this.cache == null || this.cache_expired)) || use_cache == false){
      let ret = await this.http.get<Station[]>(URL + "get-station-details").toPromise();
  
      this.cacheResult(ret);
    }
    
    return this.cache.values;
  }

  async filter_stations(search: string, use_cache: boolean = true){
    let ret: Station[] = null;

    ret = await this.station_details(use_cache);;

    search = search.toLowerCase();

    return ret.filter(el =>
      (el.name && el.name.toLowerCase().indexOf(search) >= 0) || 
      (el.municipality && el.municipality.toLowerCase().indexOf(search) >= 0) || 
      (el.area && el.area.toLowerCase().indexOf(search) >= 0)
    );    
  }

  async data_types(station: string){
    let ret = await this.http.get<string[][]>(URL + "get-data-types", {
      params: {
        "station": station
      }
    }).toPromise();
    return ret;
  }

  async date_of_last_record(options: {
    "station": string,
    "type"?: string,
    "period"?: number, //sec
  }){
    let params = {};

    params['station'] = options.station;

    if(options.type){
      params['type'] = options.type;
    }

    if(options.period){
      params['period'] = options.period;
    }

    let ret = await this.http.get<string>(URL + "get-date-of-last-record", {
      params: params
    }).toPromise();

    return ret;
  }

  async newest_record(options: {
    "station": string,
    "type"?: string,
    "period"?: number, //sec
  }){
    let params = {};

    params['station'] = options.station;

    if(options.type){
      params['type'] = options.type;
    }

    if(options.period){
      params['period'] = options.period;
    }

    let ret = await this.http.get<Record>(URL + "get-newest-record", {
      params: params
    }).toPromise();

    return ret;
  }

  async records(options: {
    "station": string,
    "name": string,
    "seconds": number, //sec
    "period"?: number, //sec
  }){
    let params = {};

    params['station'] = options.station;
    params['name'] = options.name;
    params['seconds'] = options.seconds;

    if(options.period){
      params['period'] = options.period;
    }

    let ret = await this.http.get<Record[]>(URL + "get-records", {
      params: params
    }).toPromise();

    return ret;
  }

  private cacheResult(res: Station[]){
    this.cache = {
      values: res,
      timestamp: new Date().toISOString()
    }
  }

  private get cache_expired(){
    return this.cache == null || (new Date(this.cache.timestamp).valueOf() < (new Date().valueOf() - 60000 * this.settings.cache_max_age));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}

  async stations(){
    let ret = await this.http.get<string[]>(URL + "get-stations").toPromise();
    return ret;
  }

  async station_details(data_types: boolean = false){
    let ret = await this.http.get<Station[]>(URL + "get-station-details").toPromise();
    
    return ret;
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
}

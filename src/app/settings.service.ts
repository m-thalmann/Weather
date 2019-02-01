import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface Settings{
  home_amount?: number,
  cache_max_age?: number, // min
}

const default_settings: Settings = {
  home_amount: 5,
  cache_max_age: 10,
}

const SETTINGS = 'WE_SETTINGS';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: Settings = {};

  constructor(private storage: StorageService) {
    this.load();
  }

  private load(){
    let settings = this.storage.get(SETTINGS);
    this.settings = settings ? settings : { };
  }

  private save(){
    this.storage.add(SETTINGS, this.settings);
  }

  get home_amount(){
    return this.settings.home_amount ? this.settings.home_amount : default_settings.home_amount;
  }

  set home_amount(amount: number){
    this.settings.home_amount = amount;
    this.save();
  }

  get cache_max_age(){
    return this.settings.cache_max_age ? this.settings.cache_max_age : default_settings.cache_max_age;
  }

  set cache_max_age(amount: number){
    this.settings.cache_max_age = amount;
    this.save();
  }
}

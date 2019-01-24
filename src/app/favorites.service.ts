import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const FAVORITES: string = "FAVORITES";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private changes_subscribers = {};

  constructor(private storage: StorageService) { }

  load(): string[]{
    let ret = this.storage.get(FAVORITES);
    return ret ? ret : [];
  }

  add(id: string){
    this.callSubscribers();
    this.storage.push(FAVORITES, id);
  }

  remove(id: string){
    this.callSubscribers();
    this.storage.pop(FAVORITES, id);
  }

  toggle(id: string){
    if(this.is(id)){
      this.remove(id);
      return false;
    }else{
      this.add(id);
      return true;
    }
  }

  clear(){
    this.callSubscribers();
    this.storage.remove(FAVORITES);
  }

  is(id: string){
    return this.load().indexOf(id) != -1;
  }

  subscribe(callback: Function){
    let keys = Object.keys(this.changes_subscribers);

    let key = keys ? parseInt(keys[keys.length-1]) + 1 : 1;

    this.changes_subscribers[key] = callback;

    return key;
  }

  unsubscribe(key: number){
    delete this.changes_subscribers[key];
  }

  private callSubscribers(){
    let keys = Object.keys(this.changes_subscribers);

    keys.forEach(key => {
      this.changes_subscribers[key]();
    });
  }
}

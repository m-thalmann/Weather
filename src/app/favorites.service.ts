import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const FAVORITES: string = "FAVORITES";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private storage: StorageService) { }

  load(): string[]{
    let ret = this.storage.get(FAVORITES);
    return ret ? ret : [];
  }

  add(id: string){
    this.storage.push(FAVORITES, id);
  }

  remove(id: string){
    this.storage.pop(FAVORITES, id);
  }

  toggle(id: string){
    if(this.is(id)){
      this.remove(id);
    }else{
      this.add(id);
    }
  }

  clear(){
    this.storage.remove(FAVORITES);
  }

  is(id: string){
    return this.load().indexOf(id) != -1;
  }
}

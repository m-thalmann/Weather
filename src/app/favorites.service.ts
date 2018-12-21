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

  clear(){
    this.storage.remove(FAVORITES);
  }
}

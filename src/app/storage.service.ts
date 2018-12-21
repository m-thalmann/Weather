import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  get(key: string){
    var obj = localStorage.getItem(key);
    
    try{
      return JSON.parse(obj);
    }catch(e){
      localStorage.removeItem(key);
      return null;
    }
  }

  add(key: string, val: any){
    localStorage.setItem(key, JSON.stringify(val));
  }

  remove(key: string){
    localStorage.removeItem(key);
  }

  push(key: string, val: any, duplicates: boolean = false){
    var obj = this.get(key);

    if(obj){
      if(obj instanceof Array){
        if(obj.indexOf(val) == -1 || duplicates){
          obj.push(val);
          this.add(key, obj);
        }
      }else{
        throw new Error("Object is no array");
      }
    }else{
      this.add(key, [val]);
    }
  }

  pop(key: string, val: string){
    var obj = this.get(key);

    if(obj){
      if(obj instanceof Array){
        var pos = obj.indexOf(val);
        if(pos >= 0){
          obj.splice(pos, 1);

          this.add(key, obj);
        }
      }else{
        throw new Error("Object is no array");
      }
    }else{
      this.add(key, []);
    }
  }
}

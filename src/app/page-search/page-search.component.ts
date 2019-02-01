import { Component } from '@angular/core';
import { ApiService, Station } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent {
  search_string: string = null;
  results: Station[] = null;

  loading: boolean = false;
  loading_error: boolean = false;
  
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.search_string = params['query'];
      this.search();
    });
  }

  doSearch(){
    this.router.navigateByUrl('/search/' + this.search_string);
  }

  private async search(){
    try{
      if(this.loading || this.search_string == null || this.search_string.trim().length == 0){
        return;
      }
  
      this.loading = true;
      this.results = null;
  
      this.results = await this.api.filter_stations(this.search_string);
  
      this.loading_error = false;
    }catch(e){
      this.loading_error = true;
      console.error('Error loading results:', e);
    }finally{
      this.loading = false;
    }
  }

}

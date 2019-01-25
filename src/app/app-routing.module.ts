import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageFavoritesComponent } from './page-favorites/page-favorites.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';

const routes: Routes = [
  { path: 'home', component: PageHomeComponent },
  { path: 'favorites', component: PageFavoritesComponent },
  { path: 'search', component: PageSearchComponent },
  { path: 'search/:query', component: PageSearchComponent },
  { path: 'settings', component: PageSettingsComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageFavoritesComponent } from './page-favorites/page-favorites.component';

const routes: Routes = [
  { path: 'home', component: PageHomeComponent },
  { path: 'favorites', component: PageFavoritesComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

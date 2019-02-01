import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PageHomeComponent } from './page-home/page-home.component';
import { HttpClientModule } from '@angular/common/http';
import { StationCardComponent } from './station-card/station-card.component';
import { TimestampPipe } from './timestamp.pipe';
import { NormalcasePipe } from './normalcase.pipe';
import { WeatherIconPipe } from './weather-icon.pipe';
import { DirectionPipe } from './direction.pipe';
import { PageFavoritesComponent } from './page-favorites/page-favorites.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PageHomeComponent,
    StationCardComponent,
    TimestampPipe,
    NormalcasePipe,
    WeatherIconPipe,
    DirectionPipe,
    PageFavoritesComponent,
    PageSettingsComponent,
    PageSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

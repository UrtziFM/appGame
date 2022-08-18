import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RrssComponent } from './components/rrss/rrss.component';
import { SkillsComponent } from './skills/skills.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GamesComponent } from './games/games.component';
import { SpacesComponent } from './spaces/spaces.component';
import { PacmanComponent } from './pacman/pacman.component';
import { BreakoutComponent } from './breakout/breakout.component';

@NgModule({
  declarations: [
    AppComponent,
    RrssComponent,
    SkillsComponent,
    GamesComponent,
    SpacesComponent,
    PacmanComponent,
    BreakoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

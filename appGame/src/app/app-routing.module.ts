import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SpacesComponent } from './spaces/spaces.component';
import { PacmanComponent } from './pacman/pacman.component';
import { BreakoutComponent } from './breakout/breakout.component';

const routes: Routes = [
  {path: '', component: SpacesComponent},
  {path: 'Pacman', component: PacmanComponent},
  {path: 'Breakout', component: BreakoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SpacesComponent } from './spaces/spaces.component';
import { PacmanComponent } from './pacman/pacman.component';


const routes: Routes = [
  {path: '', component: SpacesComponent},
  {path: 'Pacman', component: PacmanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
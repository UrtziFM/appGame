import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { GamesComponent } from './games/games.component';


const routes: Routes = [
  {path: '', component: GamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateCvComponent } from './cv/components/generate-cv/generate-cv.component';

const routes: Routes = [
  { path: '', component: GenerateCvComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

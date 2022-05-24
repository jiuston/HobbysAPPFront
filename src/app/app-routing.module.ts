import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HobbysComponent } from './hobbys/hobbys.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'hobbys', component: HobbysComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { TareaDetailComponent } from './tarea-detail/tarea-detail.component';
import { HobbyDetailComponent } from './hobby-detail/hobby-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HobbysComponent } from './hobbys/hobbys.component';
import { LoginComponent } from './login/login.component';
import { TareasComponent } from './tareas/tareas.component';
import { GastosComponent } from './gastos/gastos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hobbys', component: HobbysComponent },
  { path: 'hobbys/:id/view', component: HobbyDetailComponent },
  { path: 'tareas/:id/view', component: TareaDetailComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'gastos', component: GastosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

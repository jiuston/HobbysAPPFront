import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { HobbysComponent } from './hobbys/hobbys.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HobbyDetailComponent } from './hobby-detail/hobby-detail.component';
import { TareaDetailComponent } from './tarea-detail/tarea-detail.component';
import { TareasComponent } from './tareas/tareas.component';
import { GastosComponent } from './gastos/gastos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HobbysComponent,
    ToolbarComponent,
    HobbyDetailComponent,
    TareaDetailComponent,
    TareasComponent,
    GastosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

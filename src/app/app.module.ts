import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { HobbyDialogOverviewComponent } from './hobby-dialog-overview/hobby-dialog-overview.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TareaDialogOverviewComponent } from './tarea-dialog-overview/tarea-dialog-overview.component';
import { LoadingProgressComponent } from './loading-progress/loading-progress.component';
import { ComentarioDialogComponent } from './comentario-dialog/comentario-dialog.component';
import { FileUploadMultipleComponent } from './file-upload-multiple/file-upload-multiple.component';
import { GastoDialogComponent, MY_FORMATS } from './gasto-dialog/gasto-dialog.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { EmptyTabComponent } from './empty-tab/empty-tab.component';
import { TrelloListComponent } from './trello-list/trello-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HobbysComponent,
    ToolbarComponent,
    HobbyDetailComponent,
    TareaDetailComponent,
    TareasComponent,
    GastosComponent,
    HobbyDialogOverviewComponent,
    FileUploadComponent,
    TareaDialogOverviewComponent,
    LoadingProgressComponent,
    ComentarioDialogComponent,
    FileUploadMultipleComponent,
    GastoDialogComponent,
    EmptyTabComponent,
    TrelloListComponent
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
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

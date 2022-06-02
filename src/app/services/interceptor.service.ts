import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    if (req.method === "GET") {
      return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.swal404(err);
        }
        return of();
      })
      );
    } else if (req.method === "DELETE" || req.method === "POST" || req.method === "PUT") {
      return next.handle(request).pipe(tap(
        event =>{
          if(event instanceof HttpResponse){
              if(event.status===200) this.swal200(event);
          }
        },
        error => {
          if(error instanceof HttpErrorResponse){
            if(error.status===404) this.swal404(error);
            if(error.status===401) this.swal401(error);
          }
        }
      ));
    
    }
    return next.handle(request);
    
  }
  swal200(event: HttpResponse<any>) {
    if(event.body instanceof Object){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cambio realizado con éxito',
        showConfirmButton: false,
        timer: 1250
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: event.body,
        showConfirmButton: false,
        timer: 1250
      });
    }

  }

  swal404(error: HttpErrorResponse) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: error.error,
      showConfirmButton: false,
      timer: 1250
    });
  }

  swal401(error: HttpErrorResponse) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: error.error,
      showConfirmButton: false,
      timer: 1250
    });
  }

}

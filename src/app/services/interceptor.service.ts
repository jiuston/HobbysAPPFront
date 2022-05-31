import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
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
      return next.handle(request)
        .pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.body instanceof Object) {
              Swal.fire({
                icon: 'success',
                title: 'Perfecto!',
                text: 'Cambio realizado con éxito',
                timer: 1500
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Perfecto!',
                text: event.body,
                timer: 1500
              });
            }
          } else if (event instanceof HttpErrorResponse) {

            if (event.status === 404) {
              this.swal404(event);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: event.message,
              });
            }
          }
          return event;
        }));
    } else {
      return next.handle(request)
    }
  }

  swal404(error: HttpErrorResponse) {
    Swal.fire({
      position: 'center-end',
      icon: 'info',
      title: error.error,
      showConfirmButton: false,
      timer: 1750
    });
  }

}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private localIp = 'http://localhost:8010';
  private productionIp = 'https://stormy-thicket-53012.herokuapp.com';
  private currentIp: string = this.localIp;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toastController: ToastController
  ) {}

  // Get header
  private getHeader(): HttpHeaders {
    let header = new HttpHeaders();
    header = header.set('auth-token', this.auth.getToken());
    header = header.set('Accept', 'application/json');
    header = header.set('Content-Type', 'application/json');
    return header;
  }

  // Get method
  private get(url: string, options?: object): Observable<any> {
    return this.http
      .get(url, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Post method
  private post(url: string, body: object, options?: object): Observable<any> {
    return this.http
      .post(url, body, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Delete method
  private delete(url: string, options?: object): Observable<any> {
    return this.http
      .delete(url, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status !== 200) {
      this.toastController
        .create({
          message: error.error,
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });

      return throwError(error.error);
    }
  }

  // Login User
  public loginUser(cred: { email: string; password: string }): Observable<any> {
    const url = this.currentIp + '/user/login';
    return this.post(url, cred);
  }

  // Create user
  public createUser(cred: {
    email: string;
    password: string;
    name: string;
  }): Observable<any> {
    const url = this.currentIp + '/user/register';

    // Mention the role
    cred['role'] = 'user';
    return this.post(url, cred);
  }

  // Get Restaurant data based on query
  public getRestaurantData(queryParams?): Observable<any> {
    const url = this.currentIp + '/restaurant';
    return this.get(url, { params: queryParams, headers: this.getHeader() });
  }

  // Get Dish data based on query
  public getDishData(queryPar?): Observable<any> {
    const url = this.currentIp + '/dish';
    return this.get(url, { params: queryPar, headers: this.getHeader() });
  }
}

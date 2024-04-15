import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/signin';
  private isLoggedIn = new BehaviorSubject<boolean>(false); 

  constructor(private http: HttpClient) {
    this.checkInitialLoginStatus(); 
  }

  private checkInitialLoginStatus(): void {
    this.isLoggedIn.next(!!localStorage.getItem('jwt'));
  }

  login(credentials: { login: string; password: string }): Observable<string> {
    return this.http.post(this.apiUrl, credentials, { responseType: 'text' })
      .pipe(
        map(token => {
          localStorage.setItem('jwt', token); 
          this.isLoggedIn.next(true); 
          return token;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt'); 
    this.isLoggedIn.next(false);
  }

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
}

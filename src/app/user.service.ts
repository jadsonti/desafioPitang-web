import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './models/user-model';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private userStateService: UserStateService
  ) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}`, user)
      .pipe(
        tap(response => this.userStateService.addUser(response)),
        catchError(this.handleError)
      );
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}`).pipe(
      tap(users => this.userStateService.setUsers(users)),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user)
      .pipe(
        tap(updatedUser => this.userStateService.updateUser(updatedUser)),
        catchError(this.handleError)
      );
  }

  removeUserById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.userStateService.removeUser(id)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      errorMessage = error.error.message || JSON.stringify(error.error) || errorMessage;
    }
    return throwError(errorMessage);
  }
}

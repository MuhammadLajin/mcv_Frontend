import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { createUserRequest, userResponse } from '../odels/user.model';
import { catchError, } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<userResponse[]>{
    return this.http.get<userResponse[]>('http://localhost:17879/api/UserTables')
    .pipe(catchError((err) => this.handleError(err)));
  }
  getUserById(userId: number): Observable<userResponse>{
    return this.http.get<userResponse>(`http://localhost:17879/api/UserTables/${userId}`)
    .pipe(catchError((err) => this.handleError(err)));
  }
  createUser(user: createUserRequest): Observable<userResponse>{
    return this.http.post<userResponse>('http://localhost:17879/api/UserTables', user)
    .pipe(catchError((err) => this.handleError(err)));
  }
  updateUser(user: userResponse, userId: number): Observable<any>{
    return this.http.put<any>(`http://localhost:17879/api/UserTables/${userId}`, user)
    .pipe(catchError((err) => this.handleError(err)));
  }
  removeUser(userId: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:17879/api/UserTables/${userId}`)
    .pipe(catchError((err) => this.handleError(err)));
  }
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }
    return throwError(errMsg);
  }

}

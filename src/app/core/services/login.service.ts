import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AUTH_TOKEN_ENABLED } from '../interceptors/auth.interceptor';

interface LoginResponse{
  token: string;
  user: {
    name: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _httpClient = inject(HttpClient)
  private readonly url: string = environment.apiUrl

  login(username: string, password: string): Observable<LoginResponse>{
    const headers = new HttpHeaders().set('useAuth', 'n');

    const endpoint = `${this.url}/login`
      return this._httpClient.post<LoginResponse>(endpoint, {username, password}, {headers, context: new HttpContext().set(AUTH_TOKEN_ENABLED,false)}).pipe(
        map((response) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user));
        return response
      })
    );
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

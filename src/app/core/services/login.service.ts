import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AUTH_TOKEN_ENABLED } from '../interceptors/auth.interceptor';
import { User } from '../models/models';

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly _httpClient = inject(HttpClient);
  private readonly url: string = environment.apiUrl;

  readonly #currentUser: WritableSignal<User | null> = signal(
    this.getUserFromStorage()
  );

  public currentUser: Signal<User | null> = this.#currentUser.asReadonly();
  public isLoggedIn: Signal<boolean> = computed(() => !!this.#currentUser());

  login(username: string, password: string, recaptcha: string): Observable<LoginResponse> {
    console.log("Login attempt:", { username, password, recaptcha });
    const headers = new HttpHeaders().set('useAuth', 'n');
    const endpoint = `${this.url}/login`;

    return this._httpClient
      .post<LoginResponse>(
        endpoint,
        { username, password, recaptcha },
        {
          headers,
          context: new HttpContext().set(AUTH_TOKEN_ENABLED, false),
        }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.#currentUser.set(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.#currentUser.set(null);
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  }
}

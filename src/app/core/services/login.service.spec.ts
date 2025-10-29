import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { take } from 'rxjs';
import { LoginService, LoginResponse } from './login.service';
import { User } from '../models/models';
import { environment } from '../../../environments/environment.development';

let localStorageStore: { [key: string]: string } = {};

const mockLocalStorage = {
  getItem: (key: string): string | null => {
    return localStorageStore[key] || null;
  },
  setItem: (key: string, value: string): void => {
    localStorageStore[key] = value.toString();
  },
  removeItem: (key: string): void => {
    delete localStorageStore[key];
  },
  clear: (): void => {
    localStorageStore = {};
  }
};

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  const mockUser: User = { name: 'Test User' };
  const mockLoginResponse: LoginResponse = {
    token: 'mock-token-123',
    user: mockUser,
  };


  describe('quando deslogado (sem dados no storage)', () => {
    beforeEach(() => {
      localStorageStore = {};

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          LoginService,
          provideZonelessChangeDetection()
        ]
      });

      spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

      service = TestBed.inject(LoginService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('deve ser criado', () => {
      expect(service).toBeTruthy();
    });

    it('deve ter o estado inicial (signals) como deslogado', () => {
      expect(service.isLoggedIn()).toBeFalse();
      expect(service.currentUser()).toBeNull();
    });

    it('deve fazer login, salvar no storage e atualizar os signals', (done: DoneFn) => {
      const username = 'testuser';
      const password = 'testpassword';
      const mockRecaptcha = 'mock-recaptcha-token';

      service.login(username, password, mockRecaptcha).pipe(take(1)).subscribe(response => {
        expect(response).toEqual(mockLoginResponse);
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/login`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password, recaptcha: mockRecaptcha });

      req.flush(mockLoginResponse);

      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockLoginResponse.token);
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockLoginResponse.user));

      expect(service.isLoggedIn()).toBeTrue();
      expect(service.currentUser()).toEqual(mockUser);
    });
  });

  describe('quando logado (com dados no storage)', () => {
    beforeEach(() => {
      localStorageStore = {
        'user': JSON.stringify(mockUser),
        'token': 'fake-token'
      };

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          LoginService,
          provideZonelessChangeDetection()
        ]
      });

      spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

      service = TestBed.inject(LoginService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('deve carregar o usuário do storage ao iniciar', () => {
      expect(service.isLoggedIn()).toBeTrue();
      expect(service.currentUser()).toEqual(mockUser);
    });

    it('deve fazer logout, limpar o storage e resetar os signals', () => {
      service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');

      expect(service.isLoggedIn()).toBeFalse();
      expect(service.currentUser()).toBeNull();
    });
  });

});


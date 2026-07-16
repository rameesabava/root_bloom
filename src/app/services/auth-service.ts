import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);
  loginUsername = signal('');

  loadUser() {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');

    if (token && user) {
      this.isLoggedIn.set(true);
      this.loginUsername.set(JSON.parse(user).username);
    } else {
      this.isLoggedIn.set(false);
      this.loginUsername.set('');
    }
  }
}

import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    new User('admin', '12345'),
    new User('Manuel', '2004'),
    new User('Toru', '2004'),
    new User('Maki', '2023'),
  ]

  loggedUser!: User | undefined;

  constructor() { }

  validateLogin(u: string, p: string): boolean {

    for (let index = 0; index < this.users.length; index++) {
      const user = this.users[index];
      if(user.username === u && user.password === p){
        this.loggedUser = user;
        localStorage.setItem('logged_user', user.username);
        return true;
      }
    }

    return false;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getLoggedUser(): User | undefined {
    if(!this.loggedUser) {
      const username = localStorage.getItem('logged_user');
      const found = this.users.find(el => el.username === username)
      if(found !== undefined) {
        this.loggedUser = found;
      }
    }
   return this.loggedUser;
  }

  logout() {
    localStorage.removeItem('logged_user');
    this.loggedUser = undefined;
  }
}

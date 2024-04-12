import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user-model'; // Verifique se o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private editingUserSubject = new BehaviorSubject<User | null>(null);
  
  users$ = this.usersSubject.asObservable();
  editingUser$ = this.editingUserSubject.asObservable();

  constructor() {}

  addUser(user: User) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }

  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  selectUserForEdit(user: User) {
    this.editingUserSubject.next(user);
  }

  clearEditingUser() {
    this.editingUserSubject.next(null);
  }

  getCurrentEditingUserId(): number | null {
    const currentUser = this.editingUserSubject.value;
    return currentUser ? currentUser.id : null;
  }

  updateUser(updatedUser: User) {
    const users = this.usersSubject.value;
    const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    this.usersSubject.next(updatedUsers);
  }

  removeUser(id: number) {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }
}

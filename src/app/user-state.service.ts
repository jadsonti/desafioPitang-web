// user-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user-model'; // Atualize o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private editingUserId = new BehaviorSubject<number | null>(null);
  users$ = this.usersSubject.asObservable();
  editingUserId$ = this.editingUserId.asObservable();


  constructor() {}

  addUser(user: User) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }

  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  setEditingUserId(id: number | null): void {
    this.editingUserId.next(id);
  }
}

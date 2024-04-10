import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';
import { UserStateService } from '../user-state.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];

  @ViewChild('userDetailsModal') userDetailsModal: UserDetailsModalComponent;

  constructor(private userService: UserService, private userStateService: UserStateService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    }, error => {
      console.error('There was an error!', error);
    });

    this.userStateService.users$.subscribe(users => {
      this.users = users; // Atualiza a lista local de usuários quando houver uma mudança no estado
    });

    this.loadUsers();

  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (response) => {
        let message = `Usuário: ${response.firstName} ${response.lastName}\n`;
        message += `Email: ${response.email}\n`;
        message += `Login: ${response.login}\n`;
        message += `Birthday: ${response.birthday}\n`;
        message += `Phone: ${response.phone}\n`;

        if (response.cars && response.cars.length > 0) {
          message += `Cars:\n`;
          response.cars.forEach(car => {
            message += `  Model: ${car.model} - Year: ${car.manufactureYear} - License Plate: ${car.licensePlate} - Color: ${car.color}\n`;
          });
        }

        alert(message);
      },
      error: (error) => console.error('Erro ao buscar o usuário:', error)
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  showUserDetails(user: any) {
    this.userDetailsModal.show(user);
  }

  removeUser(id: number): void {
    this.userService.removeUserById(id).subscribe({
      next: (response) => {
        console.log('User removed successfully', response);
        // Remova o usuário da lista de usuários no cliente
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (error) => {
        console.error('Error removing user', error);
      }
    });
  }
}
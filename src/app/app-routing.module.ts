import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './user-list/user-list.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // Redireciona o caminho raiz para '/users'
  { path: 'users', component: UsersListComponent }, // Rota para listar usuários
  { path: 'register', component: UserRegistrationComponent }, // Rota para registrar um novo usuário
  // Você pode adicionar mais rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

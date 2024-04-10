import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'user-registration', 
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  isEditMode = false; 
  errorMessage: string = '';
  successMessage: string = ''; 



  constructor(private formBuilder: FormBuilder, private userService: UserService, private userStateService: UserStateService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      // Informações do carro
      manufactureYear: ['', Validators.required],
      licensePlate: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = {
        email: this.registerForm.value.email,
        login: this.registerForm.value.login,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        birthday: this.registerForm.value.birthday,
        phone: this.registerForm.value.phone,
        cars: [{
          manufactureYear: this.registerForm.value.year,
          licensePlate: this.registerForm.value.licensePlate,
          model: this.registerForm.value.model,
          color: this.registerForm.value.color
        }]
      };

      this.userService.registerUser(userData).subscribe({
        next: (response) => {
          this.successMessage = 'User registered successfully';
          this.errorMessage = ''; // Limpa a mensagem de erro
        },
        error: (error) => {
          console.error('Registration error', error);
          this.errorMessage = error; // Aqui você atribui diretamente o erro retornado pelo service
          this.successMessage = ''; // Limpa a mensagem de sucesso
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      this.successMessage = ''; // Limpa a mensagem de sucesso
    }




    
  }
}

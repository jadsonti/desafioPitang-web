import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../user.service';
import { UserStateService } from '../user-state.service';
import { formatDate } from '@angular/common';  

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userStateService: UserStateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToEditingUser();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      cars: this.formBuilder.array([]),
      password: ['', [Validators.minLength(6)]]
    });
    this.addCarGroup();
  }

  formatISODateToDateInput(value: string): string {
    if (!value) return '';
    const date = new Date(value);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  subscribeToEditingUser(): void {
    this.userStateService.editingUser$.subscribe(user => {
      this.isEditMode = !!user;
      this.registerForm.reset();
      this.cars.clear();
      if (user) {
        user.birthday = this.formatISODateToDateInput(user.birthday);
        this.registerForm.patchValue(user);
        user.cars.forEach(car => this.addCarGroup(car));
      } else {
        this.addCarGroup(); 
      }
      this.cdr.detectChanges();
    });
  }

  get cars(): FormArray {
    return this.registerForm.get('cars') as FormArray;
  }

  createCarGroup(car?: any): FormGroup {
    return this.formBuilder.group({
      manufactureYear: [car?.manufactureYear || '', Validators.required],
      licensePlate: [car?.licensePlate || '', Validators.required],
      model: [car?.model || '', Validators.required],
      color: [car?.color || '', Validators.required],
    });
  }

  addCarGroup(car?: any): void {
    this.cars.push(this.createCarGroup(car));
  }

  removeCarGroup(index: number): void {
    this.cars.removeAt(index);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      const action$ = this.isEditMode
        ? this.userService.updateUser(userData.id, userData)
        : this.userService.registerUser(userData);

      action$.subscribe({
        next: (response) => {
          this.successMessage = this.isEditMode ? 'User updated successfully' : 'User registered successfully';
          this.registerForm.reset();
          this.cars.clear();
          this.addCarGroup(); 
          this.isEditMode = false;
          this.cdr.detectChanges(); 
          setTimeout(() => this.successMessage = '', 2500);
        },
        error: (error) => this.processError(error)
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  private processError(error: any): void {
    console.error('Error processing request', error);
    this.errorMessage = error.error.message || 'An unexpected error occurred';
  }
}

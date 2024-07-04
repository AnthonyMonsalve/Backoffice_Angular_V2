import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@services/auth.service';
import { User } from 'src/app/core/models/auth.models';
import { UserService } from 'src/app/user/application/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update.component.html',
})
export class ProfileUpdateFormComponent implements OnInit, OnChanges {
  profileForm!: FormGroup;
  submit: boolean = false;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this._initializeForm(this.currentUser);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && changes.user.currentValue) {
      this._initializeForm(changes.user.currentValue);
    }
  }

  private _initializeForm(user: User | null) {
    this.profileForm = this.fb.group({
      firstName: [user?.profile?.firstName || '', Validators.required],
      lastName: [user?.profile?.lastName || '', Validators.required],
      avatar: [user?.profile?.avatar || ''],
    });
  }

  get form() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submit = true;

    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

      const payload = Object.keys(formData)
        .filter((key) => formData[key] != null && formData[key] !== '')
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = formData[key];
          return obj;
        }, {});

      this.userService.updateUser(payload).subscribe(
        (response) => {
          console.log('Datos enviados con éxito', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Perfil actualizado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });

          // Actualiza el usuario en el servicio de autenticación
          if (this.currentUser) {
            const updatedUser = {
              ...this.currentUser,
              profile: {
                ...this.currentUser.profile,
                ...payload,
              },
            };
            this.authService.updateUser(updatedUser);
          }
        },
        (error) => {
          console.error('Error al actualizar el perfil', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al actualizar el perfil',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }
}

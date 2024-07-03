import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/auth.models';
import { UserService } from 'src/app/user/application/services/user.service';
import Swal from 'sweetalert2';
import { UserStateService } from '../../../application/services/user-state.service';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update.component.html',
})
export class ProfileUpdateFormComponent implements OnInit, OnChanges {
  @Input() user!: User;
  profileForm!: FormGroup;
  submit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userStateService: UserStateService
  ) {}

  ngOnInit(): void {
    this._initializeForm(this.user);
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
          const updatedUser = {
            ...this.user,
            profile: { ...this.user?.profile, ...response.profile },
          };
          this.userStateService.setUser(this.user);
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

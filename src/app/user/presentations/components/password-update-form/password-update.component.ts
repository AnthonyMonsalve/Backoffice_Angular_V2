import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/application/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-update-form',
  templateUrl: './password-update.component.html',
})
export class PasswordUpdateFormComponent implements OnInit {
  passwordForm!: FormGroup;
  submit: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      },
      { validators: this.mustMatch('newPassword', 'confirmNewPassword') }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get form() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;

      const payload = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      this.userService.updatePassword(payload).subscribe(
        (response) => {
          console.log('Contraseña actualizada con éxito', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Contraseña actualizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        (error) => {
          console.error('Error al actualizar la contraseña', error);
          Swal.fire({
            title: 'Error',
            text:
              error.error?.message?.join(' ') ||
              'Hubo un error al actualizar la contraseña',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }
}

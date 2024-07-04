import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/auth.service';
import { UserService } from '@user/application/services/user.service';
import { User } from 'src/app/core/models/auth.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
})
export class UserSettingsComponent implements OnInit {
  user!: User;
  currentUser!: User | null;

  breadCrumbItems: Array<{}> = [
    { label: 'User' },
    { label: 'Admin' },
    { label: 'User Administration', active: true },
  ];

  roleOptions = [
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'SOPORTE' },
    { id: 3, name: 'CLIENTE' },
    { id: 4, name: 'FINANZA' },
    { id: 5, name: 'TECNOLOGIA' },
    { id: 6, name: 'VENTAS' },
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));

    if (userId) {
      this.userService.getUser(userId).subscribe((user: User) => {
        this.user = user;
      });
    }
  }

  onSubmit() {
    if (this.user != null) {
      // Asegurarse de que el rol ADMIN no sea removido
      if (!this.user.roles.includes('ADMIN')) {
        this.user.roles.push('ADMIN');
      }

      this.userService
        .updateUserStatusAndRoles(this.user.id, {
          isActive: this.user.isActive,
          roles: this.user.roles,
        })
        .subscribe(
          () => {
            Swal.fire({
              title: 'Éxito',
              text: 'Perfil actualizado con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });

            // Si el usuario actual es el que se está modificando, actualiza el servicio de autenticación
            if (this.currentUser && this.user.id === this.currentUser.id) {
              this.currentUser.roles = this.user.roles;
              this.authService.updateUser(this.currentUser);
            }
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al actualizar el perfil',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        );
    }
  }

  onToggleActive() {
    if (this.user) {
      this.user.isActive = !this.user.isActive;
    }
  }

  isRoleDisabled(role: string): boolean {
    return role === 'ADMIN';
  }
}

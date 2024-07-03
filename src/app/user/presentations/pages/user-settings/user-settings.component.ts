import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStateService } from '@user/application/services/user-state.service';
import { UserService } from '@user/application/services/user.service';
import { User } from 'src/app/core/models/auth.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
})
export class UserSettingsComponent implements OnInit {
  user!: User;
  breadCrumbItems: Array<{}> = [
    { label: 'User' },
    { label: 'Admin' },
    { label: 'User Administration', active: true },
  ];

  roleOptions = [
    'ADMIN',
    'SOPORTE',
    'CLIENTE',
    'FINANZA',
    'TECNOLOGIA',
    'VENTAS',
  ]; // Define las opciones de roles disponibles

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private userStateService: UserStateService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(userId).subscribe((user: User) => {
        this.user = user;
      });
    }
  }

  onSubmit() {
    // Lógica para enviar los datos del formulario de actualización
    if (this.user != null) {
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
}

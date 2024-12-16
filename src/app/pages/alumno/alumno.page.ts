import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/firestore/users.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  alumnos: any[] = [];

  constructor(
    private loadingController: LoadingController,
    private userService: UserService
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando......',
      spinner: 'circles',
    });
    await loading.present();
    this.userService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.alumnos = data; // Asigna los datos a la variable `usuarios`
        loading.dismiss(); // Oculta el spinner
        console.log('Usuarios:', this.alumnos);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
      complete: () => {
        loading.dismiss(); // Oculta el spinner
      },
    });
  }
}

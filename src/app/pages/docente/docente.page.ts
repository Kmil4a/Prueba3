import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {
  docentes: any[] = [];
  constructor(
    private loadingController: LoadingController,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando......',
      spinner: 'circles',
    });
    await loading.present();
    this.apiService.obtenerUsuarios(10).subscribe({
      next: (response) => {
        this.docentes = response.results;
        loading.dismiss();
        console.log('usuarios cargados:', this.docentes);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        loading.dismiss();
      },
    });
  }
}

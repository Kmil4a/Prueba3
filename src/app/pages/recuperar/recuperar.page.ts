import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  emailValue?: string;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async recuperar() {
    const email = this.emailValue;

    if (!email) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellene todos los campos.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Enviando correo de recuperación...',
      duration: 1000,
      spinner: 'circles',
    });

    await loading.present();

    try {
      await this.authService.recoveryPassword(email);
      const successAlert = await this.alertController.create({
        header: 'Correo de recuperación enviado',
        message:
          'Por favor, revise su correo electrónico para recuperar su contraseña.',
        buttons: ['OK'],
      });
      await successAlert.present();
      successAlert.onDidDismiss().then(() => {
        this.router.navigate(['login']);
      });
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al enviar correo de recuperación.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}

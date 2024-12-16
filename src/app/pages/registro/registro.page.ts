import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  emailValue?: string;
  passValue?: string;
  passConfirmValue?: string;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.menuController.enable(false);
  }

  async registro() {
    const email = this.emailValue;
    const pass = this.passValue;
    const passConfirm = this.passConfirmValue;

    if (!email || !pass || !passConfirm) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellene todos los campos.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    if (pass !== passConfirm) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando...',
      spinner: 'circles',
    });
    await loading.present();
    try {
      const newUser = await this.authService.register(email, pass);
      await loading.dismiss();

      if (newUser) {
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'Registro exitoso.',
          buttons: ['OK'],
        });

        await successAlert.present();

        successAlert.onDidDismiss().then(() => {
          this.navigateToLogin();
        });
      }
    } catch (error) {
      await loading.dismiss();
      console.log(error);
    }
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}

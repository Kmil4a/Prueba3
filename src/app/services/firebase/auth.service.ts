import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  login(email: string, pass: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, pass);
  }
  async register(email: string, pass: string) {
    const userCredential =
      await this.angularFireAuth.createUserWithEmailAndPassword(email, pass);

    const user = userCredential.user;
    if (user) {
      await this.firestore.collection('users').doc(user.uid).set({
        email: user.email,
        name: user.displayName,
        uid: user.uid,
      });
    }
    return userCredential;
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  isLogged(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  async recoveryPassword(email: string) {
    return this.angularFireAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Correo enviado!');
      })
      .catch((error) => {
        console.log('Error al enviar correo de recuperació');
        throw error;
      });
  }
}

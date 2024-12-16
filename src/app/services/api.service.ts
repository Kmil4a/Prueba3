import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // La URL base de la API de randomuser.me
  private ruta = 'https://randomuser.me/api';

  constructor(private httpClient: HttpClient) {}

  // Método para obtener un usuario aleatorio
  obtenerUsuario(): Observable<any> {
    return this.httpClient.get(`${this.ruta}/?results=1`); // Ajustado para obtener un usuario aleatorio
  }

  // Método opcional para obtener múltiples usuarios (ajustado para resultados de 10 usuarios, por ejemplo)
  obtenerUsuarios(numeroDeUsuarios: number): Observable<any> {
    return this.httpClient.get(`${this.ruta}/?results=${numeroDeUsuarios}`);
  }
}

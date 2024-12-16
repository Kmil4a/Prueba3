import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Usuarios Api Random', url: '/docente', icon: 'person' },
    { title: 'Usuarios FireBase', url: '/alumno', icon: 'person' },
  ];
  constructor() {}
}

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio-app', icon: 'home' },
    { title: 'Search', url: '/search', icon: 'archive' },
    { title: 'Cuenta', url: '/myaccount', icon: 'body' },
    { title: 'Carro', url: '/shoping-car', icon: 'cart' },
    { title: 'About Us', url: '/about-us', icon: 'cafe' },
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}

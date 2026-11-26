import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly appName = signal('ConfTech');

  readonly links = signal([
    { label: 'Accueil', href: '#', active: true },
    { label: 'Conférences', href: '#conferences', active: false },
    { label: 'Contact', href: '#contact', active: false },
  ]);
}

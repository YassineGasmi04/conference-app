import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { Footer } from './components/footer/footer';

@Component({
  imports: [Header, Home, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('conference-app');
}

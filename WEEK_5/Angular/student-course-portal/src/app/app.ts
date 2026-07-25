import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public loadingService: LoadingService) {}
}

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NgForm } from '@angular/forms';

import {Title} from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cliente';
  isLoggedIn = false; // Definir la propiedad isLoggedIn como un booleano

  constructor(private authService: AuthService, private TitleService: Title, private BreadcrumbService: BreadcrumbService, private router: Router, private sessionService: SessionService) {
  }

  ngOnInit(): void {
  }
  estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}

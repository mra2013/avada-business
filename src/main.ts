// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [provideRouter([])]
}).catch(err => console.error(err));

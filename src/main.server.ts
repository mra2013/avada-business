// src/main.server.ts
import 'zone.js/node';
import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { provideServerRendering } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';

export function render(url: string, baseHref: string) {
  return renderApplication(AppComponent, {
    appId: 'avada-business',
    document: '<!doctype html><html><body><app-root></app-root></body></html>',
    url,
    providers: [
      provideServerRendering(),
      { provide: APP_BASE_HREF, useValue: baseHref }
    ]
  });
}

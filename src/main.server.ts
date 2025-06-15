// src/main.server.ts

import { enableProdMode } from '@angular/core';
import { renderModule } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module';
import { APP_BASE_HREF } from '@angular/common';

enableProdMode();

export function render(url: string, baseHref: string) {
  return renderModule(AppServerModule, {
    document: '<!doctype html><app-root></app-root>',
    url,
    extraProviders: [
      { provide: APP_BASE_HREF, useValue: baseHref }
    ]
  });
}

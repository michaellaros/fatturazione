/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { enableProdMode, isDevMode } from '@angular/core';

import { environment } from './environments/environment';

export const getBaseUrl = () => {
  if (isDevMode()) {
    return 'http://localhost:56209';
  } else {
    const url = document.getElementsByTagName('base')[0].href;
    const arr = url.split('/');
    return arr[0] + '//' + arr[2] + '//FattureAPI';
  }
};

const providers = [{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

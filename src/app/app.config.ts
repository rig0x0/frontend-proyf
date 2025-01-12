import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { Router } from 'express';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    RouterModule, 
    provideClientHydration(withEventReplay()), provideHttpClient(), SpinnerComponent]
};

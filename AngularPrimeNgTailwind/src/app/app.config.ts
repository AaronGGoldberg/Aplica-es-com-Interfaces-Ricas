import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// PrimeNG
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

// Componentes
import { ButtonModule } from 'primeng/button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),

    providePrimeNG({
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',            
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            }
        }
    }
}),

    importProvidersFrom(ButtonModule)
  ]
};
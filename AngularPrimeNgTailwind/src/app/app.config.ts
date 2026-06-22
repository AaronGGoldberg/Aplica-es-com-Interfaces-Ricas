import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';

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
    provideHttpClient(withInterceptors([authInterceptor])),

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
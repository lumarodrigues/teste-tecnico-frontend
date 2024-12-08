import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ConfigService } from './app/config.service';

if (environment.production) {
  enableProdMode();
}

const configService = new ConfigService();
configService.loadConfig().then(() => {
  platformBrowserDynamic([
    { provide: ConfigService, useValue: configService }
  ])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});

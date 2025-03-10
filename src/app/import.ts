import { NgModule } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
  providers: [BackendApiService, provideHttpClient()]
})
export class ImportsModule {}
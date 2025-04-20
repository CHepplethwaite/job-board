// import { AuthModule } from './features/auth/auth.module';
import { AuthModule } from './state/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    // other imports
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
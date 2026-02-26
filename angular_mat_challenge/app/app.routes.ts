import { Routes } from '@angular/router';
import { TemplateDemo } from './template-demo/template-demo.component';
import { ReactiveDemo } from './reactive-demo/reactive-demo.component';
import { RegisterComponent } from './register/register.component';
import { SportsRegistrationComponent } from './sports-registration/sports-registration.component';

export const routes: Routes = [
  { path: 'template-demo', component: TemplateDemo },
  { path: 'reactive-demo', component: ReactiveDemo },
  { path: 'register', component: RegisterComponent },
  { path: 'sports-registration', component: SportsRegistrationComponent },
  { path: '', redirectTo: 'template-demo', pathMatch: 'full' }
];

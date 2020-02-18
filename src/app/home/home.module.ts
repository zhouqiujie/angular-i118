import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'test',
        component: NavComponent
      }
    ]
  },
  {
    path: 'test1',
    component: NavComponent
  }
]);

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    homeRouting
  ],
  exports: [

  ],
  declarations: [
    HomeComponent,
    NavComponent
  ],
  providers: [
  ],
  entryComponents: [
    NavComponent
  ]
})
export class HomeModule { }

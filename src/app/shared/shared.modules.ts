import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  HeaderComponent, FooterComponent, CustomerServiceComponent,
  LoadingComponent
} from './components';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomerServiceComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CustomerServiceComponent,
    LoadingComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }

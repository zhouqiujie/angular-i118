import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from './shared/shared.modules';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SiteService } from './shared/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LangService } from './shared/services';
// import { CSPComponent } from './csp/csp.component';
// import { ProductComponent } from './product/product.component';
// import { SolutionComponent } from './solution/solution.component';
// import { AboutComponent } from './about/about.component';
// import {
//   UserStoryComponent, UserStoryISVComponent, UserStoryMSPComponent,
//   UserStoryResellerComponent, UserStoryEntryComponent
// } from './user-story';
// import { CooperationComponent } from './cooperation/cooperation.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    // CSPComponent,
    // ProductComponent,
    // SolutionComponent,
    // UserStoryComponent,
    // UserStoryISVComponent,
    // UserStoryMSPComponent,
    // UserStoryResellerComponent,
    // UserStoryEntryComponent,
    // CooperationComponent,
    // AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'web', separator: '.', caseSensitive: true }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      closeButton: true,
      disableTimeOut: true,
      enableHtml: true,
    }) // ToastrModule added
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    SiteService,
    LangService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
// import { CSPComponent } from './csp/csp.component';
// import { ProductComponent } from './product/product.component';
// import { SolutionComponent } from './solution/solution.component';
// import { AboutComponent } from './about/about.component';
// import {
//   UserStoryComponent, UserStoryISVComponent, UserStoryMSPComponent,
//   UserStoryResellerComponent, UserStoryEntryComponent
// } from './user-story';
// import { CooperationComponent } from './cooperation/cooperation.component';


const routes: Routes = [
  /* {
    path: 'home', loadChildren: 'src/app/home/home.module#HomeModule'
  }, */
  {
    path: '', component: IndexComponent
  },
  /* {
    path: 'csp', component: CSPComponent
  },
  {
    path: 'product', component: ProductComponent
  },
  {
    path: 'solution', component: SolutionComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'user-story', component: UserStoryEntryComponent,
    children: [
      {
        path: '', component: UserStoryComponent
      },
      {
        path: 'isv', component: UserStoryISVComponent
      },
      {
        path: 'msp', component: UserStoryMSPComponent
      },
      {
        path: 'reseller', component: UserStoryResellerComponent
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  },
  {
    path: 'cooperation', component: CooperationComponent
  }, */
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

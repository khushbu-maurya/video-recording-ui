import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GenerateFormComponent } from './generate-form/generate-form.component';
import { WebcameraComponent } from './webcamera/webcamera.component';
import { AuthGuard } from './shared/auth.guard';
import { RouteGuard } from './shared/route.guard';
import { CameraAuthGuard } from './shared/camera-auth.guard';
import { VideoRecordsComponent } from './video-records/video-records.component';


const routes: Routes = [
  {
    path:'', redirectTo:'generate-link', 
    pathMatch: 'full'
  },
  {
    path:'generate-link', component:GenerateFormComponent, 
    canActivate:[AuthGuard]
  },
  {
    path:'webcamera/:id', component:WebcameraComponent, 
    // canActivate:[AuthGuard, CameraAuthGuard]
  },
  {
    path:'login', component:LoginComponent, 
    canActivate:[RouteGuard]
  },
  {
    path:'view-records',component:VideoRecordsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

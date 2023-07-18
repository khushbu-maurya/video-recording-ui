import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GenerateFormComponent } from './generate-form/generate-form.component';
import { WebcameraComponent } from './webcamera/webcamera.component';
import { AudioRecordingService } from './shared/audio-recording.service';
import { VideoRecordingService } from './shared/video-recording.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthInterceptor } from './shared/auth.interceptor';
import { VideoRecordsComponent } from './video-records/video-records.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GenerateFormComponent,
    WebcameraComponent,
    VideoRecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [AudioRecordingService,VideoRecordingService,
  {
    provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

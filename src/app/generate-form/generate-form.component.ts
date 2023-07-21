import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import { GenerateLinkPostModel } from '../shared/model/generatelink-post-model';
import { finalize, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css']
})
export class GenerateFormComponent implements OnInit {

  generateLinkForm: FormGroup;
  link: string;
  loading: boolean = false;
  allowSend:boolean = false;
  url:string;
  linkId:string;
  isLoading:boolean = false;

  get email(): FormControl {
    return this.generateLinkForm.get('email') as FormControl;
  }
  get title(): FormControl {
    return this.generateLinkForm.get('title') as FormControl;
  }

  constructor(
    private Location:Location,
    private fb: FormBuilder,
    private generateLinkService: GeneratelinkService,
    private router: Router,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.cerateFrom();
  }

  cerateFrom(): void {
    this.generateLinkForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required]]
    })
  }

  viewRecording(): void {
    this.router.navigate(['/view-records']);
  }

  onGenerateLink(): void {
    let postData: GenerateLinkPostModel = GenerateLinkPostModel.mapFromFormModel(this.generateLinkForm.value)
    this.loading = true;
    const baseUrl  = document.location.origin
    if(baseUrl.includes('https://192.168.0.44:9400')){
      this.link = `${baseUrl}/video-recording-app/#/webcamera/`;
    }else if(baseUrl.includes('https://khushbu-maurya.github.io')){
      this.link = `${baseUrl}/video-recording-ui/#/webcamera/`;
    }
    else{
      this.link = `${baseUrl}/#/webcamera/`;
    }
    postData.link = this.link;
    this.generateLinkService.generateLinkApi(postData).pipe(take(1), finalize(() => this.loading = false)).subscribe({
      next: (res) => {
          localStorage.setItem('linkId',res.linkid);
          this.generateLinkForm.reset();
          this.allowSend = true;
          this.url = res.link;
          this.linkId = res.linkid;
          this.snackBar.open("Link Generated Successfully!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
      },error:(err) => {
        this.snackBar.open("Something Went Wrong!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
      }
    })
  }

  onSendLink(): void {
    this.isLoading = true;
      this.generateLinkService.sendLinkApi(this.linkId).pipe(take(1),finalize(() => this.isLoading = false)).subscribe({
        next:(res) => {
          this.snackBar.open("Link Send to Email Successfully!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
        },error:(err) => {
          this.snackBar.open("Something Went Wrong!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
        }
      })
  }

  copied(): void {
    this.snackBar.open("Copied!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
  }
}

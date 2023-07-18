import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import { GenerateLinkPostModel } from '../shared/model/generatelink-post-model';
import { finalize, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css']
})
export class GenerateFormComponent implements OnInit {

  generateLinkForm: FormGroup;
  link: string;
  loading: boolean = false;

  get email(): FormControl {
    return this.generateLinkForm.get('email') as FormControl;
  }
  get title(): FormControl {
    return this.generateLinkForm.get('title') as FormControl;
  }

  constructor(
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

  onGenerateLink(): void {
    
    let postData: GenerateLinkPostModel = GenerateLinkPostModel.mapFromFormModel(this.generateLinkForm.value)
    this.loading = true;
    const baseUrl  = document.location.origin
    this.link = `${baseUrl}/webcamera/` ;
    postData.link = this.link;
    this.generateLinkService.generateLinkApi(postData).pipe(take(1), finalize(() => this.loading = false)).subscribe({
      next: (res) => {
          localStorage.setItem('linkId',res.linkid);
          this.snackBar.open("Link Generated Successfully!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
      },error:(err) => {
        this.snackBar.open("Something Went Wrong!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
      }
    })
  }
}

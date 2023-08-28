import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilePond, FilePondOptions } from 'filepond';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import { take, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css']
})
export class UpdateRecordComponent implements OnInit {

  updateRecordForm: FormGroup
  logo:any;
  logoName:string
  loading:boolean = false
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Upload Logo here...',
    credits: false,
    acceptedFileTypes: [ 'image/*'],
    labelFileTypeNotAllowed: 'This file type is not allowed.',
    fileValidateTypeLabelExpectedTypes: '',
    maxFiles: 15,
    allowFileTypeValidation: true,
  }
  constructor(
    private fb: FormBuilder,
    private generateService:GeneratelinkService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateRecordComponent>
  ) {

  }
  
  ngOnInit(): void {
    this.createForm();
    this.setForm();
  }

  createForm(): void {
     this.updateRecordForm = this.fb.group({
       title: ['', []],
       logo: [''],
     })
  }
  
  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }

  onFileSelected(event) {
    this.logo = event.file.file;
    this.updateRecordForm.patchValue({
      logo: event.file.file
    })
  }

  onRemoveFile(): void {
    this.logo = null;
    this.updateRecordForm.patchValue({
      logo: []
    })
  }

  setForm(): void {
    this.updateRecordForm.patchValue(this.data.data);
    this.logoName = this.data.data.logo.slice(47);
  }

  updateRecord(): void {
    console.log(this.data);
    const formData: FormData = new FormData();
    formData.append('title', this.updateRecordForm.value.title);
    if(this.logo){
      formData.append('file',this.logo);
    }
    this.generateService.updateRecord(this.data.linkId, formData).pipe(take(1), finalize(() => {this.loading =false})).subscribe({
      next:(res) => {
          this.onClose(true);
      },error:(err) => {
        this.onClose(false);
      }
    })
  }
}

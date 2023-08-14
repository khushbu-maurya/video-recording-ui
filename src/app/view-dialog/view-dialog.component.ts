import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import { take } from 'rxjs';
import * as moment from "moment";
import { IFileAPiModel } from '../shared/model/get-file-api-model';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.css']
})
export class ViewDialogComponent implements OnInit{

  linkId:string;
  viewRecordList:IFileAPiModel[] = [];
  constructor(
    private generateService: GeneratelinkService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewDialogComponent>,
  ){}

  ngOnInit(): void {
    this.linkId = this.data.linkId;
    this.getRecordedFile();
  }

  
  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }

  downloadFile(url:string) {
  
    fetch(url, {
      method: 'GET',
      // headers: {
      //   'ngrok-skip-browser-warning':'true',
      // },
    })
  .then(res => res.blob()) 
  .then(blob => {
    const a = document.createElement('a')
    let objectURL = URL.createObjectURL(blob);
    a.href  = objectURL;
    a.download = url.slice(47,63);
    a.click();
    URL.revokeObjectURL(objectURL);
  }).catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }

  getRecordedFile() {
    this.generateService.getRecordedFileApi(this.linkId).pipe(take(1)).subscribe(
      {
        next:(res) => {
              this.viewRecordList = res.LinkUser;
              this.viewRecordList.forEach((res) =>{
                res.createdAt = moment(new Date(res.createdAt)).format().slice(0,10);
              })
        }
      }
    )
  }
}

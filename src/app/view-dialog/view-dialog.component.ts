import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import { take } from 'rxjs';
import * as moment from "moment";
import { IFileAPiModel, IFileLinkApiModel } from '../shared/model/get-file-api-model';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.css']
})
export class ViewDialogComponent implements OnInit {

  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;
  createdAt: string;
  linkId: string;
  viewRecordList: IFileAPiModel[] = [];
  files: IFileLinkApiModel[] = []
  currentVideoUrl: string | null = null;
  constructor(
    private generateService: GeneratelinkService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.linkId = this.data.linkId;
    this.getRecordedFile();
  }

  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }

  downloadFile(url: string) {

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
        a.href = objectURL;
        a.download = url.slice(47);
        a.click();
        URL.revokeObjectURL(objectURL);
      }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  playRecording(url: string) {
    this.currentVideoUrl = url;
    this.videoElement.nativeElement.src = this.currentVideoUrl
  }
  

  getRecordedFile() {
    this.generateService.getRecordedFileApi(this.linkId).pipe(take(1)).subscribe(
      {
        next: (res) => {
          this.viewRecordList = res.LinkUser;
          this.files = this.viewRecordList[0].files;
          this.files.forEach((file) => {
            file.createAt = moment(new Date(res.LinkUser[0].createdAt)).format().slice(0, 10);
          })
          this.createdAt = moment(new Date(res.LinkUser[0].createdAt)).format().slice(0, 10);
        }
      }
    )
  }
}

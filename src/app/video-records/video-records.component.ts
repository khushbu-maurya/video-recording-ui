import { Component, OnInit } from '@angular/core';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import {take} from 'rxjs';
import { IFileAPiModel } from '../shared/model/get-file-api-model';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';

@Component({
  selector: 'app-video-records',
  templateUrl: './video-records.component.html',
  styleUrls: ['./video-records.component.css']
})
export class VideoRecordsComponent implements OnInit{

  recordList: IFileAPiModel[] = [];
  constructor(
    private generateService: GeneratelinkService,
    private dialog:MatDialog){}

  ngOnInit(): void {
    this.getPreviuosRecord();
  }

  getPreviuosRecord() {
    this.generateService.getFilesApi().pipe(take(1)).subscribe({
      next:(res) => {
          console.log(res);
          this.recordList = res.LinkUser
      },error:(err) =>{
        console.log(err);
      }
    }) 
  }

  downloadFile() {
    fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
  .then(res => res.blob()) // Gets the response and returns it as a blob
  .then(blob => {
    const a = document.createElement('a')
    let objectURL = URL.createObjectURL(blob);
    a.href  = objectURL;
    a.download = 'dummy';
    a.click();
    URL.revokeObjectURL(objectURL);
});
  }

 openView(linkId:string) {
  console.log(linkId);
   const dialog = this.dialog.open(ViewDialogComponent, {
    data:{
      linkId:linkId
    },
    height: 'max-content',
    width: '600px'
   })

   dialog.afterClosed().subscribe({
    next:(res) => {
        
    }
   })
 }
}

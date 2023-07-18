import { Component, OnInit } from '@angular/core';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import {take} from 'rxjs';
import { IFileAPiModel } from '../shared/model/get-file-api-model';

@Component({
  selector: 'app-video-records',
  templateUrl: './video-records.component.html',
  styleUrls: ['./video-records.component.css']
})
export class VideoRecordsComponent implements OnInit{

  recordList: IFileAPiModel[] = [];
  constructor(private generateService: GeneratelinkService){}

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

  Download(url:string): any {
    debugger
  //  const anchor = document.createElement('a');
  //  anchor.download = url.slice(50);
  //  anchor.href = url;
  //  document.body.appendChild(anchor);
  //  anchor.click();
  //  document.body.removeChild(anchor);
  const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = url.slice(50);
    a.click();
    URL.revokeObjectURL(url);
 }
}

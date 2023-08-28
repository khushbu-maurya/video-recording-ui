import { Component, OnInit } from '@angular/core';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import { finalize, take } from 'rxjs';
import { IFileAPiModel } from '../shared/model/get-file-api-model';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';
import { Route, Router } from '@angular/router';
import { UpdateRecordComponent } from '../update-record/update-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video-records',
  templateUrl: './video-records.component.html',
  styleUrls: ['./video-records.component.css']
})
export class VideoRecordsComponent implements OnInit {

  recordList: IFileAPiModel[] = [];
  loading: boolean = false;
  constructor(
    private generateService: GeneratelinkService,
    private snackBar:MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPreviuosRecord();
  }

  getPreviuosRecord() {
    this.loading = true;
    this.generateService.getFilesApi().pipe(take(1), finalize(() => {
      this.loading = false;
    })).subscribe({
      next: (res) => {
        this.recordList = res.LinkUser
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  openView(linkId: string) {
    console.log(linkId);
    const dialog = this.dialog.open(ViewDialogComponent, {
      data: {
        linkId: linkId
      },
      height: '70vh',
      width: '600px'
    })

    dialog.afterClosed().subscribe({
      next: (res) => {

      }
    })
  }

  backToDefault() {
    this.router.navigate(['/generate-link'])
  }

  updateView(data: IFileAPiModel) {
    const dialog = this.dialog.open(UpdateRecordComponent, {
      data: {
        data:data,
        linkId:data.linkid
      },
      height:'max-content',
      width: '600px'
    })

    dialog.afterClosed().subscribe({
      next:(res) => {
        if(res === true){
          this.getPreviuosRecord();
          this.snackBar.open("Record Updated Successfully!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
        }
      },error: (err) => {
        
      }
    })
  }

}

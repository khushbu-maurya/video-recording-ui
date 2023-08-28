import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from '../shared/audio-recording.service';
import { VideoRecordingService } from '../shared/video-recording.service';
import { GeneratelinkService } from '../shared/service/generatelink.service';
import {take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-webcamera',
  templateUrl: './webcamera.component.html',
  styleUrls: ['./webcamera.component.css']
})
export class WebcameraComponent implements OnInit, AfterViewInit {
   
  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;
  video: any;
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime;
  videoRecordedTime;
  audioBlobUrl;
  videoBlobUrl;
  audioBlob;
  videoBlob;
  audioName;
  videoName;
  audioStream;
  videoStream: MediaStream;
  audioConf = { audio: true}
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true}
  logo;
  isLogo: boolean = false;
  isVideoUploading: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer,
    private generateService: GeneratelinkService,
    private snackBar:MatSnackBar
  ){
    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      if(!this.isVideoRecording && this.videoBlobUrl){
        this.downloadVideoRecordedData();
      }
      this.ref.detectChanges();
    });

//     this.audioRecordingService.recordingFailed().subscribe(() => {
//       this.isAudioRecording = false;
//       this.ref.detectChanges();
//  });

    // this.audioRecordingService.getRecordedTime().subscribe((time) => {
    //   this.audioRecordedTime = time;
    //   this.ref.detectChanges();
    // });

    // this.audioRecordingService.getRecordedBlob().subscribe((data) => {
    //   this.audioBlob = data.blob;
    //   this.audioName = data.title;
    //   this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    //   this.ref.detectChanges();
    // });
  }

  ngOnInit(): void {
    // this.startCamera();
    this.getLogo()
  }

  ngAfterViewInit(): void {
    if(this.videoElement?.nativeElement){
      this.video = this.videoElement.nativeElement;
      this.startCamera();
    } 
  }
  
  async startCamera() {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = stream;
      this.videoElement.nativeElement.play();
    } catch (error) {
      this.snackBar.open('Device Not Found!!!', 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
      console.error('Error accessing user media', error);
    }
  }

  startVideoRecording() {
    if (!this.isVideoRecording) {
      if(this.video){
        this.video.controls = false;
      }
      this.isVideoRecording = true;
      this.videoRecordingService.startRecording(this.videoConf)
      .then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
    }
  }

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.video.controls = false;
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
    }
  }

  clearVideoRecordedData() {
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.startCamera();
    this.ref.detectChanges();
  }

  downloadVideoRecordedData() {
    if(!this.isVideoRecording && this.videoBlobUrl){
    const blob = this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
    this.uploadFile(blob)
    }
  }

  uploadFile(blobFile:any) {
    const formData=  new FormData();
    formData.append('file', blobFile, this.videoName); 
    let linkId = localStorage.getItem('linkId');
    this.isVideoUploading = true;
    this.generateService.uploadFIleApi(formData, linkId).pipe(take(1)).subscribe({
      next:(res) => {
        this.isVideoUploading = false;
         this.ref.detectChanges();
         this.snackBar.open("Video Saved Successfully!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 }); 
      },
      error:(err) => {
        this.isVideoUploading = false;
        this.ref.detectChanges();
        this.snackBar.open("Something Went Wrong!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
      }
    })
  }

  // startAudioRecording() {
  //   if (!this.isAudioRecording) {
  //     this.isAudioRecording = true;
  //     this.audioRecordingService.startRecording();
  //   }
  // }

  // abortAudioRecording() {
  //   if (this.isAudioRecording) {
  //     this.isAudioRecording = false;
  //     this.audioRecordingService.abortRecording();
  //   }
  // }

  // stopAudioRecording() {
  //   if (this.isAudioRecording) {
  //     this.audioRecordingService.stopRecording();
  //     this.isAudioRecording = false;
  //   }
  // }

  // clearAudioRecordedData() {
  //   this.audioBlobUrl = null;
  // }

  // downloadAudioRecordedData() {
  //   this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
  // }

  // ngOnDestroy(): void {
  //   this.abortAudioRecording();
  // }

  _downloadFile(data: any, type: string, filename: string): any {
     const blob = new Blob([data], { type: type });
     return blob
    // this.video.srcObject = stream;
    // const url = data;
  
    // const anchor = document.createElement('a');
    // anchor.download = filename;
    // anchor.href = url;
    // document.body.appendChild(anchor);
    // anchor.click();
    // document.body.removeChild(anchor);
  }
  
  getLogo(){
    let linkId = localStorage.getItem('linkId');
    this.generateService.getLogo(linkId).subscribe({
      next:(res) => {
        console.log(res);
        if(!(res.logo == 'https://62.72.13.210:5001/undefined')){
          this.logo = res.logo;
          this.isLogo = true;
        }
        else {
          this.logo = null;
          this.isLogo =false;
        }
      }
    })
  }

}

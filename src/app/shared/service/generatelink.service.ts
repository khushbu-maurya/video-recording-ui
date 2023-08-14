import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenerateLinkPostModel } from '../model/generatelink-post-model';
import { IGenerateLinkApiModel } from '../model/generatelink-api-model';
import { Observable } from 'rxjs';
import { IGetFilesApiModel } from '../model/get-file-api-model';
import { ILogoResModel } from '../model/logo-api-model';

@Injectable({
  providedIn: 'root'
})
export class GeneratelinkService {

  constructor(
    private httpClient:HttpClient
  ) { }

  generateLinkApi(postData: any): Observable<IGenerateLinkApiModel> {
    return this.httpClient.post<IGenerateLinkApiModel>('/api/user/generatelink',postData)
  }

  uploadFIleApi(postData:any, id:string) {
    return this.httpClient.post(`/api/user/upload/${id}`, postData);
  }

  getFilesApi() {
    // return this.httpClient.get<IGetFilesApiModel[]>('https://f3a7-103-250-151-79.ngrok-free.app/api/user/getfile');
    return this.httpClient.get<IGetFilesApiModel>('/api/user/getfile')
  }

  getRecordedFileApi(id:string) {
     return this.httpClient.get<IGetFilesApiModel>(`/api/user/getfile?id=${id}`)
  }

  sendLinkApi(id:string) {
    return this.httpClient.get(`/api/user/sendemail/${id}`)
  }

  getLogo(id:string) {
    return this.httpClient.get<ILogoResModel>(`api/user/logo/${id}`)
  }

}

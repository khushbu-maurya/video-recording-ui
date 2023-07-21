import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenerateLinkPostModel } from '../model/generatelink-post-model';
import { IGenerateLinkApiModel } from '../model/generatelink-api-model';
import { Observable } from 'rxjs';
import { IGetFilesApiModel } from '../model/get-file-api-model';

@Injectable({
  providedIn: 'root'
})
export class GeneratelinkService {

  baseUrl: 'https://75ea-103-250-151-79.ngrok-free.app';

  constructor(
    private httpClient:HttpClient
  ) { }

  generateLinkApi(postData: GenerateLinkPostModel): Observable<IGenerateLinkApiModel> {
    return this.httpClient.post<IGenerateLinkApiModel>('https://192.168.0.168:5002/api/user/generatelink',postData)
  }

  uploadFIleApi(postData:any, id:string) {
    return this.httpClient.post(`https://192.168.0.168:5002/api/user/upload/${id}`, postData);
  }

  getFilesApi() {
    // return this.httpClient.get<IGetFilesApiModel[]>('https://f3a7-103-250-151-79.ngrok-free.app/api/user/getfile');
    return this.httpClient.get<IGetFilesApiModel>('https://192.168.0.168:5002/api/user/getfile')
  }

  getRecordedFileApi(id:string) {
     return this.httpClient.get<IGetFilesApiModel>(`https://192.168.0.168:5002/api/user/getfile?id=${id}`)
  }

  sendLinkApi(id:string) {
    return this.httpClient.get(`https://192.168.0.168:5002/api/user/sendemail/${id}`)
  }
}

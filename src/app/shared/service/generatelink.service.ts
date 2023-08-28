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
  
  baseUrl = 'https://62.72.13.210:5001/';
  constructor(
    private httpClient:HttpClient
  ) { }
  
  generateLinkApi(postData: any): Observable<IGenerateLinkApiModel> {
    return this.httpClient.post<IGenerateLinkApiModel>(`${this.baseUrl}api/user/generatelink`,postData)
  }

  uploadFIleApi(postData:any, id:string) {
    return this.httpClient.post(`${this.baseUrl}api/user/upload/${id}`, postData);
  }

  getFilesApi() {
    return this.httpClient.get<IGetFilesApiModel>(`${this.baseUrl}api/user/getfile`)
  }

  getRecordedFileApi(id:string) {
     return this.httpClient.get<IGetFilesApiModel>(`${this.baseUrl}api/user/getfile?id=${id}`)
  }

  sendLinkApi(id:string) {
    return this.httpClient.get(`${this.baseUrl}api/user/sendemail/${id}`)
  }

  getLogo(id:string) {
    return this.httpClient.get<ILogoResModel>(`${this.baseUrl}api/user/logo/${id}`)
  }
  
  updateRecord(id:string, formdata:any) {
    return this.httpClient.put(`${this.baseUrl}api/user/edittitle/${id}`, formdata)
  }
}

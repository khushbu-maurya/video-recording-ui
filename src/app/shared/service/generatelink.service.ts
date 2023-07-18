import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenerateLinkPostModel } from '../model/generatelink-post-model';
import { IGenerateLinkApiModel } from '../model/generatelink-api-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratelinkService {

  constructor(
    private httpClient:HttpClient
  ) { }

  generateLinkApi(postData: GenerateLinkPostModel): Observable<IGenerateLinkApiModel> {
    return this.httpClient.post<IGenerateLinkApiModel>('https://f3a7-103-250-151-79.ngrok-free.app/api/user/generatelink',postData)
  }

  uploadFIleApi(postData:any, id:string) {
    return this.httpClient.post(`https://f3a7-103-250-151-79.ngrok-free.app/api/user/upload/${id}`, postData);
  }
}

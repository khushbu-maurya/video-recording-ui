import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPostModel } from '../model/login-post-model';
import { ILoginApiModel } from '../model/login-api-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient:HttpClient
  ) { }

  loginApi(formData: LoginPostModel): Observable<ILoginApiModel> {
    return this.httpClient.post<ILoginApiModel>('http://192.168.0.168:5002/api/user/login',formData)
  }
}

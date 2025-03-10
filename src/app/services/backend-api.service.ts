import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {
    
  private readonly BASE_URI = environment.BACKEND_URI;

  constructor(private http: HttpClient) { }

  getNearestLocations(params: any): Observable<any> {
    //?latitude=' + latitude + '&longitude=' + longitude + '&km=' + radius
    return this.http.get<any>(this.BASE_URI + '/nearest', { params: params });
  }
  
}
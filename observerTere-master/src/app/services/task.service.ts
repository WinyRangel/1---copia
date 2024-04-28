import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL = 'https://servidor-unity-1.onrender.com/api/user';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(this.URL + '/tasks');
  }

  getPrivateTasks() {
    return this.http.get<any>(this.URL + '/private-tasks');
  }
}

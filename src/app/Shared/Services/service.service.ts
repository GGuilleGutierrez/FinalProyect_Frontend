import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILog, Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getProds(url: string) {
    return this.http.get(url)
  }

  addProducts(url: string, data: any) {
    return this.http.post(url, data)
  }

  editProducts(url: string, data: any) {
    return this.http.put(url, data)
  }

  deleteProducts(url: string) {
    return this.http.delete(url)
  }

  register(url: string, data: any) {
    return this.http.post(url, data)
  }

  login(url: string, data: any) {
    return this.http.post(url, data)
  }

  getUsers(url: string) {
    return this.http.get(url)
  }

  deleteUser(url: string) {
    return this.http.delete(url)
  }
}



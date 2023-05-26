import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  @Output() toCart: EventEmitter<any> = new EventEmitter();

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

  registerUser(url: string, data: any) {
    return this.http.post(url, data)
  }

  registerAdmin(url: string, data: any) {
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

  preferenceId!: any;

  buy(url: string, cart: any) {
    return this.http.post<any>(url, {cart} ).subscribe(response => {
      this.preferenceId = response.preferenceId;
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${this.preferenceId}`;
      localStorage.removeItem("listCart");
      localStorage.removeItem("badge");
    }, error => {
      console.log(error);
    })
  }
}



// Import required modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from './config';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {

  }
  // obtain orders for specified users
  public getShoworder(data: any): Observable<any> {
    return this.http.post<any>(url + `order/showorder`, data);
  }
  // obtain orders for specified product
  public getDetailorder(data: any): Observable<any> {
    return this.http.post<any>(url + `order/detailOrder`, data);
  }
  // add order
  public addOrder(data: any): Observable<any> {
    return this.http.post<any>(url + `order`, data);
  }
  // obtain all the order
  public getOrderList(): Observable<any> {
    return this.http.get<any>(url + 'order');
  }

  // update order
  public updateOrder(data: any): Observable<any> {
    return this.http.put<any>(url + `order/ChangeState`, data);
  }

  // add comment
  public updateAddComment(data: any): Observable<any> {
    return this.http.put<any>(url + `order/addComment`, data);
  }
}

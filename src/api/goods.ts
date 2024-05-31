// Import required modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from './config';

@Injectable()
export class GoodsService {
  constructor(private http: HttpClient) {

  }
  // get classification list
  public getSort(): Observable<any> {
    return this.http.get<any>(url + "sort");
  }
  // product list
  public getGoodsList(data: any): Observable<any> {
    return this.http.get<any>(url + 'goods', { params: data });
  }

  // product detail
  public getGoodsDetail(id: any): Observable<any> {
    return this.http.get<any>(url + `goods/detail/${id}`);
  }

  // add product
  public addGoods(data: any): Observable<any> {
    return this.http.post<any>(url + 'goods', data);
  }

  // update product
  public updateGoods(data: any): Observable<any> {
    return this.http.put<any>(url + `goods/${data.id}`, data);
  }

  // delete product
  public deleteGoods(id: any): Observable<any> {
    return this.http.delete<any>(url + `goods/${id}`);
  }
  // upload product picture
  public uploadPic(data: any): Observable<any> {
    return this.http.post<any>(url + `goods/upLoad`, data);
  }
}

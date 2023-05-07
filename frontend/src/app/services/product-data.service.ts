import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ProductResponce } from './../../types'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private url = 'http://localhost:3000/inventories';
   
  constructor(private httpClient: HttpClient) { }
  
  getProduct(page: number): Observable<ProductResponce>{
    const params = new HttpParams().set('page', String(page));
    return this.httpClient.get<ProductResponce>(this.url, { params });
  }
}

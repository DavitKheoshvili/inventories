import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../../types'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private url = 'http://localhost:3000/inventories';
   
  constructor(private httpClient: HttpClient) { }
  
  getProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url);
  }
}

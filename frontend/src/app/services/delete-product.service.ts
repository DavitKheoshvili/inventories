import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Product, ProductResponce } from './../../types'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeleteProductService {
  private baseUrl = 'http://localhost:3000/inventories';
   
  constructor(private httpClient: HttpClient) { }
  
  deleteProduct(id: number | undefined): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url);
  }
}

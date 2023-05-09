import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Product, ProductResponce } from './../../types'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductService {
  private baseUrl = environment.inventoriesApiUrl;
   
  constructor(private httpClient: HttpClient) { }
  
  deleteProduct(id: number | undefined): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url);
  }
}

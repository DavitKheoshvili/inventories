import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Product, ProductResponce } from './../../types'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private url = environment.inventoriesApiUrl;
   
  constructor(private httpClient: HttpClient) { }
  
  addProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.url, product);
  }
}

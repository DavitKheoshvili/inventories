import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ProductResponce } from './../../types'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private url = environment.inventoriesApiUrl;
   
  constructor(private httpClient: HttpClient) { }
  
  getProduct(page: number, sortBy: string, location: string ): Observable<ProductResponce>{
    const params = new HttpParams().set('page', String(page)).set('sortBy', String(sortBy)).set('location', String(location));
    return this.httpClient.get<ProductResponce>(this.url, { params });
  }
}

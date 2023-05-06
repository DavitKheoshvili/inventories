import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private url = 'http://localhost:3000/inventories';
   
  constructor(private httpClient: HttpClient) { }
  
  getProduct(){
    return this.httpClient.get(this.url);
  }
}

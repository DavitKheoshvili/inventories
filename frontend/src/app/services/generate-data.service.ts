import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../../types'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenerateDataService {
  private url = 'http://localhost:3000/generate_random_data';
   
  constructor(private httpClient: HttpClient) { }
  
  generateData(){
    console.log("generatedData fired");
    return this.httpClient.get(this.url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateDataService {
  private url = environment.generateDataUrl;
   
  constructor(private httpClient: HttpClient) { }
  
  generateData(){
    console.log("generatedData fired");
    return this.httpClient.get(this.url);
  }
}

import { Component } from '@angular/core';
import { ProductDataService } from "./services/product-data.service"
import { Product } from "./../types"
import { GenerateDataService } from './services/generate-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  products: Product[] = [];
  currentPage = 1;
  pageSize = 20;
  totalPages = 0;

  constructor(private service: ProductDataService, private generateService: GenerateDataService) { }

  ngOnInit() {
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        console.log("data", response);
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }
  onGenerate() {
    this.generateService.generateData().subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error);
    });
  }
  prevPage() {
    console.log("prevPage fired");
    this.currentPage--;
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        console.log("data", response);
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }

  nextPage() {
    console.log("nextPage fired");
    this.currentPage++;
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        console.log("data", response);
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }

}

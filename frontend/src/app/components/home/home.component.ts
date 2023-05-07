import { Component } from '@angular/core';
import { ProductDataService } from "../../services/product-data.service"
import { Product } from "../../../types"
import { GenerateDataService } from '../../services/generate-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = [];
  currentPage = 1;
  pageSize = 20;
  totalPages = 0;

  constructor(private service: ProductDataService) { }

  ngOnInit() {
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        console.log("data", response);
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
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

import { Component } from '@angular/core';
import { ProductDataService } from "../../services/product-data.service"
import { Product } from "../../../types"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = [];
  currentPage = 1;
  totalPages = 0;

  constructor(private service: ProductDataService) { }

  ngOnInit() {
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }
  
  prevPage() {
    this.currentPage--;
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }

  nextPage() {
    this.currentPage++;
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }
}

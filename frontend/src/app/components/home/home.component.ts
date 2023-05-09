import { Component } from '@angular/core';
import { ProductDataService } from "../../services/product-data.service"
import { Product } from "../../../types"
import { DeleteProductService } from "../../services/delete-product.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;

  sortBy: string = 'name';
  location: string = "";

  constructor(private service: ProductDataService, private deleteService: DeleteProductService) { }

  ngOnInit() {
    this.service.getProduct(this.currentPage, this.sortBy, this.location)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;
      }
      );
  }
  setSortBy(sortBy: string) {
    this.sortBy = sortBy;
    this.service.getProduct(this.currentPage, this.sortBy, this.location)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }

  setLocation(location: string) {
    this.location = location;
    this.service.getProduct(this.currentPage, this.sortBy, this.location)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }
  onDeleteProduct(id: number | undefined) {
    this.deleteService.deleteProduct(id).subscribe(() => {
      this.service.getProduct(this.currentPage, this.sortBy, this.location)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;
      }
      );
    }, (error) => {
      console.error(error);
    });
  }
  
  prevPage() {
    this.currentPage--;
    this.service.getProduct(this.currentPage, this.sortBy, this.location)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }

  nextPage() {
    this.currentPage++;
    this.service.getProduct(this.currentPage, this.sortBy, this.location)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }
}

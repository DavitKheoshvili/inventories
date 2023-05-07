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
  currentPage = 1;
  totalPages = 0;

  constructor(private service: ProductDataService, private deleteService: DeleteProductService) { }

  ngOnInit() {
    this.service.getProduct(this.currentPage)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
  }

  onDeleteProduct(id: number | undefined) {
    this.deleteService.deleteProduct(id).subscribe(() => {
      this.service.getProduct(this.currentPage)
      .subscribe(response => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      }
      );
    }, (error) => {
      console.error(error);
    });
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

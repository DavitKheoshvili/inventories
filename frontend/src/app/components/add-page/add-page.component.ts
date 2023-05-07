import { Component } from '@angular/core';
import { Product } from 'src/types';
import { AddProductService } from 'src/app/services/add-product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {
  product: Product = { name: '', price: 0, location: '' };
  
  constructor(private addProductService: AddProductService, private router: Router) {}

  onSubmit() {
    console.log(this.product);
    this.addProductService.addProduct(this.product).subscribe((result) => {
      this.router.navigateByUrl('/');
    });
  }
}

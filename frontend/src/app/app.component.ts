import { Component } from '@angular/core';
import { ProductDataService } from "./services/product-data.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  products:any;
  
  constructor(private service:ProductDataService) {}
  
  ngOnInit() {
      this.service.getProduct()
        .subscribe(response => {
          console.log("data", response);
          this.products = response;
        });
  }
}

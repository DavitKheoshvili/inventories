import { Component } from '@angular/core';
import { GenerateDataService } from './services/generate-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private generateService: GenerateDataService) {}

  onGenerate() {
    this.generateService.generateData().subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error);
    });
  }
}

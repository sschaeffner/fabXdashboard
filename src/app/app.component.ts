import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fabX';
  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' });
  }
}

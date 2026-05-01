import { Component, Inject } from '@angular/core';
import { versionConfig } from '../../../app.config';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  version: string;

  constructor(@Inject('AppConfig') private config: typeof versionConfig) {
    this.version = this.config.version;
  }
}

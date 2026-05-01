import { Component } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading: ReplaySubject<boolean>;
  segments = Array(12).fill(0);

  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading;

  }
}

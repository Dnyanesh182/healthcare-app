import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new ReplaySubject<boolean>();

	public show() : void
	{
		this.isLoading.next(true);
	}

	public hide() : void
	{
		this.isLoading.next(false);
	}
}

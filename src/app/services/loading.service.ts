import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  @BlockUI() blockUI!: NgBlockUI;

  setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
    if (isLoading) {
      this.blockUI.start('Loading...'); // Start blocking UI
    } else {
      this.blockUI.stop(); // Stop blocking UI
    }
  }
}
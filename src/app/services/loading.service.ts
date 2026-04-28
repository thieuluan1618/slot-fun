import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private loadingMessage = new BehaviorSubject<string>('Loading...');

  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();
  public message$: Observable<string> = this.loadingMessage.asObservable();

  show(message: string = 'Loading...'): void {
    this.loadingMessage.next(message);
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }

  get isLoading(): boolean {
    return this.loadingSubject.value;
  }
}

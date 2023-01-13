import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {ToastEvent} from "../toast/toast-event";
import {EventType} from "../toast/event-type";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showSuccessToast(title: string, message: string | undefined = undefined): void {
    this._toastEvents.next(new ToastEvent(title, message, EventType.Success));
  }

  showErrorToast(title: string, message: string | undefined = undefined): void {
    this._toastEvents.next(new ToastEvent(title, message, EventType.Error));
  }

  showWarningToast(title: string, message: string | undefined = undefined): void {
    this._toastEvents.next(new ToastEvent(title, message, EventType.Warning));
  }

  showInfoToast(title: string, message: string | undefined = undefined): void {
    this._toastEvents.next(new ToastEvent(title, message, EventType.Info));
  }
}

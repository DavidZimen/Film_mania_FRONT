import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastEvent} from "../toast-event";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterComponent implements OnInit {

  currentToasts: ToastEvent[] = [];

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts(): void {
    this.toastService.toastEvents.subscribe({
      next: (toast) => {
        const currentToast: ToastEvent = new ToastEvent(toast.title, toast.message, toast.eventType);
        this.currentToasts.push(currentToast);
        this.cdr.detectChanges();
      },
      error: () => {},
      complete: () => {}
    });
  }

  dispose(index: number): void {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}

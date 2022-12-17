import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EventType} from "../event-type";
import {Toast} from "bootstrap";
import {fromEvent, take} from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input()
  title!: string;

  @Input()
  message!: string;

  @Input()
  type!: EventType;

  @Output()
  disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  toast!: Toast;

  constructor() { }

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      {
        autohide: true,
        delay: 5000,
      }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());
    this.toast.show();
  }

  hide(): void {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}

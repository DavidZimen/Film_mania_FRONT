import {EventType} from "./event-type";

export class ToastEvent {
  constructor(
    public title: string,
    public message: string | undefined,
    public eventType: EventType) {
  }
}

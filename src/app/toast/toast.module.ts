import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    ToasterComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToasterComponent
  ]
})
export class ToastModule { }

import { Injectable } from '@angular/core';

declare let toastr: any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  private options = {
    positionClass: 'toast-top-right-with-margin',
    // timeOut: 0,
    // extendedTimeOut: 0
  };

  constructor() { }


  success(message: string, title?: string): void {
    toastr.success(message, title, this.options);
  }

  info(message: string, title?: string): void {
    toastr.info(message, title, this.options);
  }

  warning(message: string, title?: string): void {
    toastr.warning(message, title, this.options);
  }

  error(message: string, title?: string): void {
    toastr.error(message, title, this.options);
  }
}

import { Injectable } from '@angular/core';
declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }
  successMessage(title:string, message?:string){
    toastr.options.closeButton = true;
    toastr.success(title, message);
  }
  warningMessage(title:string, message?:string){
    toastr.options.closeButton = true;
    toastr.warning(title, message);
  }
  infoMessage(title:string, message?:string){
    toastr.options.closeButton = true;
    toastr.info(title, message);
  }
  errorMessage(title:string, message?:string){
    toastr.options.closeButton = true;
    toastr.error(title, message);
  }
}

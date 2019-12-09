import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mimeType=(
control:AbstractControl): Promise<{[key:string]:any}> | Observable<{[key:string]:any}> =>{
    const file=control.value as File;
    const filereader=new FileReader();
    const frObs=Observable.create((observer:Observer<{[key:string]:any}>)=>{
        filereader.addEventListener("loadend",()=>{
            const arr=new Uint8Array(filereader.result as ArrayBuffer).subarray(0, 4);
            let header="";
            let isvalid=false;
            for(var i=0; i<arr.length; i++){
                header +=arr[i].toString(16);
            }

            switch(header){
                case "89504e47":
                isvalid=true;
                break;
                case "FFD8FFE0":
                case "FFD8FFE1":
                case "FFD8FFE2":
                case "FFD8FFE3":
                case "FFD8FFE8":
                isvalid= true;
                break;

                default:
                isvalid=false;
                break
            }
            if(isvalid){
                observer.next(null)
            }
            else{
                observer.next({invalidMimeType:true})
            }
            observer.complete()
        });
        filereader.readAsArrayBuffer(file)
    });
    return frObs;
}
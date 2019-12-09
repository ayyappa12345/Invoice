import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cart } from '../shared/cart.model';
import { ProductService } from '../shared/product.service';
import { AuthService } from '../users/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  cartItems:Cart[]=[];
  cartEmpty=false;
  userisAuthenticated;
  loggedUserid=localStorage.getItem("user");
  profileSubscription:Subscription;
  profileSubscription1:Subscription;
  userdata;
  productIsLoaded=true;
  productloadSubs:Subscription;
  loginsubs:Subscription;
  showlogin=true;

  constructor(private modalService: BsModalService,private productService:ProductService, private router:Router, private authService:AuthService) { }

  ngOnInit() {
    //this.productIsLoaded=this.productService.getIsLoading();
    // this.productloadSubs=this.productService.getUpdatedLoading().subscribe(loaded=>{
    //   debugger;
    //  this.productIsLoaded=loaded;
    // });  

    this.showlogin=this.authService.getshowloginpage();
    this.loginsubs=this.authService.getupdatedshowloginSubs().subscribe(res=>{
      this.showlogin=res;
      console.log(res);
    })
 

    console.log("userid"+this.loggedUserid);
    this.userisAuthenticated=this.authService.getisAuth();

    this.profileSubscription1=this.authService.getUpdatedUerLoggedSub().subscribe(isAuth=>{
      this.userisAuthenticated=isAuth;
      this.userdata=this.authService.getProfile(this.loggedUserid);
      this.productIsLoaded=false;
      console.log(this.userdata)
      debugger;
      
      
    },err=>{
      console.log(err)
    });

    this.authService.getProfileUpdateSubs().subscribe(res=>{
      console.log(res) 
      this.userdata=res;
       
    })
 //   this.cartEmpty=this.productService.getCartEmpty();
    this.productService.getCartItems();
    this.productService.getUpdatedCart().subscribe(cartdata=>{
      this.cartItems=cartdata;
      console.log(cartdata)
    })
  }
ngOnDestroy(){
  this.profileSubscription.unsubscribe();
  this.profileSubscription1.unsubscribe();
  this.loginsubs.unsubscribe();
  //this.productloadSubs.unsubscribe();
}
  logout(){
    
    this.authService.logoutUser();
    this.router.navigate(['/login']);
    this.cartItems=[];
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}

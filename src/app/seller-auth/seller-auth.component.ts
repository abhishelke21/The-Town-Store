import { Component, OnInit } from '@angular/core';
import { SellerService } from '../Services/seller.service';
import { Router } from '@angular/router';
import {signup } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  Sellerdata:object= {};
  authError:string="";
  ShowLogin=false;
  constructor(private seller:SellerService, private route:Router) { }
  
  SellerSignUp(data: signup):void {
    this.seller.SellerSignUp(data) 
    this.seller.isSignUpError.subscribe((isError)=>{
      if(isError){
        this.authError = "SignUp Failed....!!"
      }
    })
  }
  SellerLogin(data: signup):void {
    this.seller.SellerLogin(data) ;
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Invalid Email or Password .....!!"

      }
    })
  }

  ngOnInit(): void {
    this.seller.reloadseller();
  }
  openLogin(){
    this.ShowLogin=true;
    

  }
  openSignup(){
    this.ShowLogin=false;
  }

}

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signup } from '../data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedin = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  isSignUpError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private route: Router) { }
  SellerSignUp(data: signup) {

    this.http.post('http://localhost:3000/seller', data, { observe: "response" }).subscribe((result) => {
      if (result && result.body) {
        this.isSellerLoggedin.next(true);
        localStorage.setItem("seller", JSON.stringify(result.body))
        this.route.navigate(['seller-home'])
      }
      else {
        this.isSignUpError.emit(true)
        this.route.navigate(['seller-home'])

      }

    });

  };
  SellerLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?seller_email=${data.seller_email}&seller_password=${data.seller_password}`, { observe: "response" }).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        console.warn("Seller Logged in")
        localStorage.setItem("seller", JSON.stringify(result.body))
        this.route.navigate(['seller-home'])
      }
      else {
        console.log("Login Failed")
        this.isLoginError.emit(true)
      }
    })



  }
  reloadseller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedin.next(true);
      this.route.navigate(['seller-home'])
    }
  };


}

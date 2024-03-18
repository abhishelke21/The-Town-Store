import { Component, OnInit } from '@angular/core';
import { cart, product, signup, user_login, user_signup } from '../data-types';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  ShowLogin: boolean = false;
  isError = "";

  constructor(private user: UserService, private route: Router, private product: ProductService) { }

  SignUp(data: user_signup) {
    this.user.userSignUp(data)
    this.user.isSignUpError.subscribe((iserror) => {
      if (iserror) {
        this.isError = "SignUp Failed....!!!"
      }
    })

  }
  Login(data: user_login) {
    this.user.userLogin(data)

    this.user.isLoginError.subscribe((iserror) => {

      if (iserror) {
        this.isError = "Invalid email or Password...!!"
        alert("User Login Failed...!!!")
      } else {
        alert("User Loged in Sucessfully...!!!")
        this.localCartToRemoteCart()
      }

    })

  }

  OpenLogin() {
    this.ShowLogin = true;
  }
  OpenSignUp() {
    this.ShowLogin = false;
  }


  localCartToRemoteCart() {
    let data = localStorage.getItem('localcart')
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    if (data) {
      let cartDatalist: product[] = JSON.parse(data);


      cartDatalist.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          prod_id: product.id,
          userId,
          
        }
        delete cartData.id
        setTimeout(() => {
          this.product.addtocart(cartData).subscribe((result) => {
            if (result) {
              // console.warn("data added to DB")
            }
          })
          if (cartDatalist.length === index + 1) {
            localStorage.removeItem('localcart')
          }
        }, 500);

      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);



  }


  ngOnInit(): void {

    this.user.userAuthReload()

  }

}

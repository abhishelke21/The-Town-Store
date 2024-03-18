import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { product } from '../data-types';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  SellerName: string = "";
  cartItem = 0;
  UserName: string = "";
  SearchData: undefined | product[];
  Search: string = "";
  search = false;

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.log(val.url)

        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn("Inside Seller Area")
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let sellerstore = localStorage.getItem('seller');
            let sellerdata = sellerstore && JSON.parse(sellerstore)[0];
            this.SellerName = sellerdata.seller_name;
          }

        }
        else if (localStorage.getItem('user')) {
          this.menuType = "user";
          if (localStorage.getItem('user')) {
            let userdetails = localStorage.getItem('user');
            let userdata = userdetails && JSON.parse(userdetails);
            this.UserName = userdata.name;
          }

        }
        else {
          // console.warn("Outside Seller")
          this.menuType = "default";
        }
      }
    })
    this.product.SearchProduct().subscribe((data) => {
      if (data) {
        this.SearchData = data;
        // console.warn(this.SearchData);
      }

    })
    let cartData = localStorage.getItem('localcart');
    if (cartData){
      this.cartItem=JSON.parse(cartData).length
    }
    this.product.cartdata.subscribe((items)=>{
      this.cartItem=items.length;
      
    })
  }
  Logout_seller() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  Logout_user() {
    localStorage.removeItem('user')
    this.route.navigate(['user-auth'])
    this.product.cartdata.emit([]);

  }
  keypress() {
    this.search = true;

    if (this.Search) {
      this.Search && setTimeout(() => {
        this.search = false
      }, 5000)
    }
  }







}

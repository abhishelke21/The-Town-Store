import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { cart, order } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  Product_name: string | undefined;
  Product_url:string|undefined;

  ordermsg: string | undefined;
  constructor(private product: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {

      this.cartData = result;
      result.forEach((item) => {
        this.Product_name=item.prod_name
        this.Product_url=item.prod_url
      })

      let Price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          Price = Price + (+item.prod_price * +item.quantity);
        }

      })
      this.totalPrice = Price - (Price / 90) + 100

    })
  }

  OrderNow(data: { email: string, contact: string, adress: string }) {
    let user = localStorage.getItem('user')
    let userid = user && JSON.parse(user).id

    if (this.totalPrice) {
      let OrderData: order = {
        ...data,
        userid,
        totalprice: this.totalPrice,
        id: undefined,
        name: this.Product_name,
        url: this.Product_url,


      }
      // console.warn(this.cartData);
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          this.product.deleteCartItem(item.id)
        }, 700);

      })



      this.product.OrderNow(OrderData).subscribe((result) => {
        console.warn(result)
        this.ordermsg = "Your Order has been Placed...."
        setTimeout(() => {
          this.route.navigate(['my-order'])
          this.ordermsg = undefined;
        }, 4000);


      })
    }

  }

}

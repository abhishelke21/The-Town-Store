import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  ProductDetails: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(private product: ProductService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let ProductId = this.activeRoute.snapshot.paramMap.get('productID');
    ProductId && this.product.getProduct(ProductId).subscribe((result) => {
      // console.warn(result)

      this.ProductDetails = result;

      let cartdata = localStorage.getItem('localcart')
      if (ProductId && cartdata) {
        let items = JSON.parse(cartdata);
        // console.warn(items)
        items = items.filter((item: product) => ProductId == item.id)
        // console.warn(items.length)
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;

        this.product.getCartList(userId);
        this.product.cartdata.subscribe((result) => {


          let items = result.filter((item: product) => ProductId == item.prod_id)
          // console.log(items.length)

          if (items.length) {
            this.cartData = items[0];
            this.removeCart = true

          } else {
            this.removeCart = false
          }
        })

      }
    })


  }
  HandleQuantity(value: string) {
    if (this.productQuantity < 20 && value === "plus") {
      this.productQuantity += 1
      // this.productQuantity=this.productQuantity+1;
    }
    else if (this.productQuantity > 1 && value === "min") {
      this.productQuantity -= 1

    }

  }
  AddtoCart() {
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if (this.ProductDetails) {
      this.ProductDetails.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this.product.localAddtoCart(this.ProductDetails);
        this.removeCart = true;
      }
      else {

        let cartData: cart = {
          ...this.ProductDetails,
          userId,
          prod_id: this.ProductDetails.id,

        }
        delete cartData.id
        this.product.addtocart(cartData).subscribe((result) => {
          alert("Product added to cart")
          this.product.getCartList(userId);
          // this.removeCart = true;
        })

      }
    }

  }
  RemovefromCart(productID: string) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemsfromCart(productID);
      this.removeCart = false;
    }
    else {
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
      console.warn(this.cartData?.id)
      this.cartData && this.product.removefromCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId)
        }
      })

      this.removeCart = false;
    }

  }



}

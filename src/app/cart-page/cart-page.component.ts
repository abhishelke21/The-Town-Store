import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { cart, priceSummary } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
PriceSummary:priceSummary={
  price:0,
    delivery:0,
    discount:0,
    total:0
}



  constructor(private product: ProductService, private route: Router) { }
  ngOnInit(): void {
    this.Loaddetails()
  }
removefromCart(cartId:string|undefined){
  cartId && this.cartData && this.product.removefromCart(cartId).subscribe((result)=>{
    this.Loaddetails()
  })

}


Loaddetails(){
  this.product.currentCart().subscribe((result) => {
    
    this.cartData =result;
    let Price =0;
    result.forEach((item)=>{
      if(item.quantity){
         Price=Price + (+item.prod_price* +item.quantity );
      }
     
    })
    this.PriceSummary.price = Price;
    this.PriceSummary.delivery =100;
    this.PriceSummary.discount =Price/90;
    this.PriceSummary.total=Price -(Price/90)+100;

    if(!this.cartData.length){
      this.route.navigate(['/'])

    }
   
     
    //  console.warn(Price)
  })
}

  checkout() {
    this.route.navigate(['/checkout'])
  }
}

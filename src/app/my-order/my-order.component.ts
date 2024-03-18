import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { order } from '../data-types';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  OrderData: order[] | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.GetOrderList()
  }
CancelOrder(orderId:string |undefined){
  orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
    if(result){
      this.GetOrderList()
    }
  })
  
}


  GetOrderList() {
    this.product.orderList().subscribe((result) => {
      this.OrderData = result;

    })
  }

}

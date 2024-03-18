import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { product } from '../data-types';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  ProductList: undefined | product[];
  ProductMessage: undefined | string;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.Prod_list();

  }
  deleteProduct(id: string) {
    console.warn("test id ,", id)
    this.product.DeleteProduct(id).subscribe((res) => {
      if (res) {
        this.ProductMessage = "Product Deleted Sucessfully...!"

      }
      setTimeout(() => { this.ProductMessage = undefined }, 2000) 
      this.Prod_list();
    })
   

  }
  Prod_list() {
    this.product.ProductList().subscribe((result) => {
      this.ProductList = result;
    })
  }

}

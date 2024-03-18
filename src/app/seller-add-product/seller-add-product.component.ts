import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { product } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  added_prod_Message: string | undefined;
  constructor(private add_prod: ProductService, private route: Router) {

  }

  ngOnInit(): void {
  }
  addProduct(data: product) {
    this.add_prod.AddProduct(data).subscribe((result) => {
      if (result) {
        this.added_prod_Message = "Product Added Sucessfully....!!";
        setTimeout(()=>(this.added_prod_Message=undefined),3000);
        setTimeout(()=>{this.route.navigate(['seller-home'])},2500);
        
        
      }
      
    })

  }

}

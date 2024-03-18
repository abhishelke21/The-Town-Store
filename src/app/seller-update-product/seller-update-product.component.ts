import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  ProductData: undefined | product;
  ProductMessage: undefined | string;
 
  constructor(private Activate_route: ActivatedRoute, private product: ProductService,private router:Router) { }

  ngOnInit(): void {
    let ProductID = this.Activate_route.snapshot.paramMap.get("id")

    ProductID && this.product.getProduct(ProductID).subscribe((data) => {

      this.ProductData = data;

    })

  }
  updateProduct(data: product) {
    if(this.ProductData){
      data.id=this.ProductData.id
    }
    this.product.UpdateProduct(data).subscribe((result) => {
      if (result) {
        this.ProductMessage = "Product has been  Updated...!"
        setTimeout(() => { this.ProductMessage = undefined; }, 2000);
        setTimeout(() => {  this.router.navigate(['seller-home']) }, 2500);
       
      }
      
      
      
      
    })


  }
}

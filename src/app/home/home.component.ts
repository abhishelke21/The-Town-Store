import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
popularProducts:undefined | product[];
allProducts:undefined | product[];
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.PopularProducts().subscribe((data)=>{
      
      if(data){
        this.popularProducts=data;
      }
    })
    this.product.ShowProducts().subscribe((data)=>{
      if(data){
        this.allProducts=data;
      }
    })
  }

}

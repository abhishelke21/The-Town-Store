import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { cart, order, product } from '../data-types';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartdata = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {

  }
  AddProduct(data: product) {
    return this.http.post("http://localhost:3000/Products", data)
  }
  ProductList() {
    return this.http.get<product[]>("http://localhost:3000/Products")
  }

  DeleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/Products/${id}`)
  }
  UpdateProduct(Product: product) {
    return this.http.put<product>(`http://localhost:3000/Products/${Product.id}`, Product)
  }
  PopularProducts() {
    return this.http.get<product[]>("http://localhost:3000/Products?_limit=4")
  }
  ShowProducts() {
    return this.http.get<product[]>("http://localhost:3000/Products")
  }
  SearchProduct() {
    return this.http.get<product[]>("http://localhost:3000/Products")
  }

  productDetails(id: string) {
    return this.http.get<product[]>(`http://localhost:3000/Products/${id}`)
  }
  localAddtoCart(data: product) {
    let CartData = [];
    let localcart = localStorage.getItem('localcart');
    if (!localcart) {
      localStorage.setItem('localcart', JSON.stringify([data]));
      this.cartdata.emit([data])
    }
    else {
      CartData = JSON.parse(localcart);
      CartData.push(data)
      localStorage.setItem('localcart', JSON.stringify(CartData))

      this.cartdata.emit(CartData);

    }


  }
  removeItemsfromCart(productId: string) {
    let cartData = localStorage.getItem('localcart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData)
      items = items.filter((item: product) => productId !== item.id)
      localStorage.setItem('localcart', JSON.stringify(items))
      this.cartdata.emit(items);



    }
  }
  addtocart(cartData: cart) {
    return this.http.post("http://localhost:3000/cart", cartData)


  }

  getCartList(userId: string) {
    this.http.get<product[]>(`http://localhost:3000/cart?userId=` + userId,
      { observe: "response" }).subscribe((result) => {

        if (result && result.body) {
          this.cartdata.emit(result.body);

        }
      })
  }
  removefromCart(cartId: string) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId)

  }
  currentCart() {
    let userdetails = localStorage.getItem('user');
    let userdata = userdetails && JSON.parse(userdetails);

    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userdata.id);
  }
  OrderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data)
  }
  orderList() {
    let userdetails = localStorage.getItem('user');
    let userdata = userdetails && JSON.parse(userdetails);
    return this.http.get<order[]>('http://localhost:3000/orders?userid=' + userdata.id)
  }
  deleteCartItem(cartId: any) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.cartdata.emit([]);
      }
    })

  }
  cancelOrder(orderId: string) {
    return this.http.delete(`http://localhost:3000/orders/` + orderId)
  }


}

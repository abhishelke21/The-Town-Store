export interface signup {
    seller_name: string,
    seller_username: string,
    seller_email: string,
    seller_password: string

}
export interface user_signup {
    name: string,
    username: string,
    email: string,
    password: string

}
export interface login {
    seller_email: string,
    seller_password: string
}
export interface user_login {
    email: string,
    password: string
}
export interface product{
    prod_name:string,
    prod_price:number,
    prod_color:string,
    prod_category:string,
    prod_desc:string,
    prod_url:string,
    id:string,
    quantity:undefined | number;
    prod_id:string ,

}
export interface cart {
    prod_name:string,
    prod_price:number,
    prod_color:string,
    prod_category:string,
    prod_desc:string,
    prod_url:string,
    id:string |undefined,
    prod_id:string | undefined;
    userId:string|undefined;
    quantity:undefined | number;

}
export interface priceSummary {
    price:number,
    delivery:number,
    discount:number,
    total:number,
}
export interface order{
    email:string,
    name:string |undefined,
    url:string |undefined,
    contact:string,
    adress:string,
    userid:string,
    totalprice:number,
    id:string | undefined;
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  server_url = "https://root-bloom-server.onrender.com"
  http = inject(HttpClient)

  // register API
  registerAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // login API
  loginAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  // to append token to request header
  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  // get plants API
  getPlantsAPI() {
    return this.http.get(`${this.server_url}/plants`, this.appendToken())
  }

  // view plant API
  viewPlantAPI(plantId: string) {
    return this.http.get<any>(`${this.server_url}/plant/${plantId}`, this.appendToken())
  }

  // add to cart API
  addToCartAPI(plantId:string){
    return this.http.post(`${this.server_url}/cart/add`, {plantId}, this.appendToken())
  }

    // get cart plants API
  getCartPlantsAPI() {
    return this.http.get(`${this.server_url}/cart`, this.appendToken())
  }

  // increment quantity
   incrementQuantityAPI(cartId:string) {
    return this.http.put(`${this.server_url}/cart/increment/${cartId}`,{}, this.appendToken())
  }

  // decrement quantity
  decrementQuantityAPI(cartId:string) {
    return this.http.put(`${this.server_url}/cart/decrement/${cartId}`,{}, this.appendToken())
  }

  // remove cart item
    removeCartItemAPI(cartId:string) {
    return this.http.delete(`${this.server_url}/cart/remove/${cartId}`, this.appendToken())
  }

  // remove all cart items
    removeAllCartItemsAPI() {
    return this.http.delete(`${this.server_url}/cart/remove`, this.appendToken())
  }
  // add order
    addOrderAPI(reqBody:any){
    return this.http.post(`${this.server_url}/order/add`, reqBody, this.appendToken())
  }

  // get users API
  getUsersAPI() {
    return this.http.get(`${this.server_url}/users`, this.appendToken())
  }

    // get orders placed API
  getAllOrdersAPI() {
    return this.http.get(`${this.server_url}/orders`, this.appendToken())
  }

    // view order API
  viewOrderAPI(orderId: string) {
    return this.http.get<any>(`${this.server_url}/order/${orderId}`, this.appendToken())
  }

  // update order status as shipped
    updateOrderStatusAPI(orderId:string) {
    return this.http.put(`${this.server_url}/order/status/${orderId}`,{}, this.appendToken())
  }

// add plant by admin
addPlantAPI(reqBody:any){
    return this.http.post(`${this.server_url}/plants/add`,reqBody, this.appendToken())
}

updatePlantAPI(id: string, reqBody: FormData) {
  return this.http.put(`${this.server_url}/plant/${id}`,reqBody, this.appendToken())
}

}

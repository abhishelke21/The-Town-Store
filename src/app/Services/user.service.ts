import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { user_login, user_signup } from '../data-types';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  isLoginError = new EventEmitter<boolean>()
  isSignUpError = new EventEmitter<boolean>(false)


  constructor(private http: HttpClient, private route: Router) { }
  userSignUp(user: user_signup) {
    this.http.post("http://localhost:3000/users", user, { observe: "response" }).subscribe((result) => {
      // console.warn(result)
      if (result && result.body) {
       
        localStorage.setItem('user', JSON.stringify(result.body))
        this.route.navigate(['/'])
      }
      else {
        this.isSignUpError.emit(true)
      }
    })

  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }

  userLogin(data: user_login) {
    this.http.get<user_signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`
      , { observe: "response" })
      .subscribe((result) => {

        if(result && result.body && result.body.length!=0) {
          localStorage.setItem('user', JSON.stringify(result.body[0]))
          this.route.navigate(['/'])
          this.isLoginError.emit(false)
          // console.warn(result)
        }
        else {
          this.isLoginError.emit(true)
          this.route.navigate(['user-auth'])
        }
      })
  }
  
}

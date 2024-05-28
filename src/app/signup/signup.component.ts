import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllHttpRequestsService } from '../Services/all-http-requests.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  title: string = "SignUp";

  constructor(private http: HttpClient, private router: Router, private allHttp: AllHttpRequestsService) { }


  // password Toggle
  toggle: string = "password";
  isShow: boolean = false;

  showPassword(pass: any) {
    this.isShow = !this.isShow;
    if(this.isShow){
      this.toggle = "text";
    }
    else{
      this.toggle = "password";
    }
  }

  userSignUpDetails(details: {email: string, password: any}){
    const token = btoa(details.email+':'+details.password);
    this.allHttp.signUp(token).subscribe((res: any)=>{
      if(res.message === "signed in"){
        alert(res.message);
        localStorage.setItem('token',token);
        this.router.navigate(['addtask']);
      }
      else if(res.message === "User already exist"){
        alert(res.message);
        this.router.navigate(['login']);
      }
      else{
        alert(res.message);
      }
    });
  }
}


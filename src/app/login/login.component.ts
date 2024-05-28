import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllHttpRequestsService } from '../Services/all-http-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Login";

  constructor(private http: HttpClient, private router: Router, private allHttp: AllHttpRequestsService) { }

  ngOnInit(): void {
  }

  // password Toggle
  toggle: string = "password";
  isShow: boolean = false;

  showPassword() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.toggle = "text";
    }
    else {
      this.toggle = "password";
    }
  }

  // userLoginDetails post
  userLoginDetails(details: { email: string, password: string }) {
    const token = btoa(details.email + ':' + details.password);
    this.allHttp.logIn(token).subscribe((res: any) => {

      if (res.message === "logged in") {
        alert(res.message);
        localStorage.setItem('token', token);
        console.log(localStorage.getItem(token));
        this.router.navigate(['addtask']);
      }

      else if (res.message === "SignUp required") {
        alert(res.message);
        this.router.navigate(['signup']);
      }

      else if (res.message === "Incorrect password") {
        alert(res.message);
      }

      else {
        alert(res);
      }
    });
  }
}


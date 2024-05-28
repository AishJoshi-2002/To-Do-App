import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoTask';

  constructor(private http: HttpClient) { }

  logOut() {
    localStorage.removeItem("token");
    alert("Logged out");
  }

  isLoggedIn() {
    return (localStorage.getItem('token'));
  }
}

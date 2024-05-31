import { Component, OnInit } from '@angular/core';
import { HeadersComponent } from './../../components/headers/headers.component'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // login state
  loginState = '';
  constructor(private router: Router) { }

  ngOnInit() {
    let userDataString = localStorage.getItem("userdata");
    this.loginState = userDataString ? JSON.parse(userDataString) : '';
    if (localStorage.getItem('userdata')) {
      // if there is user data, it remains unchanged
      return true;
    } else {
      // otherwise, redirect to the login page
      this.router.navigate(['/account/login']);
      return false;
    }
  }

  quit() {
    // log out
    localStorage.removeItem('userdata')

  }
}

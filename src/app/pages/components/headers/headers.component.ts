import { Component, OnInit } from '@angular/core';
// import {NzMessageService} from 'ng-zorro-antd/message';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  // login state
  loginState = '';
  username: any = '';
  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    let userDataString = localStorage.getItem("userdata");
    if (userDataString) {
      let userData = JSON.parse(userDataString);
      this.username = userData.username;
      this.loginState = userData;
      console.log(this.username)
    }
    // listen for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // manually trigger change detection to update route activation status
        this.changeDetectorRef.detectChanges();
      }
    });
  }
  quit() {
    let _this = this;
    localStorage.removeItem('userdata')
    this.matSnackBar.open('quit success', 'Close', {
      duration: 1000,
      verticalPosition: "top"
    }).afterDismissed().subscribe(() => {
      _this.router.navigate(['/account/login']);
    });
  }
  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }
}

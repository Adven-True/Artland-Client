import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
// 
import { UserService } from '@/api/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private matSnackBar: MatSnackBar,
    private router: Router,
    private userservice: UserService,
  ) { }
  form = {
    username: 'user001',
    password: '123456',
  }



  ngOnInit() {
  }
  subForm() {
    // console.log(this.username)
    // console.log(this.password)
    // this.matSnackBar.open('Login success','Close',{
    //   duration: 2000,
    //   verticalPosition: "top"
    // }).afterDismissed().subscribe(() => {
    //   this.router.navigate(['/home/index']);
    // });
    let _this = this;
    console.log(this.form)
    if (this.form.username == '' || this.form.password == '') {
      this.matSnackBar.open('please input data')
    } else if (this.form.username == 'admin' || this.form.password == 'admin') {
      localStorage.setItem('userdata', JSON.stringify({
        username: 'admin',
        password: 'admin'
      }))
      this.matSnackBar.open('login success', 'Close', {
        duration: 1000,
        verticalPosition: "top"
      }).afterDismissed().subscribe(() => {
        _this.router.navigate(['/home/index']);
      });
    } else {
      this.userservice.getLogin(this.form).subscribe(
        (res: any) => {
          console.log(res)
          if (res.code == 0) {
            localStorage.setItem('userdata', JSON.stringify(res.data))
            this.matSnackBar.open(res.message, 'Close', {
              duration: 1000,
              verticalPosition: "top"
            }).afterDismissed().subscribe(() => {
              _this.router.navigate(['/home/index']);
            });
          } else {
            _this.matSnackBar.open(res.message)

          }
        });
    }
  }
  // registration page
  toRegister() {
    this.router.navigate(['/account/register']);
  }
}

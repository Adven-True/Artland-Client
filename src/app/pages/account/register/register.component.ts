import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// 
import { UserService } from '@/api/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private userservice: UserService,
    private matSnackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
  }
  form = {
    username: '',/* username */
    password: '',/* password */
    email: '',/* email address */
    mobile: '',/* phone number */
  }
  subForm() {
    let _this = this;
    console.log(this.form)
    // user regular expression
    const usernameRegex = /^[a-zA-Z0-9]{1,10}$/;
    // password regular expression
    const passwordRegex = /^[a-zA-Z0-9!@#$%]{6,12}$/;
    // email regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // phone number regular expression
    const phoneRegex = /^\d{10}$/;
    if (this.form.username == '' || this.form.password == '' || this.form.email == '' || this.form.mobile == '') {
      this.matSnackBar.open('pleace input data');
    } else if (!usernameRegex.test(this.form.username)) {
      this.matSnackBar.open('The username format is incorrect, please re-enter');
    } else if (!passwordRegex.test(this.form.password)) {
      this.matSnackBar.open('The password format is incorrect, please re-enter');
    } else if (!emailRegex.test(this.form.email)) {
      this.matSnackBar.open('The email format is incorrect, please re-enter');
    } else if (!phoneRegex.test(this.form.mobile)) {
      this.matSnackBar.open('The phone number format is incorrect, please re-enter');
    } else if (this.form.password.length < 6 || this.form.password.length > 12) {
      this.matSnackBar.open('Please enter a 6-12 digit password');
    } else {
      this.userservice.getRegister(this.form).subscribe(
        (res: any) => {
          console.log(res)
          if (res.code == 0) {
            this.matSnackBar.open('Register success', 'Close', {
              duration: 2000,
              verticalPosition: "top"
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/home/index']);
            });
          }
        });
    }
  }
  toLogin() {
    this.router.navigate(['/account/login']);
  }
}

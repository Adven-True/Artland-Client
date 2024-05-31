import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// 
import { UserService } from '@/api/user'
@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  userdata: FormGroup = new FormGroup({});
  uid: string = '';/* id */
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userdata = this.fb.group({
      username: '',
      password: '',
      email: '',
      mobile: '',
      id: '',
    });
    /* initialize data */
    this.getDetail();
  }
  getDetail() {
    this.uid = this.route.snapshot.params['id'];
    console.log(this.uid)
    if (this.uid != undefined) {
      this.userService.getUserData({ id: this.uid }).subscribe((data: any) => {
        console.log(data)
        if (data.code === 0) {
          this.userdata.patchValue({
            username: data.data.username,
            password: data.data.password,
            email: data.data.email,
            mobile: data.data.mobile,
            id: this.route.snapshot.params['id']
          });
        }
      });
    }

  }
  submitForm() {
    if (this.userdata.value.username == '' || this.userdata.value.password == ''
      || this.userdata.value.email == ''
      || this.userdata.value.email == ''
    ) {
      this.matSnackBar.open('Please fill in the data completely')
    } else {
      if (this.uid != undefined) {
        this.userService.updateUser(this.userdata.value).subscribe((res: any) => {
          if (res.code === 0) {
            this.matSnackBar.open('submit success', 'Close', {
              duration: 1000,
              verticalPosition: "top"
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/home/usermanagelist']);
            });
          }
        });
      } else {

      }
    }

  }
}

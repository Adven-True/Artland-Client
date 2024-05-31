import { Component, OnInit } from '@angular/core';
// 接口调用
import { UserService } from '@/api/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {
  // store order list
  userList: any = [];
  constructor(private userService: UserService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getshowlist()
  }
  getshowlist() {
    this.userService.getUserList().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res.data[0]))
        if (res.code == 0) {
          // product order list
          this.userList = res.data;
        } else {
          this.matSnackBar.open(res.message)
        }
      }
    );
  }
  /* delete */
  deleted(id: number) {
    this.userService.deleteUser(id).subscribe(
      (res: any) => {
        if (res.code == 0) {
          this.matSnackBar.open('delete success', 'Close', {
            duration: 1000,
            verticalPosition: "top"
          }).afterDismissed().subscribe(() => {
            // product order list
            this.getshowlist()
          });

        } else {
          this.matSnackBar.open(res.message)
        }
      }
    );
  }
}

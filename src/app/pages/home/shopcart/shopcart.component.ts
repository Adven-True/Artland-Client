import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '@/api/order';
@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.css']
})
export class ShopcartComponent implements OnInit {
  cartItems: any = []
  constructor(private matSnackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    const shopcart = JSON.parse(localStorage.getItem('shopcart') || '[]');
    console.log(shopcart)
    this.cartItems = shopcart
  }
  deleteItem(item: any) {
    // Logic to delete an item from the cart
    this.cartItems = this.cartItems.filter((ele: any) => {
      return ele !== item
    });
  }
  increaseItem(item: any) {
    item.sum++;
  }

  decreaseItem(item: any) {
    if (item.sum > 1) {
      item.sum--;
    }
  }
  get totalPrice() {
    return this.cartItems.reduce((total: any, item: any) => {
      return total + parseFloat(item.price) * item.sum;
    }, 0).toFixed(2);
  }
  // submit
  submit() {
    const userDataString = localStorage.getItem("userdata");

    if (userDataString) {
      const userdata = JSON.parse(userDataString);
      const addData = {
        orderdata: JSON.stringify(this.cartItems),
        uid: userdata.id,
        date: Date.parse(new Date().toString())
      };

      this.orderService.addOrder(addData).subscribe(
        (res: any) => {
          if (res.code === 0) {
            this.matSnackBar.open('Submitted successfully', 'Close', {
              duration: 1000,
              verticalPosition: "top"
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/home/orderlist']);
            });
            localStorage.setItem("shopcart", '');

          } else {
            this.matSnackBar.open('Submission failed', 'Close', {
              duration: 1000,
              verticalPosition: "top"
            });
          }
        },
        (error: any) => {
          console.error(error);
          this.matSnackBar.open('An error occurred', 'Close', {
            duration: 1000,
            verticalPosition: "top"
          });
        }
      );
    }

  }
}

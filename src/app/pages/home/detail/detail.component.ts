import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component'
// use pipe to format data
import { Pipe, PipeTransform } from '@angular/core';
// call interface
import { GoodsService } from '@/api/goods';
import { OrderService } from '@/api/order';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  /* product detail  */
  goods: any = "";
  constructor(
    private GoodsService: GoodsService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    /* initialize obtained data */
    this.getDetail();
  }
  /* obtain initial data */
  getDetail() {
    const book_id = this.route.snapshot.params['id'];
    console.log(book_id)
    this.GoodsService.getGoodsDetail(book_id).subscribe((data: any) => {
      console.log(data.data)
      console.log(JSON.stringify(data.data))
      if (data.code == 0) {
        // this.goods.get('mainpng')!.setValue(data.data);
        this.goods = data.data;
      }
    });

  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { days: 'this.days' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.code == '000') {
        console.log(result);
        this.processOrder();
        console.log({
          'png': this.goods.mainpng,
          'goodname': this.goods.goodname,
          'sort': this.goods.sort,
          'price': this.goods.price
        })

      }
    });
  }
  /* process order */
  processOrder() {

    const userDataString = localStorage.getItem("userdata");

    if (userDataString) {
      const userdata = JSON.parse(userDataString);
      const addData = {
        orderdata: JSON.stringify([{
          'png': this.goods.mainpng,
          'goodname': this.goods.goodname,
          'sort': this.goods.sort,
          'price': this.goods.price,
          'sum': 1
        }]),
        uid: userdata.id,
        goodsid: this.goods.id,
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
    } else {
      this.matSnackBar.open("Please log in first", 'Close', {
        duration: 1000,
        verticalPosition: "top"
      });
      this.router.navigate(['/account/login']);
    }
  }
  // add to shopping cart
  addShopcard() {
    const shopcart = JSON.parse(localStorage.getItem('shopcart') || '[]'); // parsing local data or initializing it as an empty array
    const book_id = this.route.snapshot.params['id']; // get the id of the current detail page
    const existingItem = shopcart.find((item: any) => item.goodsid.toString() === book_id);

    if (existingItem) {
      // if the product already exists, increase the quantity
      existingItem.sum++;
    } else {
      // if the product does not exist, add a new product to the shopping cart
      shopcart.push({
        "goodsid": book_id,
        "goodname": this.goods.goodname,
        "price": this.goods.price,
        "png": this.goods.mainpng,
        "sort": this.goods.sort,
        "sum": 1
      });
    }

    // update localstorage
    localStorage.setItem('shopcart', JSON.stringify(shopcart));

    // display an alert for successfully adding to shopping cart 
    this.matSnackBar.open('Added to shopping cart', 'Close', {
      duration: 1000,
      verticalPosition: "top"
    });
  }
}

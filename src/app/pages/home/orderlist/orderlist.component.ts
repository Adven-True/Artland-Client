import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// 
import { OrderService } from '@/api/order';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  // store user data
  userdata: any = {};
  // store order list
  ordershowList: any = [];
  displayedColumns: string[] = ['date', 'goodname', 'picture', 'price', 'sort'];
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let userDataString = localStorage.getItem("userdata");
    if (userDataString) {
      // config user data
      this.userdata = JSON.parse(userDataString);
      console.log(this.userdata)
    }
    this.getBorrowList()
  }
  // get the product list for the specified user
  getBorrowList() {
    this.orderService.getShoworder({ uid: this.userdata.id }).subscribe(
      (res) => {
        this.ordershowList = res.data.map((ele: any) => {
          console.log(JSON.parse(ele.orderdata))
          ele.orderdata = JSON.parse(ele.orderdata)

          ele.orderdata = ele.orderdata.map((orderItem: any) => {
            orderItem.uid = this.userdata.id;
            return orderItem;
          });
          ele.day = this.timestampToDateTime(ele.date)
          // get total price
          ele.sum = this.getSum(ele.orderdata);
          return ele;
        });

        // Sort the ordershowList by date in descending order
        this.ordershowList.sort((a: { day: string | number | Date; }, b: { day: string | number | Date; }) => {
          const dateA = new Date(a.day).getTime();
          const dateB = new Date(b.day).getTime();
          return dateB - dateA; // Descending order
        });

        // Sort orders by date in descending order
        this.ordershowList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());


        // Group orders by day
        const ordersByDay: { [day: string]: any[] } = {};
        this.ordershowList.forEach((order: any) => {
          const day = order.day;
          if (!ordersByDay[day]) {
            ordersByDay[day] = [];
          }
          ordersByDay[day].unshift(order);
        });


        //Sort orders within each day by timestamp in descending order
        Object.keys(ordersByDay).forEach((day: string) => {
          ordersByDay[day].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        });


        console.log(this.ordershowList)
      });
  }
  // timestamp
  timestampToDateTime(timestamp: any) {
    const date = new Date(timestamp * 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const dateString = `${year}-${month}-${day}`;

    return dateString;
  }
  // calculate total price
  getSum(list: any) {
    let sum = 0;
    list.map((ele: any) => {
      sum = sum + ele.price * ele.sum;
    })
    return sum;
  }
}

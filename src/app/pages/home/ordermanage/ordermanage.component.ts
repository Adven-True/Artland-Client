import { Component, OnInit } from '@angular/core';
// 
import { OrderService } from '@/api/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-ordermanage',
  templateUrl: './ordermanage.component.html',
  styleUrls: ['./ordermanage.component.css']
})
export class OrdermanageComponent implements OnInit {
  // store order list
  ordershowList: any = [];
  constructor(private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getBorrowList()
  }
  // get a list of all user
  getBorrowList() {
    this.orderService.getOrderList().subscribe(
      (res) => {
        const groupedOrders: any[] = [];

        // Grouping logic
        res.data.forEach((ele: any) => {
          ele.orderdata = JSON.parse(ele.orderdata);
          ele.day = this.timestampToDateTime(ele.date);
          //ele.day = ele.date;
          ele.sum = this.getSum(ele.orderdata);

          ele.orderdata.forEach((orderItem: any) => {
            orderItem.uid = ele.uid;
            const key = `${ele.uid}-${ele.day}`;
            let group = groupedOrders.find(g => g.key === key);
            if (!group) {
              group = { uid: ele.uid, day: ele.day, orderdata: [], sum: 0, key };
              groupedOrders.push(group);
            }
            group.orderdata.push(orderItem);
            group.sum += Number(orderItem.price) * orderItem.sum; // Adjust sum calculation as needed
          });
        });


        // Group orders by day
        const ordersByDay: { [day: string]: any[] } = {};
        this.ordershowList.forEach((order: any) => {
          const day = order.day;
          if (!ordersByDay[day]) {
            ordersByDay[day] = [];
          }
          ordersByDay[day].push(order);
        });




        // Sort orders within each day by timestamp in descending order
        Object.keys(ordersByDay).forEach((day: string) => {
          ordersByDay[day].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        });


        // Sort the groupedOrders by date in descending order
        this.ordershowList = groupedOrders.sort((a, b) => {
          const dateA = new Date(a.day).getTime();
          const dateB = new Date(b.day).getTime();
          return dateB - dateA; // Descending order
        });


        console.log(this.ordershowList);
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

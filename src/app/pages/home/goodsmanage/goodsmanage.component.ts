import { Component, OnInit } from '@angular/core';
// call interface
import { GoodsService } from '@/api/goods';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-goodsmanage',
  templateUrl: './goodsmanage.component.html',
  styleUrls: ['./goodsmanage.component.css']
})
export class GoodsmanageComponent implements OnInit {
  /* storage data list */
  goodslist: any = [];
  constructor(private GoodsService: GoodsService,
    private matSnackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.getshowlist()
  }
  getshowlist() {
    this.GoodsService.getGoodsList({}).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res.data[0]))
        if (res.code == 0) {
          //  product data list
          this.goodslist = res.data;
        } else {
          this.matSnackBar.open(res.message)
        }
      }
    );
  }
  /* delete */
  deleted(id: number) {
    this.GoodsService.deleteGoods(id).subscribe(
      (res: any) => {
        if (res.code == 0) {
          this.matSnackBar.open('delete success')
          // product data list
          this.getshowlist()
        } else {
          this.matSnackBar.open(res.message)
        }
      }
    );
  }
}

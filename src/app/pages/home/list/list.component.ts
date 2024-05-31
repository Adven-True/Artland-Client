import { Component, OnInit } from '@angular/core';
/*  */
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// 
import { GoodsService } from '@/api/goods';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private GoodsService: GoodsService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) { }
  /* stored data list */
  goodslist: any = [];
  /* store displayed data list */
  goodsshowlist: any = [];
  /* chosen classification data */
  sortdata: any = "0";
  // classification list
  sort: any = [
    // {"id": 1,"sort": "history"},
    // {"id": 2,"sort": "science"},
    // {"id": 3,"sort": "art"},
    // {"id": 5,"sort": "philosophy"}
  ]
  /* banner */
  bannerList = [
    'banner4.png',
    'banner5.png',
    'banner6.png',
  ]
  // text information for search
  searchtxt: string = "";
  ngOnInit() {
    this.getcommendList();
    this.getSortList()
  }
  getcommendList() {
    this.GoodsService.getGoodsList({}).subscribe(
      (res: any) => {
        console.log(res)
        if (res.code == 0) {
          // product data list
          this.goodslist = res.data;
          // this.goodsshowlist=res.data;
          this.showpage()
        } else {
          this.matSnackBar.open(res.message)
        }
      }
    );
  }
  // get classification list
  getSortList() {
    let _this = this;
    this.GoodsService.getSort().subscribe(
      (res) => {
        // this.products=data;
        console.log(res.code)
        if (res.code == 0) {
          // console.log([...res.data])
          this.sort = [{ "id": '0', "sort": "All" }, ...res.data];
        }
      });
  }
  /* category switching */
  changeSort(event: any) {
    console.log(event)
    if (event != 0) {
      let goodsshowlist = this.goodslist.filter((ele: any) => {
        return ele.sort_id == event;
      })
      this.goodsshowlist = goodsshowlist;
    } else {
      this.showpage()
    }

  }
  /* search filter */
  searchlist() {

    if (this.searchtxt == '') {
      this.showpage()
    } else {
      let showdata = this.goodslist.filter((ele: any) => {
        return ele.goodname.indexOf(this.searchtxt) != -1;
      })
      this.goodsshowlist = showdata;
      this.sortdata = "0";
    }
  }
  /* displayed data */
  showpage() {
    this.goodsshowlist = this.goodslist;
  }
}

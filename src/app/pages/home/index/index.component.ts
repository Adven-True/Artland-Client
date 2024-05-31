import { Component, OnInit } from '@angular/core';
/* message and routing redirection */
import { ActivatedRoute, Router } from '@angular/router';
// call interface
import { GoodsService } from '@/api/goods';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private GoodsService: GoodsService,
    private router: Router,
  ) { }
  features = [
    { image: 'b1.jpg', title: 'info management', description: 'Users can input basic information about products...' },
    // other featured feature data
  ];
  ngOnInit() {
    this.getcommendList()
  }
  /* banner */
  bannerList = [
    'banner1.png',
  ]
  trackBanner(index: number, item: any) {
    return item; // using image names as unique identifiers for tracking
  }
  /* list of recommended products */
  commendList: any = [];
  getcommendList() {
    // this.GoodsService.getGoodsList({}).subscribe(
    //   (res: any) => {
    //     console.log(res)
    //     if(res.code==0) {
    //       // randomly select 4 items as popular recommendations
    //       this.commendList=this.getRandomItemsFromArray(res.data);
    //     } else {
    //       this.message.info(res.message)
    //     }
    //   }
    // );
  }
  // randomly obtain 4 items of data from an array
  getRandomItemsFromArray(array: any) {
    const shuffledArray = array.sort(() => Math.random() - 0.5); // 随机打乱数组顺序
    return shuffledArray.slice(0, 4); // 获取数组中的前4个对象
  }

  /* redirect to view details */
  showDetail(id: Number) {
    this.router.navigate(['/home/bookdetail/' + id])
  }
}

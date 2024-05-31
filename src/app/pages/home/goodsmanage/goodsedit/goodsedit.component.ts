import { Component, OnInit } from '@angular/core';
/* message and routing redirection */
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// call interface
import { GoodsService } from '@/api/goods'
@Component({
  selector: 'app-goodsedit',
  templateUrl: './goodsedit.component.html',
  styleUrls: ['./goodsedit.component.css']
})
export class GoodseditComponent implements OnInit {
  goods: FormGroup = new FormGroup({});
  avatarUrl?: string = ''; // to preview uploaded images
  sort: any[] = []; // classification list
  uid: string = '';/* id */
  constructor(
    private fb: FormBuilder,
    private goodsService: GoodsService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.goods = this.fb.group({
      goodname: '',
      gooddesc: '',
      mainpng: '',
      sort_id: '',
      price: '',
      id: '',
    });
    this.getSortList()
    /* initialize obtained data */
    this.getDetail();
  }
  getDetail() {
    if (this.route.snapshot.params['id'] != undefined) {
      this.uid = this.route.snapshot.params['id'];
    }

    console.log(this.uid)
    if (this.uid != '') {
      this.goodsService.getGoodsDetail(this.uid).subscribe((data: any) => {
        console.log(data)
        if (data.code === 0) {
          this.goods.patchValue({
            goodname: data.data.goodname,
            gooddesc: data.data.gooddesc,
            mainpng: data.data.mainpng,
            sort_id: data.data.sort_id,
            price: data.data.price.toString(),
            id: this.route.snapshot.params['id']
          });
          this.avatarUrl = `/api/uploads/${data.data.mainpng}`;
        }
      });
    }

  }
  // get classified data
  getSortList() {
    let _this = this;
    this.goodsService.getSort().subscribe(
      (res) => {
        // this.products=data;
        console.log(res)
        if (res.code == 0) {
          // console.log([...res.data])
          this.sort = [...res.data];
        }
      });
  }
  submitForm() {
    console.log(this.goods.value)
    if (this.goods.value.goodname == '' || this.goods.value.gooddesc == ''
      || this.goods.value.mainpng == ''
      || this.goods.value.price == ''
      || this.goods.value.sort_id == ''
    ) {
      this.matSnackBar.open('Please fill in the data completely')
    } else {
      if (this.uid != '') {
        let goods = this.goods.value
        goods.price = goods.price.toString()
        this.goodsService.updateGoods(goods).subscribe((res: any) => {
          if (res.code === 0) {
            this.matSnackBar.open('submit success', 'Close', {
              duration: 1000,
              verticalPosition: "top"
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/home/goodsmanage']);
            });
          }
        });
      } else {
        let goods = this.goods.value
        goods.price = goods.price.toString()
        this.goodsService.addGoods(goods).subscribe((res: any) => {
          if (res.code === 0) {
            this.matSnackBar.open('submit success', 'Close', {
              duration: 1000,
              verticalPosition: "top"
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/home/goodsmanage']);
            });
          }
        });
      }
    }

  }


  selectImage() {
    const inputElement = document.getElementById('mainpng') as HTMLInputElement;
    inputElement.click();
  }

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    let _this = this;
    if (target.files && target.files[0]) {
      // TODO: process image upload logic
      console.log(target.files[0])
      //  building FormData object
      const formData = new FormData();
      formData.append('file', target.files[0]);

      this.goodsService.uploadPic(formData).subscribe((res: any) => {
        console.log(res)
        if (res.code === 0) {
          console.log(res)
          _this.goods.get('mainpng')?.setValue(res.data);
          _this.avatarUrl = `/api/uploads/${res.data}`;
          // this.matSnackBar.open('submit success','Close',{
          //   duration: 1000,
          //   verticalPosition: "top"
          // }).afterDismissed().subscribe(() => {
          //   this.router.navigate(['/home/goodsmanage']);
          // });
        }
      });
    }
  }
}

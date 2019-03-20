import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  defaultHref = '/trang-chu';
  // tslint:disable-next-line:max-line-length
  sourceImage = 'http://res.cloudinary.com/tnttnamhoa/image/upload/d_default.png/c_crop,g_face,h_400,r_max,w_400/c_scale,w_200/v1/profile/HT014'

  constructor() { }

  ngOnInit() {
  }

}

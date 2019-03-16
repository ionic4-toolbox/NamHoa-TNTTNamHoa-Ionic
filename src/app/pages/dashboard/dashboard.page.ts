import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, LoadingController, AlertController, IonInfiniteScroll, IonRefresher } from '@ionic/angular';

import { DataProvider } from '../../providers/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('scheduleList') scheduleList: IonList;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  loader$: any;
  alert$: any;
  queryText = '';
  segment = 'all';
  userLength: any = 0;
  users: any[] = [];

  constructor(
    public dataProv: DataProvider,
    public loadingCtr: LoadingController,
    public alertCtr: AlertController,
  ) {
    this.loadingPresent();
    this.updateSchedule();
  }

  ngOnInit() {
  }

  async loadingPresent() {
    this.loader$ = await this.loadingCtr.create({
      message: 'Đang tải...',
    });
    return await this.loader$.present();
  }

  async loadingDismiss() {
    return await this.loader$.dismiss();
  }

  async alertPresent() {
    this.alert$ = await this.alertCtr.create({
      header: 'Lỗi kết nối!',
      message: 'Vui lòng kiểm tra lại kết nối internet trước khi thử tìm kiếm lại.',
      buttons: ['OK'],
    });
    return await this.alert$.present();
  }

  updateSchedule() {
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.dataProv.getData(this.queryText, this.segment).subscribe(
      (data: any) => {
        this.userLength = data.length;
        this.users = data;

        setTimeout(() => {
          this.loadingDismiss();
        }, 3000);
      },
      (err) => {
        setTimeout(() => {
          this.loadingDismiss();
          this.alertPresent();
        }, 3000);
      },
    );
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.updateSchedule();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      this.users = this.users.concat(this.users);
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 2000);
  }
}

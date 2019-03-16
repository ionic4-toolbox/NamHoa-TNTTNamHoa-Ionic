import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

import { DataProvider } from '../../providers/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('scheduleList') scheduleList: IonList;

  queryText = '';
  segment = 'all';
  shownSessions: any = 0;
  users: any = [];

  constructor(
    public dataProv: DataProvider,
  ) { }

  ngOnInit() {
    this.updateSchedule();
  }

  updateSchedule() {
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.dataProv.getData(this.queryText, this.segment).subscribe((data: any) => {
      this.shownSessions = data.length;
      this.users = data;
    });
  }
}

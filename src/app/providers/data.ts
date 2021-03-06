import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, filter, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProvider {
  data: any;

  constructor(
    public http: HttpClient,
  ) {
  }

  load(): any {
    // return throwError(response);

    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/user.json')
        .pipe(map((res: any) => {
          this.data = res.data;
          return this.data;
        }));
    }
  }

  getData(
    queryText = '',
    segment = 'all'
  ) {
    return this.load().pipe(
      // delay(3000),
      map((data: any[]) => {
        return data.filter((user: any) => {
          queryText = xoa_dau(queryText).toLowerCase();
          if (
            xoa_dau(user.ho_va_ten).toLowerCase().indexOf(queryText) > -1 ||
            xoa_dau(user.id).toLowerCase().indexOf(queryText) > -1
          ) {
            return true;
          }
          return false;
        });
      }),
      // tap((data) => console.log(data)),
    );

    function xoa_dau(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
      str = str.replace(/Đ/g, 'D');
      return str;
    }
  }
}

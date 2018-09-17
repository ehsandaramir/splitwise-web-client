import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GroupModel} from '../models/group.model';
import {UserModel} from '../models/user.model';
import {BillModel} from '../models/bill.model';


@Injectable()
export class DataService {
  public groups: {} = {};
  public users: {} = {};
  public bills: {} = {};
  public selectedGroup: GroupModel;
  public selectedUser: UserModel;
  public selectedBill: BillModel;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.fetch();
    setInterval(() => { this.fetch(); }, 5000);
  }

  fetch() {
    this.httpClient.get<GroupModel[]>(
      'http://localhost:8000/api/groups/',
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (data: GroupModel[]) => {
        this.groups = {};
        data.forEach((dat: GroupModel) => {
          this.groups[dat.pk] = dat;
        });
      },
      (err) => {
        console.error('could not update group database');
      }
    );

    this.httpClient.get<UserModel[]>(
      'http://localhost:8000/api/users/',
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (userData: UserModel[]) => {
        this.users = {};
        userData.forEach((dat: UserModel) => {
          this.users[dat.pk] = dat;
        });
      },
      (err) => {
        console.error(err);
      }
    );

    this.httpClient.get<BillModel[]>(
      'http://localhost:8000/api/bills/',
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (billData: BillModel[]) => {
        this.bills = {};
        billData.forEach((dat: BillModel) => {
          this.bills[dat.pk] = dat;
        });
      }
    );
  }

  listGroup() {
    const target = [];
    for (const key in this.groups) {
      target.push(this.groups[key]);
    }
    return target;
  }

  retrieveGroup(pk: number): GroupModel {
    return this.groups[pk];
  }

  updateGroup(group: GroupModel) {
    this.groups[group.pk] = group;
  }


  listUser() {
    const target = [];
    for (const key in this.users) {
      target.push(this.users[key]);
    }
    return target;
  }

  retrieveUser(pk: number): UserModel {
    return this.users[pk];
  }


  listBill() {
    const target = [];
    for (const key in this.bills) {
      target.push(this.bills[key]);
    }
    return target;
  }

  retrieveBill(pk: number): BillModel {
    return this.bills[pk];
  }
}

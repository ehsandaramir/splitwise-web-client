import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
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

  public onGroupMessage = new EventEmitter<{type: string, message: string}>();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.fetch();
    setInterval(() => { this.fetch(); }, 5000);
  }

  fetch() {
    this.httpClient.get(
      'http://localhost:8000/api/groups/',
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (data) => {
        const groups = GroupModel.groupFactoryBatch(data);
        this.groups = {};
        groups.forEach((group: GroupModel) => {
          this.groups[group.pk] = group;
        });
      },
      (err) => {
        console.error('could not update group database');
      }
    );

    this.httpClient.get(
      'http://localhost:8000/api/users/',
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (userData) => {
        const users = UserModel.userFactoryBatch(userData);
        this.users = {};
        users.forEach((user: UserModel) => {
          this.users[user.pk] = user;
        });
        // console.log(this.users);
      },
      (err) => {
        console.error(err);
      }
    );

    this.httpClient.get(
      'http://localhost:8000/api/bills/',
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (billData) => {
        const bills = BillModel.billFactoryBatch(billData);
        this.bills = {};
        bills.forEach((bill: BillModel) => {
          this.bills[bill.pk] = bill;
        });
      }
    );
  }

  listGroup() {
    const target = [];
    for (const key in this.groups) {
      if (this.groups.hasOwnProperty(key)) {
        target.push(this.groups[key]);
      }
    }
    return target;
  }

  createGroup(group: GroupModel) {
    if (group.pk in this.groups) {
      this.updateGroup(group);
    } else {
      this.httpClient.post<GroupModel>(
        'http://localhost:8000/api/groups/',
        {
          headers: this.authService.getHeader()
        }
      ).subscribe(
        (data: GroupModel) => {
          this.onGroupMessage.emit({type: 'success', message: 'group created successfully'});
          },
        (err) => {
          this.onGroupMessage.emit({type: 'danger', message: 'group creation failed'});
        });
    }
  }

  retrieveGroup(pk: number): GroupModel {
    return this.groups[pk];
  }

  updateGroup(group: GroupModel) {
    if (group.pk in this.groups) {
      this.httpClient.put<GroupModel>(
        'http://localhost:8000/api/groups/' + group.pk + '/',
        {
          headers: this.authService.getHeader()
        }
      ).subscribe(
        (data: GroupModel) => {
          this.onGroupMessage.emit({type: 'success', message: 'group updated successfully'});
        },
        (err) => {
          this.onGroupMessage.emit({type: 'danger', message: 'group update failed'});
        }
      );
    } else {
      this.createGroup(group);
    }
  }


  listUser() {
    const target = [];
    for (const key in this.users) {
      if (this.users.hasOwnProperty(key)) {
        target.push(this.users[key]);
      }
    }
    return target;
  }

  retrieveUser(pk: number): UserModel {
    return this.users[pk];
  }


  listBill(): BillModel[] {
    const target = [];
    for (const key in this.bills) {
      if (this.bills.hasOwnProperty(key)) {
        target.push(this.bills[key]);
      }
    }
    return target;
  }

  retrieveBill(pk: number): BillModel {
    return this.bills[pk];
  }

  deleteBill(pk: number) {
    this.httpClient.delete(
      'http://localhost:8000/api/bills/' + pk + '/',
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (dat) => {
        console.log('delete bill successful');
      },
      (err) => {
        console.error('could not delete desired bill');
        console.error(err);
      }
    );
  }
}

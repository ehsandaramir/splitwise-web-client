import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {GroupModel} from '../models/group.model';
import {UserModel} from '../models/user.model';
import {BillModel} from '../models/bill.model';
import {TransactionModel} from '../models/transaction.model';
import {CloneTools} from '../extra/clone.tools';


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

        for (const key of Object.keys(this.groups)) {
          delete this.groups[key];
        }
        this.groups = {};
        groups.forEach((group: GroupModel) => {
          this.groups[group.pk] = group;
        });
      },
      (err) => {
        console.error('could not update group database');
        console.error(err);
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

        for (const key of Object.keys(this.bills)) {
          delete this.bills[key];
        }
        this.bills = {};
        bills.forEach((bill: BillModel) => {
          this.bills[bill.pk] = bill;
        });
        // console.log(Object.keys(this.bills).length);
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

  createGroup(group: {title: string, users: number[]}) {
    this.httpClient.post<GroupModel>(
      'http://localhost:8000/api/groups/',
      JSON.stringify(group),
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (data: GroupModel) => {
        this.selectedGroup = GroupModel.groupFactory(data);
        this.onGroupMessage.emit({type: 'success', message: 'group created successfully'});
        },
      (err) => {
        this.onGroupMessage.emit({type: 'danger', message: 'group creation failed'});
        console.error(err);
      });
  }

  retrieveGroup(pk: number): GroupModel {
    return this.groups[pk];
  }

  updateGroup(group: GroupModel) {
    this.httpClient.put<GroupModel>(
      'http://localhost:8000/api/groups/' + group.pk + '/',
      JSON.stringify(group),
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (data: GroupModel) => {
        this.selectedGroup = this.groups[ data['pk'] ];
        this.onGroupMessage.emit({type: 'success', message: 'group updated successfully'});
      },
      (err) => {
        console.error(err);
        this.onGroupMessage.emit({type: 'danger', message: 'group update failed'});
      }
    );
  }

  deleteGroup(pk: number) {
    this.httpClient.delete('http://localhost:8000/api/groups/' + pk + '/',
      {
        headers: this.authService.getHeader()
      }).subscribe(
      (data) => {
        console.log('delete group successful: ' + pk);
        this.selectedGroup = undefined;
      },
      (err) => {
        console.error('could not delete group');
        console.error(err);
      }
    );
  }

  listUser() {
    const target = [];
    for (const key in this.users) {
      if (this.users.hasOwnProperty(key)) {
        target.push(this.users[key]);
      }
    }
    return CloneTools.clone(target);
  }

  retrieveUser(pk: number): UserModel {
    return this.users[pk];
  }

  listBill(groupId?: number): BillModel[] {
    const target = [];
    if (groupId) {
      const targetGroup = this.retrieveGroup(groupId);
      // console.log(targetGroup);
      for (const key of targetGroup.bills) {
        target.push(key);
      }
    } else {
      for (const key in this.bills) {
        if (this.bills.hasOwnProperty(key)) {
          target.push(this.bills[key]);
        }
      }
    }
    return target;
  }

  createBill(bill: {group__write: number, title: string, amount: string}) {
    this.httpClient.post(
      'http://localhost:8000/api/bills/',
      JSON.stringify(bill),
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (data) => {
        console.log('create bill sucessful');
        console.log(data);
    },
      (err) => {
        console.error('create bill failed');
        console.error(err);
      }
    );
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
      (data) => {
        console.log('delete bill successful');
        console.log(data);
        delete this.bills[pk];
        // console.log(this.bills);
      },
      (err) => {
        console.error('could not delete desired bill');
        console.error(err);
      }
    );
  }

  createTransaction(transaction: TransactionModel) {
    console.log(JSON.stringify(transaction));

    this.httpClient.post(
      'http://localhost:8000/api/transactions/',
      JSON.stringify(transaction),
      {
        headers: this.authService.getHeader()
      }
    ).subscribe(
      (data) => {
        console.log('create transaction successful');
        console.log(data);
      },
      (err) => {
        console.error('create transaction failed');
        console.error(err);
      }
    );
  }
}

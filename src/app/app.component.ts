import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {BillService} from './services/bill.service';
import {GroupService} from './services/group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, BillService, GroupService]
})
export class AppComponent {
  title = 'SplitClient';

  constructor(public userService: UserService, public billService: BillService, public groupService: GroupService) {  }
}

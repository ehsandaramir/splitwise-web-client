import { Component, OnInit } from '@angular/core';
import {GroupModel} from '../../models/group.model';
import {UserService} from '../../services/user.service';
import {BillService} from '../../services/bill.service';
import {GroupService} from '../../services/group.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedGroup: GroupModel;

  constructor(public userService: UserService, public billService: BillService, public groupService: GroupService) {  }

  ngOnInit() {  }
}

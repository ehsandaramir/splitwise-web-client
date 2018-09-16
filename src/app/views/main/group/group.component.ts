import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from '../../../models/group.model';
import {GroupService} from '../../../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public activeBillId: number;

  constructor(public groupService: GroupService) { }

  ngOnInit() {
  }

  setActiveBill(id: number) {
    this.activeBillId = id;
  }

  clearActiveBill() {
    this.activeBillId = null;
  }

  onReloadBills() {
    console.log(this.groupService.list());
  }
}

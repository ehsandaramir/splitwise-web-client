import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from '../../../models/group.model';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public activeBillId: number;

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  setActiveBill(id: number) {
    this.activeBillId = id;
  }

  clearActiveBill() {
    this.activeBillId = null;
  }

  onReloadBills() {
    console.log(this.dataService.listGroup());
  }
}

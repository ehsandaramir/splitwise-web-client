import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from '../../../models/group.model';
import {DataService} from '../../../services/data.service';
import {BillModel} from '../../../models/bill.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public activeBill: number;
  public bills: BillModel[];

  constructor(public dataService: DataService) {
    this.bills = this.dataService.selectedGroup.bills;
  }

  ngOnInit() {
  }

  setActiveBill(bill: number) {
    this.activeBill = bill;
  }

  clearActiveBill() {
    this.activeBill = null;
  }

  onReloadBills() {
    // console.log(this.dataService.listGroup());
    this.bills = this.dataService.selectedGroup.bills;
  }
}

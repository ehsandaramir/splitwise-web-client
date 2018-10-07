import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {BillModel} from '../../../models/bill.model';
import {EditService} from '../../../services/edit.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private Object = Object;

  constructor(public dataService: DataService, public editService: EditService, public ref: ChangeDetectorRef) {
    setInterval(() => { this.ref.markForCheck(); }, 3000);
  }

  ngOnInit() {
  }

  setActiveBill(bill: BillModel) {
    this.dataService.selectedBill = bill;
  }

  onReloadBills() {
  }

  // TODO: add new bill
  onAddBillClicked() {
    console.log('add bill clicked');
    this.editService.editBill(null, ['/']);
  }

  onDeleteGroupClicked() {
    console.log('delete group clicked');
    this.dataService.deleteGroup(this.dataService.selectedGroup.pk);
  }

  // TODO: edit group on main page
}

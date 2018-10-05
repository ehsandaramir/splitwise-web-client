import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupModel} from '../../../../models/group.model';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @Output() itemSelect = new EventEmitter<GroupModel>();

  constructor(public dataService: DataService) { }

  ngOnInit() {  }

  selectItem(item: GroupModel) {
    this.itemSelect.emit(item);
    this.dataService.selectedBill = undefined;
    this.dataService.selectedGroup = item;
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupModel} from '../../../../models/group.model';
import {GroupService} from '../../../../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @Output() onItemSelect = new EventEmitter<GroupModel>();

  constructor(public groupService: GroupService) { }

  ngOnInit() {  }

  selectItem(item: GroupModel) {
    this.onItemSelect.emit(item);
    this.groupService.selectedGroup = item;
  }

}

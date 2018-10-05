import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditService} from '../../../../services/edit.service';
import {GroupModel} from '../../../../models/group.model';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  @Output() itemClick = new EventEmitter<string>();

  constructor(public editService: EditService) { }

  ngOnInit() {
  }

  clickNewGroup() {
    this.editService.editGroup(undefined, ['/']);
  }
}

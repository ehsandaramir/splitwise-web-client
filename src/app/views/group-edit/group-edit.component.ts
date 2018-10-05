import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {EditService} from '../../services/edit.service';
import {TransactionModel} from '../../models/transaction.model';
import {GroupModel} from '../../models/group.model';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  public groupForm: FormGroup;
  public listItemsUser: UserModel[];
  public addedUsers: number[];

  constructor(public dataService: DataService, public editService: EditService) { }

  ngOnInit() {
    this.addedUsers = [];
    this.listItemsUser = this.dataService.listUser();
    this.groupForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'user': new FormControl(this.listItemsUser[0].pk, [Validators.required])
    });
  }

  addUser() {
    this.addedUsers.push(this.groupForm.value.user);
  }

  onSubmit() {
    const tmpData = {
      title: this.groupForm.value.title,
      users: this.addedUsers
    };
    this.dataService.createGroup(tmpData);
    this.dataService.selectedGroup = undefined;
    this.editService.editGroupFinished();
  }

  onDiscard() {
    console.log('discard');
    this.dataService.selectedGroup = undefined;
    this.editService.editGroupFinished();
  }
}

import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  onUserSelect(user) {
    this.dataService.selectedUser = user;
  }
}

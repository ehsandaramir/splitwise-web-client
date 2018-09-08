import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onUserSelect(user) {
    this.userService.selectedUser = user;
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupModel} from '../../models/group.model';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  selectedGroup: GroupModel;

  constructor(public dataService: DataService,
              public authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
    // if (this.authService.currentStatus === 'login') {
    //   this.router.navigate(['/login']);
    // }
  }

  ngOnDestroy(): void {  }
}

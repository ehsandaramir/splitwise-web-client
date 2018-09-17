import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from './services/user.service';
import {BillService} from './services/bill.service';
import {DataService} from './services/data.service';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'SplitClient';

  constructor(private router: Router
  ) {
  }

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}

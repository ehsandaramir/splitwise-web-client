import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  @Output() onItemClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}

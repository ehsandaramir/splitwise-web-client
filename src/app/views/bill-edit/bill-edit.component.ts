import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {EditService} from '../../services/edit.service';
import {GroupModel} from '../../models/group.model';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.css']
})
export class BillEditComponent implements OnInit {
  public transactionForm: FormGroup;
  public listItemGroups: GroupModel[];

  constructor(public dataService: DataService, public editService: EditService) {
  }

  ngOnInit() {
    this.listItemGroups = this.dataService.listGroup();
    this.transactionForm = new FormGroup({
      'group': new FormControl(this.editService.group.pk, [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'amount': new FormControl('0.0', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.transactionForm.value);
    this.dataService.createBill(
      {
        group__write: this.transactionForm.value['group'],
        title: this.transactionForm.value['title'],
        amount: this.transactionForm.value['amount']
      }
    );
    this.editService.editBillFinished();
  }

  onDiscard() {
    console.log('discard');
    this.editService.editBillFinished();
  }
}

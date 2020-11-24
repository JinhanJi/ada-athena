import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomModal } from 'src/app/common/custom-modal/custom-modal';

@Component({
  selector: 'app-custom-test-dialog',
  templateUrl: './custom-test-dialog.component.html',
  styleUrls: ['./custom-test-dialog.component.scss']
})
export class CustomTestDialogComponent extends CustomModal implements OnInit {

  @Input() data: any;
  @Output() onConfirm = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('custom-test-modal');
  }

  confirm() {
      this.onConfirm.emit("data");
  }

  cancel() {
      this.onCancel.emit();
  }

}

import { Component, Input, OnInit, Output, OnDestroy, EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy{

  @Input() title;
  @Input() type = 'info';
  @Input() content = '';
  @Input() cancelButton?: string = null ;
  @Input() submitButton?: string = null ;
  @Input() OnCancel: () => {};
  @Input() OnSubmit: () => {};
  @Input() OnClose: () => {};
  @Input() template: any;
  @Input() templateContext?: any = {};
  @Input() closeButton = true;
  // @Output() closeModal = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    console.log('activeModal', this.activeModal);
  }

  cancel() {
    this.activeModal.close();
    // this.closeModal.emit('close');
    // this.OnCancel();
  }

  close() {
    this.activeModal.close();
    // this.closeModal.emit('close');
    this.OnClose();
  }

  submit() {
    this.activeModal.close();
    // this.closeModal.emit('close');
    this.OnSubmit();
  }

  ngOnDestroy() {
    console.log('activeModal-close', this.activeModal);
  }

}

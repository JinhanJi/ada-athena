import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from './common/modal-manage/modal-manager.service';
import { CustomModalService } from './common/custom-modal/custom-modal.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { CustomTestDialogComponent } from './components/custom-test-dialog/custom-test-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ada-athena';

  constructor(
    private customModalService: CustomModalService,
    private modalManagerService: ModalManager,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    const options = {
      size: 'xl',
    }
    // this.customModalService.open(CustomTestDialogComponent)
    // .then((value) => {
    //   console.log(value);
    //   // this.closeModal();
    // }, () => {
    //   console.log("cancel3");
    //   // this.closeModal();
    // });
    this.modalManagerService.push(CustomTestDialogComponent, { custom: true });
    this.modalManagerService.push(DialogComponent, {priority: 1, options: {size: 'lg'}});
    this.modalManagerService.push(DialogComponent, {priority: 1, options});
    setTimeout(() => {
      this.modalManagerService.push(DialogComponent, { priority: 2 });
    }, 0);
  }

  openModal() {
    const option = {centered: true};
    // this.modalService.open(DialogComponent, option);
    this.modalManagerService.push(DialogComponent, {priority: 1});
    setTimeout(() => {
      const options = {
        size: 'xl',
      }
      this.modalManagerService.push(DialogComponent, { priority: 2, options });
    }, 0);
    // console.log('modalRef', modalRef);
    // console.log('closed', modalRef.closed);
    // console.log('componentInstance', modalRef.componentInstance);
    // // console.log('dismiss', modalRef.dismissd);
    // console.log('result', modalRef.result);
    // modalRef.result.then(res =>{ 
    //   console.log('2222', res)}).catch(() => {
    //     console.log(3333)
    //   })
    // console.log('hidden', modalRef.hidden);
    // console.log('shown', modalRef.shown);
    // console.log('hasOpenModals', this.modalService.hasOpenModals());
  }

  // openModal() {
    // this.modalService.push(DialogComponent, { priority: 1});
    // setTimeout(() => {
    //   this.modalService.push(DialogComponent, { priority: 1});
    // }, 1000);
  // }
}

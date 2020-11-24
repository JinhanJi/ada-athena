import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ModalManager } from '../../common/modal-manage/modal-manager.service';

@Component({
  selector: 'app-first-child',
  templateUrl: './first-child.component.html',
  styleUrls: ['./first-child.component.scss']
})
export class FirstChildComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private modalManagerService: ModalManager,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log('first-child');
      const options = { centered: true};
      // this.modalService.open(DialogComponent, { centered: false});
      this.modalManagerService.push(DialogComponent, {priority: 3, options});
    }, 5000);
  }

}

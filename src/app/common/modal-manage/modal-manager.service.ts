import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalService } from '../custom-modal/custom-modal.service'
import Queue from './queue';

interface ModalOptions {
  options?: NgbModalOptions | any;
  custom?: boolean; // 自定义弹窗组件（默认为否）
  priority?: number; // 优先级: 最小及默认为1
}

interface Modal {
  content: any; // TemplateRef 或 Component
  modalOptions?: ModalOptions;
}

@Injectable({
  providedIn: 'root',
})
export class ModalManager{

  private queue = new Queue(); // 弹窗队列

  private currentModal: any;

  private modalRef: NgbModalRef;

  private highLevelQueue = new Queue();

  private highLevelModalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private customModalService: CustomModalService,
  ) {}

  public push(
    content: any,
    modalOptions?: ModalOptions,
  ): void {
    const modalInstance = {
      ...modalOptions,
      content,
      custom: modalOptions && modalOptions.custom || false,
      priority: modalOptions && modalOptions.priority ? modalOptions.priority : 1,
    }

    if (this.queue.isEmpty()) {
      this.queue.enqueue(modalInstance);
      this.openModal();
    } else {
      if (this.currentModal && this.currentModal.priority < modalInstance.priority) {
        if (this.highLevelQueue.isEmpty()) {
          this.highLevelQueue.enqueue(modalInstance);
          this.openHighLevelModal();
        } else {
          this.highLevelQueue.enqueue(modalInstance);
        }
      } else {
        this.queue.enqueue(modalInstance);
      }
    }
  }

  private openModal() {
    // 打开弹窗
    this.currentModal = this.queue.front();
    if (this.currentModal.custom) {
      // 自定义弹窗
      this.customModalService.open(this.currentModal.content)
      .then((value) => {
        this.closeModal();
      }, () => {
        this.closeModal();
      });
    } else {
      // 默认通过NgbModal打开弹窗
      this.modalRef = this.modalService.open(this.currentModal.content, this.currentModal.options);

      // 监听弹窗关闭
      this.modalRef.result
      .then(() => {
        // 正常关闭
        this.closeModal();
      })
      .catch(() => {
        // 异常关闭（点击背景关闭）
        this.closeModal();
      });
    }
  }

  private closeModal() {
    this.currentModal = null;
    this.queue.dequeue();
    if (!this.queue.isEmpty()) {
      this.openModal();
    }
  }

  private openHighLevelModal() {
    const currentHighLevelModal = this.highLevelQueue.front();
    if (currentHighLevelModal.custom) {
      this.customModalService.open(currentHighLevelModal.content)
      .then((value) => {
        this.closeModal();
      }, () => {
        this.closeModal();
      });
    } else {
      this.highLevelModalRef = this.modalService.open(currentHighLevelModal.content, currentHighLevelModal.options);
      this.highLevelModalRef.result
      .then(() => {
        this.closeHighLevelModal();
      })
      .catch(() => {
        this.closeHighLevelModal();
      });
    }
  }

  private closeHighLevelModal() {
    this.highLevelQueue.dequeue();
    if (!this.highLevelQueue.isEmpty()) {
      this.openHighLevelModal();
    }
  }
}


import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
})
export class ModalErrorComponent {
  @Input() showErrorModal: boolean = false;
  @ViewChild('errorModal') errorModal!: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  ngOnChanges(): void {
    if (this.showErrorModal) {
      this.open();
    }
  }

  open(): void {
    this.modalService.open(this.errorModal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  close(): void {
    this.modalService.dismissAll();
  }
}

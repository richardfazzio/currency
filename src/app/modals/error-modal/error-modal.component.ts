import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.less']
})
export class ErrorModalComponent {
  @Input() message: string;
  constructor(public activeModal: NgbActiveModal) {}
}

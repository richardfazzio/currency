import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.component.html',
  styleUrls: ['./results-modal.component.less']
})
export class ResultsModalComponent {
  @Input() results: Result[];
  constructor(public activeModal: NgbActiveModal) {}
}

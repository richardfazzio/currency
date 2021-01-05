import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ERROR_MESSAGES, TEXT_FILE } from './utils/constants';
import { ConverterService } from './services/converter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultsModalComponent } from './modals/results-modal/results-modal.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { ConverterError, ConverterResults, Result } from './utils/interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  text = '';
  file: File = null;
  converterSubscription: Subscription;

  constructor(private converterService: ConverterService, private modalService: NgbModal) { }

  ngOnInit(): void {
    // Subscribe to when the converter is done
    this.converterSubscription = this.converterService.currencyConverter
      .subscribe(res => this.handleResults(res));
  }

  ngOnDestroy(): void {
    // Unsubscribe to the converter
    this.converterSubscription.unsubscribe();
  }

  fileUploaded(evt) {
    const file: File = evt.target.files[0];
    // If the user unselects a file
    if (!file) {
      this.file = null;
      return;
    }
    // If the file is not a text file, return and display error message
    if (file.type !== TEXT_FILE) {
      this.file = null;
      this.openErrorModal(ERROR_MESSAGES.INVALID_FILE_TYPE);
      return;
    }
    this.file = file;
  }

  convertFile(): void {
    this.converterService.convertFile(this.file);
  }

  convertText(): void {
    this.converterService.convertText(this.text);
  }

  private openErrorModal(message): void {
    const errorModal = this.modalService.open(ErrorModalComponent, {
      keyboard: true,
      centered: true
    });
    errorModal.componentInstance.message = message;
  }

  // Opens Results Modal to display to user
  private handleResults(res: ConverterResults): void {
    if (!!res.error) {
      return this.handleError(res.error.message);
    }
    const resultModal = this.modalService.open(ResultsModalComponent, {
      keyboard: true,
      centered: true
    });
    resultModal.componentInstance.results = res.results;
  }

  // Open error modal and resubscribe to Subject
  private handleError(message: string): void {
    this.openErrorModal(message);
  }
}

import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { ResultsModalComponent } from './modals/results-modal/results-modal.component';
import { ConverterService } from './services/converter.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ResultsModalComponent,
        ErrorModalComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        NgbModule
      ],
      providers: [ConverterService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

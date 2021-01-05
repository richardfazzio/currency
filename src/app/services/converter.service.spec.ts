import { TestBed } from '@angular/core/testing';
import { ERROR_MESSAGES } from '../utils/constants';
import { ConverterResults } from '../utils/interfaces';

import { ConverterService } from './converter.service';

const TEST_CASES = [{
  input: `2
2 2
2
2 0
0 5
3 3
3 5
1 1 1
3 0 0
1 10 0`
  ,
  answer: {
    results: [
      {
        difference: 1,
        dataset: 1
      },
      {
        difference: 44,
        dataset: 2
      }
    ]
  }
},
{
  input: `3
3 3
2 3
0 0 1
1 1 1
10 10 10
2 5
10
0 0
99 99
0 1
5 1
2 2
4 3
1 2 3
4 5 6
10 0 0
5 5 5`
  ,
  answer: {
    results: [
      {
        difference: 99,
        dataset: 1
      },
      {
        difference: 1089,
        dataset: 2
      },
      {
        difference: 15,
        dataset: 3
      }
    ]
  }
  }, {
    invalidInput: `some invalid input`
  }, {
  invalidInput: `1 1 1 1`
}, ];

describe('ConverterService', () => {
  let converterService: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    converterService = TestBed.inject(ConverterService);
  });

  it('should be created', () => {
    expect(converterService).toBeTruthy();
  });

  it('should output correct dataset 1', () => {
    const subjectSpy = spyOn(converterService.currencyConverter, 'next');
    converterService.convertText(TEST_CASES[0].input);
    expect(subjectSpy).toHaveBeenCalledWith(TEST_CASES[0].answer);
  });

  it('should output correct dataset 2', () => {
    const subjectSpy = spyOn(converterService.currencyConverter, 'next');
    converterService.convertText(TEST_CASES[1].input);
    expect(subjectSpy).toHaveBeenCalledWith(TEST_CASES[1].answer);
  });

  it('should throw error for invalid input characters', () => {
    const subjectSpy = spyOn(converterService.currencyConverter, 'next');
    converterService.convertText(TEST_CASES[2].invalidInput);
    const error: ConverterResults = {
      error: {
        message: ERROR_MESSAGES.INVALID_INPUT_CHARACTERS
      }
    }
    expect(subjectSpy).toHaveBeenCalledWith(error);
  });

  it('should throw error for invalid input formatting', () => {
    const subjectSpy = spyOn(converterService.currencyConverter, 'next');
    converterService.convertText(TEST_CASES[3].invalidInput);
    const error: ConverterResults = {
      error: {
        message: ERROR_MESSAGES.GENERIC
      }
    }
    expect(subjectSpy).toHaveBeenCalledWith(error);
  });
});

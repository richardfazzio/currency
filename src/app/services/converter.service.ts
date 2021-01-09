import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ERROR_MESSAGES } from '../utils/constants';
import { ConverterResults } from '../utils/interfaces';

// Maybe Remove for provided in root if this service is used in more than one component?
@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  currencyConverter = new Subject<any>();

  // Converts string and computes data sets, data is returned in [currencyConverter] Subject
  convertText(text: string): void {
    try {
      // Regex, tests if the input string has anything that isn't a number or white space, tab, newline, etc...
      const letterRegex = /^[\d|\s]+$/g
      if (!letterRegex.test(text)) {
        // Return error
        return this.sendErrorMessage(ERROR_MESSAGES.INVALID_INPUT_CHARACTERS);
      }

      // Filter out empty strings, used if the user has new lines before or after data sata
      // TODO: Maybe could use regex here to remove spaces before or after data sets
      const rowStrings = text.split('\n').filter(s => s !== '' && s !== ' ');
      const rows = rowStrings.map(row => {
        // Split the numbers in each row and convert from string to number
        return row.split(' ').map(n => +n);
      });
      if (rows[0].length > 1) {
        return this.sendErrorMessage(ERROR_MESSAGES.GENERIC);
      }
      const numberOfTestCases = rows[0][0];
      // Remove the number of test cases from the data set;
      rows.shift();
      // Results array containing the difference in prices of [min / max]
      let results = [];
      for (let i = 0, j = 0; i < numberOfTestCases; i++) {
        // Do not need [numberOfDenomenations]
        const [numberOfDenomenations, numberOfItems] = rows[j];
        const denominationsScale = rows[j + 1];
        const items = rows.slice(j + 2, j + 2 + numberOfItems);
        if (!numberOfItems || !denominationsScale || (items && items.length !== numberOfItems)) {
          return this.sendErrorMessage(ERROR_MESSAGES.GENERIC);
        }
        const lowestDenoms = items.map((item) => {
          return item.reduce((previousDenom, denom, indexOfDenom) => {
            const currentDenoms = denom + previousDenom;
            // Check if we are are the last index
            // Since denominationsScale length is always D - 1 we can be sure that is never out of range
            // If we are at the last element return the total of the smallest denoms, else convert
            if (indexOfDenom === denominationsScale.length) {
              return currentDenoms;
            } else {
              return currentDenoms * denominationsScale[indexOfDenom];
            }
          }, 0);
        });
        const max = Math.max(...lowestDenoms);
        const min = Math.min(...lowestDenoms);
        results.push(max - min);
        j += 2 + numberOfItems
      }
      // If there are no results, likely the user input 0 for data sets
      if (!results.length) {
        return this.sendErrorMessage(ERROR_MESSAGES.GENERIC);
      }
      // Map the results to make it easier in the comonent to display
      results = results.map((result, i) => {
        return { difference: result, dataset: i + 1 };
      });
      // Send results through Subject
      this.currencyConverter.next({ results });
    } catch (err) {
      // Log error and send user a generic error message in modal
      console.error(err);
      this.sendErrorMessage(ERROR_MESSAGES.GENERIC);
    }
  }

  // Converts to file to string then calls [convertText]
  convertFile(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const text = fileReader.result.toString();
      this.convertText(text);
    };
    fileReader.readAsText(file);
  }

  // Sends error message through Subject
  private sendErrorMessage(message: string): void {
    const error: ConverterResults = {
      error: {
        message
      }
    };
    this.currencyConverter.next(error);
  }
}

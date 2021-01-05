# Denomenation Converter


This application uses Angular as a front-end framework. There didn't appear to be any need for a back-end as everything for this problem could be solved client side. Model View Control (MVC) was used as the design pattern, Model being the HTML, View being the CSS/LESS, and Control being Angular/TypeScript/JavaScript. For styles how the application looked I used Bootstrap alongside LESS, althought most is just Boostrap default styles. For unit tests Angular supports unit testing by default, using jasmine and karma. I made a few example test cases for the ConverterService to show off what they may look like.

---
## To view application or code

For ease of use, the application is hosted on firebase [here](https://currency-a225c.web.app/).

To view the source code of this application you may visit my github [here](https://github.com/richardfazzio/currency).

---
## To run this application locally
To run this application locally you will need Angular 11+ and NodeJs installed on your computer. To install this you need to close this repository by running `git clone https://github.com/richardfazzio/currency.git` or downloading the zip file and unpacking it yourself. After cloning the repository you will need to run `npm install` in the directory to install all of the dependencies. Once that is done, you need to run `ng serve` then you may navigate to http://localhost:4200 to view the application. You may also run some of the unit tests by running the command `ng test`, which will open a browser and run the test cases.

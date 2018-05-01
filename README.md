# Survey

## Description

The app has three lists of questions by default. It randomly chooses one list of questions to show before the page is loaded.

Sometimes it shows message "Question list can not be loaded". It's a normal. In this way the app has received an empty json with questions.

User should answer all given questions to see a result. Otherwise, the app will show a warning message.

After submitting answers the app shows a score and highlights questions with correct (green) and incorrect (red) answers.

### Correct answers

List 1: All first options
List 2: All third options
List 3: All second options

### Tech Stack

* ES6
* npm
* enzyme
* Jasmine

---

## Getting Started

### Installing

To prepare this app for running you have to:

1. Install **node.js** if don't have one use a command `brew install node` or download and install it with this [link](https://nodejs.org/en/download/)
2. `unzip elder.zip`
3. `cd elder`
4. `npm i`

### Running app

`npm start`

After running this command the browser will be automatically opened with link **localhost:3000**

### Running test

`npm test -- -t returns`

and then press `a`
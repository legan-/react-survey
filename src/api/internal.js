import _questions_1 from './questions-1.json';
import _questions_2 from './questions-2.json';
import _questions_3 from './questions-3.json';

import answers from './answers.json';

const TIMEOUT = 200;


export default {
  getData: (number, data, timeout) => (
    setTimeout(() => { 
      let questions = '';

      switch (number) {
        case 1:
          questions = _questions_1;
          break;
        case 2:
          questions = _questions_2;
          break;
        case 3:
          questions = _questions_3;
          break;
        default:
          questions = [];
      }

      return data(questions);

    }, timeout || TIMEOUT)
  ),

  sendData: (payload, response, timeout) => (
    setTimeout(() => { 
      console.log('server side data:', payload);

      let result = payload;

      for (let i in payload) {
        const value = parseInt(payload[i], 10);
        if (value === answers[i]) {
          Object.assign(result, { [i]: true });
        } else {
          Object.assign(result, { [i]: false });
        }
      }

      return response(result);
    }, timeout || TIMEOUT)
  )
}
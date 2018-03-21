import internal from '../api/internal';

export const getQuestions = (number, data) => internal.getData(number, data);
export const sendAnswers = (data, response) => internal.sendData(data, response, 400);
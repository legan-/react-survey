import React from 'react';
import { shallow } from 'enzyme'
import Question from './Question';


const setup = (questionId, noAnswerIds) => {
  const data = {
    id: 0,
    question: 'First question',
    options: [ 
      'First option',
      'Second option',
      'Third option'
    ]
  }

  const component = shallow(
    <Question
      questionId={ questionId }
      noAnswerIds={ noAnswerIds }
      results={ {} }
      optionChangeHandle={ null }
      data={ data }
    />
  );

  return {
    component: component,
    data,
    text: component.find('.question-text')
  }
}

describe('Question component', () => {
  it('should display correct question number', () => {
    const questionId = 1;
    const { text, data } = setup(questionId, []);
    expect(text.text()).toMatch(`${ questionId.toString() }. ${ data.question }`);
  });  

  it('should display question text', () => {
    const { text, data } = setup(1, []);
    expect(text.text()).toMatch(data.question);
  });

  it('should display all options', () => {
    const questionId = 1;
    const { component, data } = setup(questionId, []);
    const optionsLength = data.options.length;
    expect(component.render().find('.option').length).toBe(optionsLength);
  });

  it('should highlight unanswered question', () => {
    const questionId = 1;
    const noAnswerIds = [0];
    const { component } = setup(questionId, noAnswerIds);
    expect(component.render().hasClass('warning')).toBe(true);
  });

  it('should not highlight answered question', () => {
    const questionId = 1;
    const noAnswerIds = [1, 2];
    const { component } = setup(questionId, noAnswerIds);
    expect(component.render().hasClass('warning')).toBe(false);
  });
});
import React from 'react';
import { shallow } from 'enzyme'
import Option from './Option';


const setup = () => {
  const text = 'Second option'

  const component = shallow(
    <Option
      questionId={ 0 }
      optionId={ 1 }
      onChange={ null }
      isDisabled={ false }
      option={ text }
    />
  );

  return {
    component: component,
    text
  }
}

describe('Option component', () => {
  it('should display option text', () => {
    const { text, component } = setup();
    expect(component.render().find('label').text()).toMatch(text);
  }); 
});
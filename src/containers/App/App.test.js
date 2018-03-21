import React from 'react';
import { shallow } from 'enzyme'
import App from './App';
import List from '../../components/List/List';
import Question from '../../components/Question/Question';
import Option from '../../components/Option/Option';


const setup = () => {
  const component = shallow(<App />);

  return {
    component: component,
    container: component.find('.container')
  }
}

describe('App Component', () => {
  it('should display ".container"', () => {
    const { container } = setup();
    expect(container.exists()).toBe(true);
  });

  describe('when question list not received', () => {
    const state = (loaded) => {
      return { 
        questions: [],
        completed: false,
        loaded
      }
    }

    it('should show "loading" message', () => {
      const { component } = setup();
      component.setState(state(false));
      expect(component.render().find('h3').text()).toMatch(/^Loading questions.../);
    });

    it('should show "can not be loaded" message', () => {
      const { component, container } = setup();
      component.setState(state(true));
      expect(component.render().find('h3').text()).toMatch(/^Question list can not be loaded/);
    });
  });

  describe('when question list is received', () => {
    const state = (completed) => {
      return { 
        questions: [
          {
            "id": 0,
            "question": "First question",
            "options": [ 
              "First option",
              "Second option",
              "Third option"
            ]
          },
          {
            "id": 12,
            "question": "Second question",
            "options": [ 
              "First option",
              "Second option"
            ]
          }
        ],
        completed,
        loaded: true
      }
    }

    it('should display block of questions', () => {
      const { component } = setup();
      component.setState(state(false));
      expect(component.find('.questions').exists()).toBe(true);
    });

    it('should display all the questions received from the server', () => {
      const { component } = setup();
      component.setState(state(false));
      const questionsLength = component.state().questions.length;
      expect(component.render().find('.question-container').length).toBe(questionsLength);
    });

  });
});
import React, { Component } from 'react';

import { getQuestions, sendAnswers } from '../../actions';
import List from '../../components/List/';


class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],      // List of questions received from server
      answers: {},        // User's answers
      results: {},        // Results received from the server
      noAnswerIds: [],    // IDs of the questions with no answers
      loaded: false,      // Has the list of questions been received?
      completed: false,   // Has survey been completed?
      score: 0,           // User's total score
      totalScore: 0       // Total possible score
    }
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onTryAgainClick = this.onTryAgainClick.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  // Reaload question list
  updateQuestions() {

    // Generate a random number to choose the list of questions from server
    const number = Math.floor(Math.random() * (5 - 1) + 1);

    // Receive the list of questions from server
    getQuestions(number, questions => {
      const answers = questions.reduce(((o, key) => ({ ...o, [key.id]: null })), {});

      this.setState({
        questions,
        answers,
        loaded: true
      });
    });
  }

  // 'Submit all answers' handler
  onSubmitClick(e) {
    const answers = this.state.answers;

    let counter = 0;
    let noAnswerIds = [];

    for (let prop in answers) {

      // Collect IDs of the questions without answers
      if (answers[prop] === null) {
        noAnswerIds = [...noAnswerIds, parseInt(prop, 10)]
      } else {
        counter++;
      }
    }

    // Check if all the questions are answered
    if (Object.keys(answers).length === counter) {
      sendAnswers(this.state.answers, results => {
        if (results) {

          // Calculate user's score and total possible score 
          const score = Object.values(results).filter(value => value).length * 10;
          const totalScore = Object.keys(results).length * 10;

          this.setState({
            completed: true,
            results,
            noAnswerIds,
            score,
            totalScore
          });
        }
      });
    } else {
      this.setState({
        noAnswerIds
      });
    }
    e.preventDefault();
  }

  // 'Reset' handler 
  onTryAgainClick(e) {
    this.setState({
      questions: [],
      answers: {},
      results: {},
      loaded: false,
      completed: false,
      score: 0,
      totalScore: 0
    });
    this.updateQuestions();
    e.preventDefault();
  }

  // 'Choose an option' handler
  onOptionChange(e) {
    const question = e.target.getAttribute('question');
    const option = e.target.getAttribute('option');
    const answers = Object.assign(this.state.answers, { [question]: option })

    this.setState({
      answers
    });    
  }

  componentDidMount() {
    this.updateQuestions()
  }

  render() {
    // Message block under the list of questions
    const message = (
      this.state.noAnswerIds.length ? (
        <h4 className='message warning'>
          Please answer questions highlighted in red.
        </h4>
      ) : (
        <h4 className='message'>
          { 
            this.state.completed ? (
              `Your score is ${ this.state.score } out of ${ this.state.totalScore }.${ this.state.score === this.state.totalScore ? ' Congratulations!' : '' }`
            ) : ('')
          }
        </h4>
      )
    );

    // Questions block
    const questions = (
      <div>
        <h3 className='text-center'>Answer the following questions</h3>
        <div className='questions'>
          <List
            questions={ this.state.questions }
            noAnswerIds={ this.state.noAnswerIds }
            results={ this.state.results }
            onOptionChange={ this.onOptionChange }
          />
        </div>
        { message }
        <div className='btn-container'>
          { 
            this.state.completed ? (
              <button onClick={ this.onTryAgainClick }>Try again</button>
            ) : (
              <button onClick={ this.onSubmitClick }>Submit</button>
            )
          }
        </div>
      </div>
    );

    // 'Could not load' message
    const couldNotLoad = (
      <div>
        <h3 className='text-center'>Question list can not be loaded</h3>
        <div className='btn-container'>
          <button onClick={ this.onTryAgainClick }>Try again</button>
        </div>
      </div>
    );

    // 'Loading' message
    const loading = (
      <div>
        <h3 className='text-center'>Loading questions...</h3>
      </div>
    );

    // Content block
    const content = this.state.loaded ? 
      this.state.questions.length ? 
        questions
      :
        couldNotLoad
    : loading

    return (
      <div className='container'>
        <h1 className='text-center'>Survey</h1>
        { content }
      </div>
    );
  }
}

export default App;

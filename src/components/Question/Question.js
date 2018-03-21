import React from 'react';
import PropTypes from 'prop-types';

import Option from '../Option/';


const Question = ({ questionId, noAnswerIds, results, onOptionChange, data }) => {
  const noAnswerClassName = noAnswerIds.includes(data.id) ? ' warning' : '';

  const questionText = `${ questionId }. ${ data.question }`;

  const isOptionDisabled = Object.keys(results).length ? true : false;

  const textWrapper = Object.keys(results).length ? (
    <div className={ 'question-text ' + (results[data.id] ? 'correct' : 'incorrect') }>
      { questionText }
      <small>{ results[data.id] ? ' - correct' : ' - incorrect' }</small>
    </div>
  ) : (
    <div className='question-text'>
      { questionText }
    </div>
  )

  return (
    <div className={ `question-container${ noAnswerClassName }` }>
      { textWrapper }
      { data.options.map((option, optionId) => (
        <Option
          key={ optionId }
          questionId={ data.id }
          optionId={ optionId }
          onChange={ onOptionChange }
          isDisabled={ isOptionDisabled }
          option={ option }
        />
      ))}
    </div>
  )
}

Question.PropTypes = {
  questionId:     PropTypes.number.isRequired,
  noAnswerIds:    PropTypes.array.isRequired,
  results:        PropTypes.object.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  data:           PropTypes.object.isRequired
}

export default Question;
import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question/';


const List = ({ questions, noAnswerIds, results, onOptionChange }) => (
  questions.map((question, id) => (
    <Question
      key={ id }
      questionId={ id + 1 }
      noAnswerIds={ noAnswerIds }
      results={ results }
      onOptionChange={ onOptionChange }
      data={ question }
    />
  ))
)

List.PropTypes = {
  questions:      PropTypes.array.isRequired,
  noAnswerIds:    PropTypes.array.isRequired,
  results:        PropTypes.object.isRequired,
  onOptionChange: PropTypes.func.isRequired
}

export default List;
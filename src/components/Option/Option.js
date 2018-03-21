import React from 'react';
import PropTypes from 'prop-types';


const Option = ({ questionId, optionId, onChange, isDisabled, option }) => {
  const id = `option-${ questionId }-${ optionId }`;

  return (
    <div className='option'>
      <input
        name={ `question-${ questionId }` }
        id={ id }
        type='radio'
        question={ questionId }
        option={ optionId }
        disabled={ isDisabled }
        onChange={ onChange }
      />
      <label
        htmlFor={ id }
      >
        { option }
      </label>
    </div>
  )
}

Option.PropTypes = {
  questionId: PropTypes.number.isRequired,
  optionId:   PropTypes.number.isRequired,
  onChange:   PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  option:     PropTypes.string.isRequired
}

export default Option;
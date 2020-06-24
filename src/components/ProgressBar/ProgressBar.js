import React, {Fragment} from 'react';
import './ProgressBar.css';
import validator from 'validator'
import { passwordRegex } from '../../constants/regex';
const ProgressBar = ({ value }) => {
  const testedResult = (password, reg = passwordRegex) => {
    if(!validator.matches(password, reg)){
      if(password.length > 20){
        return {quality: 'Invalid', percentage: 100}
      }
      return {quality: 'Weak', percentage: 1}
    } else {
      if(password.length < 8) {
        return {quality: 'Medium', percentage: 50}
      }else {
       return {quality: 'Strong', percentage: 80}
      }
    }
  } 
  const grade = testedResult(value, passwordRegex);

  return (
    <div className="progressBar__container">
        {value && (
          <Fragment>
              <p className="progressBar__title">Password Strength</p>
            {value}
            <progress
              className={`${grade.quality}`}
              max="100"
              value={grade.percentage}
            ></progress>
            <p className="progressBar__grade">{grade.quality}</p>
          </Fragment>
        )}
    </div>
  );
};

ProgressBar.defaultProps = {
  grade: null,
};
export default ProgressBar;

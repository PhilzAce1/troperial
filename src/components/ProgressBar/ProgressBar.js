import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ grade }) => {
  return (
    <div className="progressBar__container">
      {grade === null ? null : (
        <>
          <p className="progressBar__title">Password Strength</p>
          <progress
            className={`${grade.quality}`}
            max="100"
            value={grade.percentage}
          ></progress>
          <p className="progressBar__grade">{grade.quality}</p>
        </>
      )}
    </div>
  );
};

ProgressBar.defaultProps = {
  grade: null,
};
export default ProgressBar;

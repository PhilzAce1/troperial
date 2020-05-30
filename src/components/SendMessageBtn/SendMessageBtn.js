import React, { Fragment } from 'react';
import { connect } from 'react-redux';

function SendMessageBtn(props) {
  console.log(props);
  // console.log(have, need, rate, by);
  return (
    <Fragment>
      <button
        className="send__message__btn"
        onClick={() => console.log('something')}
      >
        Send Message
      </button>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(SendMessageBtn);

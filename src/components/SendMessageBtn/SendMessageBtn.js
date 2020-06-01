import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  newConversationFromListing,
  createConversation,
  createUser as CreateCurrentUser,
} from '../../actions/conversationActions';
import {
  createUser,
  conversationExist,
} from '../../libs/conversationHelpers';

function SendMessageBtn(
  props,
  //   {
  //   by,
  //   have,
  //   need,
  //   newConversationFromListing,
  //   rate,
  //   conversations,
  //   selectedConversation,
  // }
) {
  async function onClick() {
    // let currentUser = conversations.userId
    //   ? conversations.userid
    //   : await createUser(by);
    // check if conversation with user exist : createConversation
    // change the Selected Conversation
    // change listing details
  }
  console.log(props);
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
  return {
    conversations: state.conversation.conversations,
    selectedConversation: state.conversation.selectedConversation,
    state,
  };
};

export default connect(mapStateToProps, {
  newConversationFromListing,
  createConversation,
  CreateCurrentUser,
})(SendMessageBtn);

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import {
  conversationChanged,
  listingChanged,
  userDetails,
  newConversation,
  userConversations,
} from '../../actions/conversationActions';
import {
  createUser,
  conversationExist,
  createConversation,
} from '../../libs/conversationHelpers';
import { finders } from './helpers/finders';
import { UPDATE_PROFILE } from '../../actions/types';
function SendMessageBtn({
  by,
  have,
  need,
  rate,
  newConversation,
  conversation,
  listingChanged,
  conversationChanged,
  user,
  userDetails,
  state,
  userConversations,
  handleBackDrop,
  step,
}) {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  // check if user exist : create new User
  async function getUserData() {
    try {
      if (!user || !user.username || user.username === '') {
        const authUsername = await Auth.currentAuthenticatedUser();
        if (authUsername.attributes['custom:userName']) {
          user.username = authUsername.attributes['custom:userName'];
        } else {
          alert('PLEASE UPDATE YOUR PROFILE NOW !!!');
        }
      }
      let {
        payload: {
          id,
          username,
          conversations: { items: conversations },
        },
      } = await createUser(user.username);
      userDetails(id, username);
      userConversations(conversations, username);
    } catch (e) {
      console.log(e);
    }
  }
  async function clicked() {
    if (step === UPDATE_PROFILE) {
      return handleBackDrop();
    }
    setLoading(true);
    //check if the conversation already exist in store
    const convo = finders(conversation.conversations, by);
    if (convo.exist) {
      //change the selected conversation
      conversationChanged(convo.conversation.id);
      listingChanged(true, by, have, need, rate);
      setLoading(false);
      return history.push('/messages');
    }
    try {
      if (
        conversation.user.username === undefined ||
        conversation.user.username === '' ||
        conversation.user === {} ||
        conversation.user.id === undefined
      ) {
        await getUserData();
      }
      let newConvo;
      let currentUser = conversation.user;
      if (currentUser.username === by) {
        return console.log('user is trying to message himsef');
      }
      // create the otheruser or get details if he exists
      let otherUser = await createUser(by);
      otherUser = { ...otherUser }.payload;
      let convoExist = await conversationExist(
        currentUser.id,
        otherUser.id,
      );
      if (convoExist.result) {
        newConversation(
          convoExist.conversationId,
          convoExist.members
            .filter((user) => user !== currentUser.username)
            .join(''),
        );
        conversationChanged(convoExist.conversationId);
      } else {
        newConvo = await createConversation(currentUser, otherUser);
        newConversation(
          newConvo.conversationId,
          newConvo.members
            .filter((user) => user !== currentUser.username)
            .join(''),
        );
        conversationChanged(newConvo.conversationId);
      }
      listingChanged(true, by, have, need, rate);
      setLoading(false);
      history.push('/messages');
    } catch (e) {
      console.log(e);
      alert('error');
    }
  }
  return (
    <Fragment>
      <button
        disabled={loading}
        className="send__message__btn"
        onClick={clicked}
      >
        {loading ? (
          <PulseLoader size={3} color={'#fff'} loading={loading} />
        ) : (
          'Send Message'
        )}
      </button>
    </Fragment>
  );
}
const mapDispatchToProps = (dispatch) => ({
  userConversations: (items) => dispatch(userConversations(items)),
  conversationChanged: (conversationId) =>
    dispatch(conversationChanged(conversationId)),
  listingChanged: (status, by, have, need, rate) =>
    dispatch(listingChanged(status, by, have, need, rate)),
  newConversation: (id, members) =>
    dispatch(newConversation(id, members)),
  userDetails: (userId, username) =>
    dispatch(userDetails(userId, username)),
});
const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    step: state.ui.step,
    user: state.auth,
    selectedConversation: state.conversation.selectedConversation,
    state,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendMessageBtn);

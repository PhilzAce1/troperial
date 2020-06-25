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
import { confirmProfileUpdateForChat } from '../../actions/auxActions';
import {
  createUser,
  conversationExist,
  createConversation,
} from '../../libs/conversationHelpers';
import { finders } from './helpers/finders';

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
  profileUpdated,
  confirmProfileUpdateForChat,
}) {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
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
    if (!profileUpdated) {
      confirmProfileUpdateForChat(false);
      return handleBackDrop();
    }

    confirmProfileUpdateForChat(true);

    // if (!user.username) return alert('please update you Profile');
    setLoading(true);
    const convo = finders(conversation.conversations, by);
    if (convo.exist) {
      conversationChanged(convo.conversation.id);
      listingChanged(true, by, have, need, rate);
      setLoading(false);
      return history.push('/messages');
    }
    // TODO ...if conversation on the Local state exist with that user ...simply go there
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
  confirmProfileUpdateForChat: (payload) =>
    dispatch(confirmProfileUpdateForChat(payload)),
});
const mapStateToProps = (state) => {
  return {
    profileUpdated: state.auth.profileUpdated,
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

import React, { useEffect } from 'react';
import Avatar from 'react-avatar';
// import dp from '../../assets/images/profile-picture.png';
import './UserConvoButton.css';
import { connect } from 'react-redux';

const UserConvoButton = ({
  conversation,
  isActive,
  onConversationItemSelected,
  conversations,
  state,
}) => {
  useEffect(() => {}, [conversation.messages, conversations, state]);
  let userAvatar;

  if (
    conversation.chatUserProfile &&
    conversation.chatUserProfile.userProfileLoaded &&
    conversation.chatUserProfile.data
  ) {
    userAvatar = (
      <Avatar
        name={`${conversation.chatUserProfile.data.firstName} ${conversation.chatUserProfile.data.lastName}`}
        size="25"
        email={conversation.chatUserProfile.data.email}
      />
    );
  }
  if (
    !conversation.chatUserProfile.userProfileLoaded &&
    conversation.title
  ) {
    userAvatar = <Avatar name={`${conversation.title}`} size="25" />;
  }
  return (
    <button
      className={`user-convo-btn ${isActive && 'active-chat'}`}
      style={{
        outline: 'none',
      }}
      onClick={() => {
        return onConversationItemSelected(conversation.id);
      }}
    >
      <span>
        {/* {conversation.chatUserProfile.data && (
          <Avatar
            name={`${conversation.chatUserProfile.data.firstName} ${selectedConversation.chatUserProfile.data.lastName}`}
            size="150"
            email={conversation.chatUserProfile.data.email}
          />
        )} */}
        {userAvatar}
      </span>
      <span className="username">@{conversation.title}</span>
      {conversation.messages.some(
        (message) => message.read === false,
      ) && <span className="unread-messages"></span>}
    </button>
  );
};
const mapStateToProps = (state) => ({
  conversations: state.conversation.conversations,
  state,
});

export default connect(mapStateToProps)(UserConvoButton);

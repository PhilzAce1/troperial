import React, { useEffect } from 'react';
import './ChatConversationList.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { API, graphqlOperation } from 'aws-amplify';
import { connect } from 'react-redux';

import { onCreateConvoLink as OnCreateConvoLink } from '../../../libs/graphql';
import UserConvoButton from '../../../components/UserConvoButton/UserConvoButton';
// import ScaleLoader from 'react-spinners/ScaleLoader';
import {
  searchFilter,
  clearFilter,
} from '../../../actions/conversationActions';

const ChatConversationList = ({
  conversations,
  selectedConversationId,
  onConversationItemSelected,
  searchFilter,
  clearFilter,
  searchResult,
  user,
}) => {
  // search function
  const search = (e) => {
    if (e.target.value === '') return;
    searchFilter(e.target.value);
  };
  useEffect(() => {
    if (user && user.id) {
      const subscription = API.graphql(
        graphqlOperation(OnCreateConvoLink, {
          convoLinkUserId: '12234',
        }),
      ).subscribe({
        next: (eventData) => {
          console.log(eventData);
        },
      });
      return () => subscription.unsubscribe();
    }
  }, [user]);
  let conversationList;
  let searchResultconversationList;
  if (conversations && conversations.length > 0) {
    conversationList = conversations.map((conversation, i) => (
      <UserConvoButton
        key={conversation.id}
        isActive={conversation.id === selectedConversationId}
        conversation={conversation}
        onConversationItemSelected={onConversationItemSelected}
      />
    ));
  } else if (conversations && conversations.length < 0) {
    conversationList = (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3>No conversation </h3>
      </div>
    );
  } else {
    // let x = <ScaleLoader loading={true} />;

    conversationList = (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
        }}
      >
        <h1>No Conversation</h1>
      </div>
    );
  }
  searchResultconversationList = searchResult.map(
    (conversation, i) => {
      return (
        <div key={conversation.id} onClick={() => clearFilter()}>
          <UserConvoButton
            isActive={conversation.id === selectedConversationId}
            conversation={conversation}
            onConversationItemSelected={onConversationItemSelected}
          />
        </div>
      );
    },
  );
  // }
  return (
    <section className="conversation__list">
      <Scrollbars
        style={{ height: '100%' }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <h2>Conversations</h2>
        <input
          // value={searchParam}
          type="text"
          placeholder="Search"
          className="conversation__list--search-bar"
          onChange={search}
        />
        {searchResult && searchResult.length > 0 && (
          <div className="search_result">
            {searchResultconversationList}
          </div>
        )}
        {conversationList}
      </Scrollbars>
    </section>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchFilter: (input) => dispatch(searchFilter(input)),
    clearFilter: () => dispatch(clearFilter()),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.coonversation,
    searchResult: state.conversation.search,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatConversationList);

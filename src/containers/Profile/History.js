import React from 'react';
import './Profile.css';
import MyListings from '../Listings/MyListings';
import {connect} from 'react-redux';
const History = ({handleDeleteModal, totalListingsPosted, conversationLength, handleEditBackDrop}) => {
  return (
    <section className="history_container">
      <header className="stats">
        <div className="stats-item">
          <span className="stats-figure listings_posted">
          {totalListingsPosted}
          </span>
          <span className="stats-title">Listings Posted</span>
        </div>
        <div className="stats-item">
          <span className="stats-figure conversations_started">
           {conversationLength}
          </span>
          <span className="stats-title">Conversations Started</span>
        </div>
        <div className="stats-item">
          <span className="stats-figure transactions_completed">
            1
          </span>
          <span className="stats-title">Transactions Completed</span>
        </div>
      </header>
      <div>
        <h2>Your Listings</h2>
      </div>
      <MyListings handleDeleteModal={handleDeleteModal} handleEditBackDrop={handleEditBackDrop}/>
    </section>
  );
};
const mapStateToProps = (state) => ({
  totalListingsPosted: state.myTransaction.totalListingsPosted,
  conversationLength: state.conversation.conversationLength
});

export default connect(mapStateToProps, null)(History);

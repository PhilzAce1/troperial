import React from 'react';
import './Profile.css';
import TableHead from '../../components/TableHead/TableHead';
import TableContent from '../../components/TableContent/TableContent';
import Pagination from 'react-pagination-js';

const History = () => {
  return (
    <section className="history_container">
      <header className="stats">
        <div className="stats-item">
          <span className="stats-figure listings_posted">2</span>
          <span className="stats-title">Listings Posted</span>
        </div>
        <div className="stats-item">
          <span className="stats-figure conversations_started">
            5
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
      <div className="table-container">
        <TableHead userListing={true} />
        <TableContent
          have="$1500"
          need="(NGN) Nigerian naira"
          rate="1 USD > NGN 470"
          status="Pending"
          userListings={true}
        />
      </div>
      
      <div className="listing_pagination">
                <Pagination
                //   currentPage={currentPage}
                  totalSize={21}
                  sizePerPage={5}
                //   changeCurrentPage={changeCurrentPage}
                  theme="bootstrap"
                />
     </div>
    </section>
  );
};
export default History;

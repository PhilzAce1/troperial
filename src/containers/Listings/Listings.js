import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TableContent from '../../components/TableContent/TableContent';
import Container from '../../components/Container/Container';
import TableHead from '../../components/TableHead/TableHead';
import AppAside from '../../components/AppAside/AppAside';
import BackDrop from '../../components/BackDrop/BackDrop';
import AppMain from '../../components/AppMain/AppMain';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Banner from '../../components/Banner/Banner';
import NavBar from '../../components/NavBar/NavBar';
import ListingsFilters from '../ListingsFilters/ListingsFilters';
import Pagination from 'react-pagination-js';
import { connect } from 'react-redux';
import { getTransactions } from '../../actions/transactionActions';
import { checkUserProfile } from '../../actions/authActions';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import 'react-pagination-js/dist/styles.css';
import './Listings.css';

import { currency_symbols } from '../../constants/currency_symbols';
const Listings = ({
  getTransactions,
  transactionData,
  checkUserProfile,
}) => {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    checkUserProfile();
    getTransactions();
  }, []);
  const changeCurrentPage = (numPage) => {
    setCurrentPage(numPage);
    getTransactions(numPage);
  };

  const changePage = () => {
    const nextpage = currentPage + 1;
    setCurrentPage(nextpage);
    getTransactions(nextpage);
  };
  const previous = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    getTransactions(prevPage);
  };
  const handleBackDrop = () => {
    const show = showBackDrop;
    setShowBackDrop(!show);
  };

  return (
    <Container showBackDrop={showBackDrop}>
      <NavBar page="Listings" icon="fas fa-align-justify" />
      {showBackDrop ? (
        <BackDrop handleBackDrop={handleBackDrop} />
      ) : null}
      {showDelete ? (
        <DeleteModal handleClose={() => setShowDelete(!showDelete)} />
      ) : null}
      <div className="listingsCustom__container">
        <AppAside />
        <AppMain>
          <Banner onClick={handleBackDrop} />
          <Tabs>
            <TabList>
              <Tab>All Listings</Tab>
              <Tab>My Listings</Tab>
            </TabList>

            <TabPanel>
              {/* <ListingsFilters/> */}
              {transactionData === null ? (
                <div className="listings_spinner">
                  <ScaleLoader
                    size={150}
                    color={'#0383ef'}
                    loading={true}
                  />
                </div>
              ) : (
                <div className="table-container">
                  <TableHead userListing={false} />
                  {transactionData.transactionBatchResponseList.map(
                    (transaction) => (
                      <TableContent
                        have={`${
                          currency_symbols[transaction.sourceCurrency]
                        } ${transaction.sourceAmount}`}
                        need={`${
                          currency_symbols[
                            transaction.destinationCurrency
                          ]
                        } ${transaction.destinationAmount}`}
                        rate="1 USD > NGN 470"
                        by={`@${transaction.userAlias}`}
                        status={transaction.transactionState}
                        userListings={false}
                        key={transaction.transactionId}
                      />
                    ),
                  )}
                </div>
              )}

              <div className="listing_pagination">
                <Pagination
                  currentPage={currentPage}
                  totalSize={21}
                  sizePerPage={5}
                  changeCurrentPage={changeCurrentPage}
                  theme="bootstrap"
                />
                <div className="listings_mobile_buttons">
                  {currentPage === 1 ? null : (
                    <button
                      className="listing_previous"
                      onClick={() => previous()}
                    >
                      Previous
                    </button>
                  )}
                  <button
                    className="listing_showMore"
                    onClick={(e) => changePage()}
                  >
                    Show More
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
              <div className="table-container">
                <TableHead userListing={true} />
                <TableContent
                  have="$1500"
                  need="(NGN) Nigerian naira"
                  rate="1 USD > NGN 470"
                  status="Pending"
                  userListings={true}
                  onClick={() => setShowDelete(!showDelete)}
                />
              </div>
            </TabPanel>
          </Tabs>
        </AppMain>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  transactionData: state.transaction.transactions,
  loading: state.transaction.loading,
});

export default connect(mapStateToProps, {
  getTransactions,
  checkUserProfile,
})(Listings);

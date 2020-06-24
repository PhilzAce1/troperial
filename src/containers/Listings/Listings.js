import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import 'react-pagination-js/dist/styles.css';
import './Listings.css';
/**
 * COMPONENTS
 */
import PaddedContainer from '../../components/PaddedContainer/PaddedContainer';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import Container from '../../components/Container/Container';
import AppAside from '../../components/AppAside/AppAside';
import BackDrop from '../../components/BackDrop/BackDrop';
import AppMain from '../../components/AppMain/AppMain';
import Banner from '../../components/Banner/Banner';
import NavBar from '../../components/NavBar/NavBar';
/**
 * CONTAINERS
 */
import ListingsFilters from '../ListingsFilters/ListingsFilters';
import AllListings from './AllListings';
import MyListings from './MyListings';
/**
 * ACTIONS
 */
import { getTransactions } from '../../actions/transactionActions';
import {
  checkUserProfile,
} from '../../actions/authActions';

const Listings = ({
  getTransactions,
  checkUserProfile,
  notification
}) => {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [controlView, setControlView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(5);
  useEffect(() => {
    checkUserProfile();
    if(localStorage.getItem('unAuthenticatedUserListing')) {
      handleBackDrop();
    }

  }, [checkUserProfile]);
  const handleBackDrop = () => {
    const show = showBackDrop;
    setShowBackDrop(!show);
    setControlView(!controlView);
  };

  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
    setControlView(!controlView);
  };

  const listSizeHandler = (value) => {
    setCurrentPage(1);
    setCurrentSize(value);
    getTransactions(1, value);
  };
  const changeCurrentPage = (numPage) => {
    setCurrentPage(numPage);
    getTransactions(numPage, currentSize);
  };

  const nextPage = () => {
    const nextpage = currentPage + 1;
    setCurrentPage(nextpage);
    getTransactions(nextpage);
  };
  const prevPage = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    getTransactions(prevPage);
  };

  return (
    <Container showBackDrop={controlView}>
      <NavBar page="Listings" icon="icon-listings" />
      {showBackDrop ? (
        <BackDrop handleBackDrop={handleBackDrop} />
      ) : null}
      {showDelete ? (
        <DeleteModal handleClose={handleDeleteModal} />
      ) : null}
      <div className="listingsCustom__container">
        <AppAside />
        <AppMain>
          <PaddedContainer padding="25px">
            <Banner onClick={handleBackDrop} />
            <Tabs>
              <TabList>
                <Tab>All Listings</Tab>
                <Tab>My Listings</Tab>
              </TabList>
              <TabPanel>
                <ListingsFilters listSizeHandler={listSizeHandler} />
                {notification ? (
                  <h1>{notification}</h1>
                ) : (
                  <AllListings
                    currentSize={currentSize}
                    changeCurrentPage={changeCurrentPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    currentPage={currentPage}
                    handleBackDrop={handleBackDrop}
                  />
                )}
              </TabPanel>
              <TabPanel>
                <MyListings handleDeleteModal={handleDeleteModal} />
              </TabPanel>
            </Tabs>
          </PaddedContainer>
        </AppMain>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  sortedTransactions: state.transaction.sortedTransactions,
  notification: state.transaction.notification,
  userCognitoEmail: state.auth.userCognitoEmail,
});

export default connect(mapStateToProps, {
  getTransactions,
  checkUserProfile,
})(Listings);
